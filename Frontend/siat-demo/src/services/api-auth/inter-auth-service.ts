import { Response } from "../shared";
import { AuthData, User } from "./models";

export interface InterAuthService {
  login(user: User): Promise<Response<AuthData>>;
  logout(): Promise<Response<boolean>>;
  refreshAccessToken(): Promise<Response<AuthData>>;
}
