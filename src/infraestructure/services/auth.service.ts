import bcrypt from "bcrypt";
import jwt, {
  JsonWebTokenError,
  JwtPayload,
  Secret,
  SignOptions,
  TokenExpiredError,
} from "jsonwebtoken";

import {
  AppError,
  AuthEntity,
  ExpirationTokenOutput,
  SignTokenDto,
  UserDto,
  UserEntity,
  UserRepository,
} from "../../domain";

import { envs } from "../../config";

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  comparePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  isTokenWithinExpirationThreshold(expirationTime: number): ExpirationTokenOutput {
    const TOKEN_EXPIRATION = 5 * 60;
    const TOKEN_TOLERANCE = 15 * 60;

    const currentTimeInSeconds = Math.floor(Date.now() / 1000);

    const timeRemaining = expirationTime - currentTimeInSeconds;

    if (timeRemaining > TOKEN_EXPIRATION) {
      return { renew: false, timeRemaining };
    }

    if (timeRemaining <= 0 && Math.abs(timeRemaining) <= TOKEN_TOLERANCE) {
      return { renew: true, timeRemaining };
    }

    return { renew: false, timeRemaining };
  }

  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw AppError.badRequest("Usario no Existe");
    }

    const isPasswordValid = this.comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw AppError.forbidden("Datos Incorrectos");
    }

    const refresh_token: string = this.signRefreshToken();

    const access_token: string = this.signAccessToken({
      id: user.id,
      role: user.role,
    });

    const { password: userPassword, ...userData } = user;

    return AuthEntity.fromObject({ user: userData, access_token, refresh_token });
  }

  async register(data: UserDto): Promise<UserEntity> {
    const passwordHash = await this.hashPassword(data.password);

    const userExists = await this.userRepository.findByEmail(data.email);

    if (userExists) {
      throw AppError.badRequest("El usuario ya existe");
    }

    const user = await this.userRepository.create({ ...data, password: passwordHash });

    const { password, ...userData } = user;

    return UserEntity.fromObject(userData);
  }

  refreshToken(tokenRefresh: string): string {
    const decoded = jwt.decode(tokenRefresh, { complete: true });

    if (!decoded) throw AppError.unauthorized("Token invalido");

    const { exp } = decoded.payload as JwtPayload & SignTokenDto;

    const { renew, timeRemaining } = this.isTokenWithinExpirationThreshold(exp!);

    if (renew) {
      const payload = jwt.verify(tokenRefresh, envs.JWT_SECRET, {
        ignoreExpiration: true,
      }) as SignTokenDto;

      return this.signAccessToken({
        id: payload.id,
        role: payload.role,
      });
    }

    if (timeRemaining > 0) {
      return tokenRefresh;
    }

    throw AppError.unauthorized("Token expirado, redirigir al login");
  }

  signAccessToken(data: SignTokenDto): string {
    const secret: Secret = envs.JWT_SECRET;

    const options: SignOptions = {
      expiresIn: envs.JWT_ACCESS_EXPIRES,
    };

    const token = jwt.sign(data, secret, options);

    return token;
  }

  signRefreshToken(): string {
    const secret: Secret = envs.JWT_SECRET;

    const options: SignOptions = {
      expiresIn: envs.JWT_REFRESH_EXPIRES,
    };

    const token = jwt.sign({}, secret, options);

    return token;
  }

  verifyToken(token: string): any {
    let decodedToken: SignTokenDto | null = null;

    try {
      decodedToken = jwt.decode(token) as SignTokenDto | null;

      if (!decodedToken) {
        throw AppError.forbidden("Token invalido.");
      }

      jwt.verify(token, envs.JWT_SECRET);

      return decodedToken;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw AppError.unauthorized("El token ha expirado");
      }

      if (error instanceof JsonWebTokenError) {
        throw AppError.unauthorized("Token inválido");
      }

      throw AppError.internalServer("Error al verificar el token");
    }
  }
}
