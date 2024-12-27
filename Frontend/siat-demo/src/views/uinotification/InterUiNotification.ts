export interface InterUiNotification {
  send(message: string, type: "success" | "error" | "warning" | "info"): void;
}
