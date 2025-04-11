import { Result, ValidationError } from "express-validator";

import { HttpCode } from "../constants";

interface AppErrorArgs {
  statusCode: HttpCode;
  message: string;
  name?: string;
  isOperational?: boolean;
}

interface AppErrorArgs {
  statusCode: HttpCode;
  message: string;
  name?: string;
  isOperational?: boolean;
  validationErrors?: Result<ValidationError>;
}

export class AppError extends Error {
  public readonly name: string;
  public readonly statusCode: HttpCode;
  public readonly isOperational: boolean = true;
  public readonly validationErrors?: Result<ValidationError>;

  constructor({ message, name, statusCode, isOperational, validationErrors }: AppErrorArgs) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name ?? "Aplication Error";
    this.statusCode = statusCode;
    this.validationErrors = validationErrors;

    if (isOperational !== undefined) this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message: string, validationErrors?: Result<ValidationError>): AppError {
    return new AppError({
      name: "BadRequestError",
      message,
      statusCode: HttpCode.BAD_REQUEST,
      validationErrors,
    });
  }

  static unauthorized(message: string): AppError {
    return new AppError({ name: "UnauthorizedError", message, statusCode: HttpCode.UNAUTHORIZED });
  }

  static forbidden(message: string): AppError {
    return new AppError({ name: "ForbiddenError", message, statusCode: HttpCode.FORBIDDEN });
  }

  static notFound(message: string): AppError {
    return new AppError({ name: "NotFoundError", message, statusCode: HttpCode.NOT_FOUND });
  }

  static internalServer(message: string): AppError {
    return new AppError({
      name: "InternalServerError",
      message,
      statusCode: HttpCode.INTERNAL_SERVER_ERROR,
      isOperational: false,
    });
  }
}
