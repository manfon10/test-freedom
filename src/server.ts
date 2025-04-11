import express, { Router } from "express";
import swaggerUi from "swagger-ui-express";
import http from "http";

import { ErrorMiddleware } from "./presentation/middlewares/error.handler";
import { swaggerSpec } from "./config/plugins/swagger.config";

interface Options {
  port: number;
  routes: Router;
}

export class Server {
  private app = express();
  private port: number;
  private routes: Router;

  public readonly server: http.Server;

  constructor(options: Options) {
    const { port, routes } = options;

    this.port = port;
    this.routes = routes;

    this.server = http.createServer(this.app);
  }

  middlewares() {
    this.app.use(express.json());

    this.app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    this.app.use(this.routes);
  }

  logErrors() {
    this.app.use(ErrorMiddleware.handleError);
  }

  start() {
    this.listen();

    this.middlewares();

    this.logErrors();
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
