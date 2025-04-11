import { NextFunction, Response, Request } from "express";
import { validationResult, ValidationChain } from "express-validator";
import { AppError } from "../../domain";

export class ValidatorMiddleware {
  constructor(public validations: ValidationChain[]) {}

  validate = async (req: Request, _res: Response, next: NextFunction) => {
    await Promise.all(this.validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);

    if (errors.isEmpty()) return next();

    next(AppError.badRequest("Error de validación", errors));
  };
}
