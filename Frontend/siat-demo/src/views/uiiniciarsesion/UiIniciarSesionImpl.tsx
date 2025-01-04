//UiIniciarSesionImpl.tsx
import { UiIniciarSesion } from "./UiIniciarSesion";

/* Servicios API */
import { UiNotificationImpl } from "../uinotification/UiNotificationImpl";
import React from "react";
import { AuthService } from "../../services/api-auth/auth-service";
import { UiNotification } from "../uinotification/UiNotification";
import { InterUiNotification } from "../uinotification/InterUiNotification";

// Clase de implementación que hereda de la clase plantilla UiIniciarSesion
export class UiIniciarSesionImpl extends UiIniciarSesion {
  private notificationRef: React.RefObject<UiNotification>;
  private readonly authService: AuthService;

  constructor(props: any) {
    super(props);
    this.notificationRef = React.createRef();
    this.authService = new AuthService();
  }
  componentDidMount() {
    // Código que necesita ejecutarse después de que el componente se monte.
    console.log("UiIniciarSesionImpl se ha montado");
  }

  // Sobrescribir el método de inicio de sesión
  login = async (email: string, password: string): Promise<void> => {
    const res = await this.authService.login({ email, password });

    if (!res.data) {
      this.notificationRef.current?.sendError(res.message, res.status);
      return;
    }

    this.notificationRef.current?.sendInfo(res.message, res.status);
    window.location.href = "/";
  };

  render() {
    return (
      <div>
        <UiNotificationImpl ref={this.notificationRef} />
        {super.render()}
      </div>
    );
  }
}
