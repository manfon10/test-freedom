import { Request, Response, NextFunction } from "express";

import { LogginService } from "../../infraestructure";
import { HttpRequest, LogginRepository } from "../../domain";

export class LogginHandler {
  private logginService: LogginService;

  constructor(private readonly logginRepository: LogginRepository) {
    this.logginRepository = this.logginRepository;

    this.logginService = new LogginService(logginRepository);
  }

  public logRequest = async (req: HttpRequest, res: Response, next: NextFunction) => {
    const start = Date.now();

    res.on("finish", async () => {
      const duration = Date.now() - start;

      await this.logginService.logRequest({
        method: req.method,
        path: req.originalUrl,
        response_time: duration,
        user_id: req.user ? req.user.id : null,
      });
    });

    next();
  };
}
