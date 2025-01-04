import { NotificationTypes } from "./NotificationTypes";

export interface UiNotificationState {
  message?: string;
  type?: NotificationTypes;
  status?: number;
  visible?: boolean;
}
