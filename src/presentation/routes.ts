import { Router } from "express";

import { AuthRoutes } from "./routes/auth.routes";
import { TaskRoutes } from "./routes/task.routes";

import { logginAdapter } from "../infraestructure/adapters/loggin.adapter";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use(logginAdapter.logRequest);

    router.use("/auth", AuthRoutes.routes);
    router.use("/tasks", TaskRoutes.routes);

    return router;
  }
}
