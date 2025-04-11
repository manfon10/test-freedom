import { SocketConfig } from "../socket/setup.socket";

export interface NotificationPort {
  notifyAdmins(channelId: string, event: string, payload: any): void;
  notifyUser(userId: string, event: string, payload: any): void;
}

export class SocketNotificationAdapter implements NotificationPort {
  notifyAdmins(channelId: string, event: string, payload: any): void {
    const io = SocketConfig.getInstance();

    io.to(channelId).emit(event, payload);
  }

  notifyUser(userId: string, event: string, payload: any): void {
    const io = SocketConfig.getInstance();

    io.to(userId).emit(event, payload);
  }
}
