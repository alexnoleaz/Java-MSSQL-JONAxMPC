import React, { Component } from "react";
import { UiNotificationState } from "./UiNotificationState";
import { InterUiNotification } from "./InterUiNotification";
import { NotificationTypes } from "./NotificationTypes";

export class UiNotification
  extends Component<{}, UiNotificationState>
  implements InterUiNotification
{
  state: UiNotificationState = {
    visible: false,
  };

  send(message: string, type: NotificationTypes, status: number): void {
    this.setState({ message, type, status, visible: true });
  }

  sendInfo(message: string, status: number): void {
    this.send(message, NotificationTypes.Info, status);
  }

  sendWarning(message: string, status: number): void {
    this.send(message, NotificationTypes.Warning, status);
  }

  sendError(message: string, status: number): void {
    this.send(message, NotificationTypes.Error, status);
  }

  render() {
    const { message, type, status, visible } = this.state;

    if (!visible) return null;

    return (
      <div
        id="notification"
        className={`notification ${type}`}
        style={this.getStyles()}
      >
        {message}
        <hr />
        status: {status}
      </div>
    );
  }

  private getStyles(): React.CSSProperties {
    return {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      padding: "10px 20px",
      borderRadius: "5px",
      backgroundColor: this.getBackgroundColor(),
      color: "#fff",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    };
  }

  private getBackgroundColor() {
    switch (this.state.type) {
      case NotificationTypes.Error:
        return "red";
      case NotificationTypes.Info:
        return "blue";
      case NotificationTypes.Warning:
        return "yellow";
      default:
        return "gray";
    }
  }
}

export default React.forwardRef<UiNotification, {}>((_, ref) => (
  <UiNotification ref={ref} />
));
