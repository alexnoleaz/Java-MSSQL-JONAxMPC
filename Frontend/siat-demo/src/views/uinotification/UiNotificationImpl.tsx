import React from "react";
import { UiNotification } from "./UiNotification";
import { NotificationTypes } from "./NotificationTypes";

export class UiNotificationImpl extends UiNotification {
  send(message: string, type: NotificationTypes, status: number): void {
    this.setState({ message, type, status, visible: true });

    setTimeout(() => {
      this.setState({ visible: false });
    }, 3000);
  }

  render() {
    return super.render();
  }
}

export default React.forwardRef<UiNotificationImpl, {}>((_, ref) => (
  <UiNotificationImpl ref={ref} />
));
