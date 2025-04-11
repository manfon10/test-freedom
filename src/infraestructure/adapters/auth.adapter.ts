import { AuthHandler } from "../../presentation/middlewares";

import { UserDataSourceImpl } from "../datasources";
import { UserRepositoryImpl } from "../repositories";

export class AuthAdapter {
  private authHandler: AuthHandler;

  constructor() {
    const userDatasource = new UserDataSourceImpl();
    const userRepository = new UserRepositoryImpl(userDatasource);

    this.authHandler = new AuthHandler(userRepository);
  }

  getHandler(): AuthHandler {
    return this.authHandler;
  }
}

export const authAdapter = new AuthAdapter().getHandler();
