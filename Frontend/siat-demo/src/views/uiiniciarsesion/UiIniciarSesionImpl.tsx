//UiIniciarSesionImpl.tsx
import { UiIniciarSesion } from "./UiIniciarSesion";
import { UiIniciarSesionProps } from "./UiIniciarSesionProps";

/* Servicios API */
import { getLogin } from "../../services/api-auth/auth";
import { useRef } from "react";
import { UiNotificationImpl } from "../uinotification/UiNotificationImpl";
import React from "react";

// Clase de implementación que hereda de la clase plantilla UiIniciarSesion
export class UiIniciarSesionImpl extends UiIniciarSesion {
  private notificationRef: React.RefObject<UiNotificationImpl>;
  constructor() {
    super({});
    this.notificationRef = React.createRef();
  }
  componentDidMount() {
    // Código que necesita ejecutarse después de que el componente se monte.
    console.log("UiIniciarSesionImpl se ha montado");
  }

  // Sobrescribir el método de inicio de sesión
  login = async (email: string, password: string): Promise<void> => {
    //window.alert("New Click a iniciar sesión");
    //console.log(`New Iniciando sesión desde la clase de implementación con email: ${email} y contraseña: ${password}`);
    // Aquí puedes agregar la lógica específica de inicio de sesión, como enviar una solicitud al servidor
    try {
      // Lógica de autenticación (supongamos que aquí hay una llamada a una API)
      const response = await getLogin({ email, password });

      if (response) {
        // Autenticación exitosa, redirigir a la página de inicio
        this.notificationRef.current?.send("Bienvendio", "success");
        window.location.href = "/";
      } else {
        // Mostrar mensaje de error
        // window.alert(response.error.message || "Error de inicio de sesión");
        this.notificationRef.current?.send(
          response.error.message || "Error de inicio de sesión",
          "error",
        );
        //window.alert('Error de inicio de sesión');
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      // window.alert("Error al iniciar sesión");
      this.notificationRef.current?.send("Error al iniciar sesión", "error");
    }
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
