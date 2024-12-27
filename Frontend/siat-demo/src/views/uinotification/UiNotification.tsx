import React, { Component } from "react";
import { UiNotificationState } from "./UiNotificationState";
import { InterUiNotification } from "./InterUiNotification";

export class UiNotification
  extends Component<{}, UiNotificationState>
  implements InterUiNotification
{
  constructor() {
    super({});
    this.state = {
      message: undefined,
      type: undefined,
      visible: false,
    };
  }

  componentDidMount(): void {
    console.log("UiNotification se ha montado");
  }

  send(message: string, type: "success" | "error" | "warning" | "info"): void {
    window.alert(message);
  }

  render() {
    const { message, type, visible } = this.state;

    if (!visible) return null;

    return (
      <div className={`notification ${type}`} style={this.getStyles()}>
        {message}
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
      case "success":
        return "green";
      case "error":
        return "red";
      case "info":
        return "blue";
      case "warning":
        return "orange";
      default:
        return "gray";
    }
  }
}
