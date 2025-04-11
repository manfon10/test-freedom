import { Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";

import { AppError } from "../../domain";
import { SocketHandler } from "./handler.socket";

export class SocketConfig {
  private static io: SocketIOServer;

  public static initializeServer(httpServer: HttpServer): void {
    if (!SocketConfig.io) {
      SocketConfig.io = new SocketIOServer(httpServer);

      const socketHanlder = new SocketHandler();

      SocketConfig.io.on("connection", socketHanlder.handleConnection);
    }
  }

  public static getInstance(): SocketIOServer {
    if (!SocketConfig.io) {
      throw AppError.internalServer("SocketConfig no está inicializado");
    }

    return SocketConfig.io;
  }
}
