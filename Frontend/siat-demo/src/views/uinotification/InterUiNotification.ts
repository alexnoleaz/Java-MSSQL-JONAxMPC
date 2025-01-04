import { NotificationTypes } from "./NotificationTypes";

export interface InterUiNotification {
  send(message: string, type: NotificationTypes, status: number): void;
  sendInfo(message: string, status: number): void;
  sendWarning(message: string, status: number): void;
  sendError(message: string, status: number): void;
}
