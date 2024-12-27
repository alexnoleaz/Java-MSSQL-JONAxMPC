import React from "react";
import { UiNotification } from "./UiNotification";

export class UiNotificationImpl extends UiNotification {
  componentDidMount(): void {
    console.log("UiNotificationImpl se ha montado");
  }

  send(message: string, type: "success" | "error" | "warning" | "info"): void {
    this.setState({ message, type, visible: true });

    setTimeout(() => {
      this.setState({ visible: false });
    }, 5000);
  }

  render() {
    return <div>{super.render()}</div>;
  }
}

export default React.forwardRef<UiNotificationImpl, {}>((props, ref) => (
  <UiNotificationImpl ref={ref} />
));
