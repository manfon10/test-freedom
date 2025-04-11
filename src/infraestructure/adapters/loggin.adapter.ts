import { AuthHandler, LogginHandler } from "../../presentation/middlewares";

import { LogginDataSourceImpl } from "../datasources";
import { LogginRepositoryImpl } from "../repositories";

export class LogginAdapter {
  private logginHandler: LogginHandler;

  constructor() {
    const logginDatasource = new LogginDataSourceImpl();
    const logginRepository = new LogginRepositoryImpl(logginDatasource);

    this.logginHandler = new LogginHandler(logginRepository);
  }

  getHandler(): LogginHandler {
    return this.logginHandler;
  }
}

export const logginAdapter = new LogginAdapter().getHandler();
