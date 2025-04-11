import { body, check, param, ValidationChain } from "express-validator";

import { ValidatorMiddleware } from "../../presentation/middlewares";

export interface ITaskDto {
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  due_date: Date;
  user_id: number;
}

export type IUpdateTaskDto = Partial<ITaskDto>;

export class TaskDto {
  static create(): ValidationChain[] {
    return [
      check("title")
        .notEmpty()
        .withMessage("El título es obligatorio")
        .isString()
        .withMessage("El título debe ser una cadena de texto")
        .trim(),
      check("description")
        .notEmpty()
        .withMessage("La descripción es obligatoria")
        .isString()
        .withMessage("La descripción debe ser una cadena de texto")
        .trim(),
      check("status")
        .notEmpty()
        .withMessage("El estado es obligatorio")
        .isIn(["TODO", "IN_PROGRESS", "DONE"])
        .withMessage("El estado debe ser uno de los siguientes: TODO, IN_PROGRESS, DONE"),
      check("due_date")
        .notEmpty()
        .withMessage("La fecha de vencimiento es obligatoria")
        .isISO8601()
        .withMessage("La fecha de vencimiento debe ser una fecha válida (ISO 8601)")
        .toDate(),
    ];
  }

  static getAll(): ValidationChain[] {
    return [
      param("status")
        .optional()
        .isIn(["TODO", "IN_PROGRESS", "DONE"])
        .withMessage("El estado debe ser uno de los siguientes: TODO, IN_PROGRESS, DONE"),
      param("due_date")
        .optional()
        .isISO8601()
        .withMessage("La fecha de vencimiento debe ser una fecha válida (ISO 8601)"),
      param("page")
        .optional()
        .isInt({ min: 1 })
        .withMessage("La página debe ser un número entero mayor o igual a 1"),
      param("limit")
        .optional()
        .isInt({ min: 1 })
        .withMessage("El límite debe ser un número entero mayor o igual a 1"),
    ];
  }

  static getById(): ValidationChain[] {
    return [
      param("id")
        .notEmpty()
        .withMessage("El id s obligatorio")
        .isNumeric()
        .withMessage("El id debe ser de tipo numerico"),
    ];
  }

  static update(): ValidationChain[] {
    return [
      body("title")
        .notEmpty()
        .withMessage("El título es obligatorio")
        .trim()
        .isString()
        .withMessage("El título debe ser una cadena de texto"),
      body("description")
        .notEmpty()
        .withMessage("La descripción es obligatoria")
        .trim()
        .isString()
        .withMessage("La descripción debe ser una cadena de texto"),
      body("status")
        .notEmpty()
        .withMessage("El estado es obligatorio")
        .isIn(["TODO", "IN_PROGRESS", "DONE"])
        .withMessage("El estado debe ser uno de los siguientes: TODO, IN_PROGRESS, DONE"),
      body("due_date")
        .notEmpty()
        .withMessage("La fecha de vencimiento es obligatoria")
        .isISO8601()
        .withMessage("La fecha de vencimiento debe ser una fecha válida (ISO 8601)")
        .toDate(),
    ];
  }
}

export const createTaskDto = new ValidatorMiddleware(TaskDto.create());
export const getByIdDto = new ValidatorMiddleware(TaskDto.getById());
export const getAllDto = new ValidatorMiddleware(TaskDto.getAll());
export const updateTaskDto = new ValidatorMiddleware(TaskDto.update());
