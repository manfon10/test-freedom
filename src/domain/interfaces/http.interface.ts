import { NextFunction, Request, Response } from "express";

import { UserEntity } from "../entities";

export interface HttpRequest extends Request {
  body: any;
  params: any;
  headers: any;
  query: any;
  file?: any;
  files?: any;
  user?: UserEntity;
}

export interface Controller {
  handle(req: Request, res: Response, next: NextFunction): Promise<void>;
}
