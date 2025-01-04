import { AuthData } from "../../services/api-auth/models";

// InterUiIniciarSesion.tsx
export interface InterUiIniciarSesion {  
  login?: (email: string, password: string) => void;
}

export interface UiIniciarSesionResponse extends AuthData{
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  "not-before-policy": number;
  session_state: string;
  scope: string;
  clientName: string;
  realmName: string;
}
