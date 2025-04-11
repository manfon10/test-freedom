import { NextFunction, Response } from "express";

import { AuthService, UserService } from "../../infraestructure/services";
import { AppError, HttpRequest, UserRepository } from "../../domain";

export class AuthHandler {
  private authService: AuthService;
  private userService: UserService;

  constructor(private readonly userRepository: UserRepository) {
    this.userRepository = this.userRepository;

    this.authService = new AuthService(userRepository);
    this.userService = new UserService(userRepository);
  }

  public checkToken = async (req: HttpRequest, _res: Response, next: NextFunction) => {
    let token: string | null = "";

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    try {
      if (!token) return next(AppError.forbidden("El token es requerido"));

      const decodedToken = this.authService.verifyToken(token);

      const user = await this.userService.findById(decodedToken.id);

      req.user = user;

      next();
    } catch (error) {
      next(error);
    }
  };
}
