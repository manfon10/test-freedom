import { Socket } from "socket.io";

export class SocketHandler {
  constructor() {}

  public handleConnection(socket: Socket): void {
    console.log(`Usuario conectado: ${socket.id}`);

    this.setupEventListeners(socket);
  }

  private setupEventListeners(socket: Socket): void {
    socket.on("create-task", (data) => {
      const { roomId, message } = data;

      socket.to(roomId).emit("tasks", {
        message,
        timestamp: new Date(),
      });
    });
  }
}
