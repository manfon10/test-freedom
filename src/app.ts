import { envs } from "./config";

import { SequelizeDatabase } from "./data/sequelize";

import { SocketConfig } from "./infraestructure";

import { AppRoutes } from "./presentation";

import { Server } from "./server";

const main = async () => {
  const database = envs.DB_NAME;
  const username = envs.DB_USER;
  const password = envs.DB_PASSWORD;
  const host = envs.DB_HOST;
  const port = envs.DB_PORT;

  await SequelizeDatabase.connect({ database, password, username, host, port });

  const server = new Server({ port: envs.APP_PORT || 4568, routes: AppRoutes.routes });

  server.start();

  SocketConfig.initializeServer(server.server);
};

main();
