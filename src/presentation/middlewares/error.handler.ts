import { type Response, type NextFunction, type Request } from "express";

import { AppError, HttpCode } from "../../domain";

export class ErrorMiddleware {
  public static handleError = (
    error: unknown,
    _: Request,
    res: Response,
    next: NextFunction
  ): void => {
    if (error instanceof AppError) {
      const { message, name } = error;

      const statusCode = error.statusCode || HttpCode.INTERNAL_SERVER_ERROR;

      res.status(statusCode).json({ name, message });
    } else {
      const name = "InternalServerError";
      const message = "An internal server error occurred";
      const statusCode = HttpCode.INTERNAL_SERVER_ERROR;

      res.status(statusCode).json({ name, message });
    }

    next();
  };
}
