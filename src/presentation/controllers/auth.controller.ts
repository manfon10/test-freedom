import { NextFunction, Response } from "express";

import { HttpRequest } from "../../domain/interfaces";
import { UserRepository } from "../../domain/repositories";
import { AuthService, UserService } from "../../infraestructure/services";

export class AuthController {
  private authService: AuthService;
  private userService: UserService;

  constructor(private readonly userRepository: UserRepository) {
    this.userRepository = this.userRepository;

    this.authService = new AuthService(userRepository);
    this.userService = new UserService(userRepository);
  }

  async getProfileData(req: HttpRequest, res: Response, _next: NextFunction): Promise<void> {
    const { id } = req.user!;

    const user = await this.userService.findById(id);

    res.status(200).json({ user });
  }

  async login(req: HttpRequest, res: Response, next: NextFunction): Promise<void> {
    const { email, password } = req.body;

    try {
      const data = await this.authService.login(email, password);

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async register(req: HttpRequest, res: Response, next: NextFunction): Promise<void> {
    const { email, password, role } = req.body;

    try {
      const user = await this.authService.register({ email, password, role });

      res.status(201).json({ user });
    } catch (error) {
      console.log(error);

      next(error);
    }
  }
}
