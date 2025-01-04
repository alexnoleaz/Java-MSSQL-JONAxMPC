import axios, { AxiosError, AxiosInstance } from "axios";
import qs from "qs";

import {
  clearSession,
  getRefreshToken,
  setRefreshToken,
  setSession,
  setToken,
  setTokenExpiration,
} from "../../methods/storage";
import { ContentTypes, Response } from "../shared";
import { AuthConfig } from "./auth-config";
import { InterAuthService } from "./inter-auth-service";
import { AuthData, GrandTypes, User } from "./models";

export class AuthService implements InterAuthService {
  private readonly redirectUri = "https://ide.icl.gob.pe";
  private readonly axios: AxiosInstance;
  private readonly baseData: { client_id: string; client_secret: string };

  constructor() {
    this.axios = axios.create({
      baseURL: AuthConfig.baseUrl,
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": ContentTypes.FormUrlEncoded,
      },
    });

    this.baseData = {
      client_id: AuthConfig.clientId!,
      client_secret: AuthConfig.clientSecret!,
    };
  }

  async login(user: User): Promise<Response<AuthData>> {
    const { email, password } = user;
    const data = {
      ...this.baseData,
      scope: AuthConfig.scope,
      grant_type: GrandTypes.Password,
      username: email,
      password,
    };

    return this.generateAccessToken(data, "Login success");
  }

  async logout(): Promise<Response<boolean>> {
    const refrestToken = getRefreshToken();
    console.log(refrestToken);

    const data = {
      ...this.baseData,
      redirect_uri: this.redirectUri,
      refresh_token: refrestToken,
    };

    try {
      const result = await this.axios.post("/logout", qs.stringify(data));
      clearSession();

      return {
        status: result.status,
        message: "Logout success",
        data: true,
      };
    } catch (error) {
      console.error({ error });
      return this.errorHandler(error);
    }
  }

  async refreshAccessToken(): Promise<Response<AuthData>> {
    const refreshToken = getRefreshToken();
    const data = {
      ...this.baseData,
      grant_type: GrandTypes.RefreshToken,
      refresh_token: refreshToken,
    };

    return this.generateAccessToken(data, "Refresh token success");
  }

  private async generateAccessToken(
    data: any,
    message: string,
  ): Promise<Response<AuthData>> {
    try {
      const result = await this.axios.post<AuthData>(
        "/token",
        qs.stringify(data),
      );
      console.log({ data: result.data });
      this.setStorage(result.data);

      return {
        message,
        status: result.status,
        data: result.data,
      };
    } catch (error) {
      console.error({ error });
      return this.errorHandler(error);
    }
  }

  private errorHandler(error: unknown) {
    const axiosError = error as AxiosError;
    if (axiosError.code === "ERR_NETWORK")
      return {
        status: 0,
        message: axiosError.message,
      };

    return {
      status: axiosError.status!,
      message: (axiosError.response?.data as any)["error_description"],
    };
  }

  private setStorage(data: AuthData) {
    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiresIn,
      ...sessionData
    } = data;
    setSession({ expiresIn, ...sessionData } as any);
    setToken(accessToken, expiresIn);
    setRefreshToken(refreshToken, expiresIn);
    setTokenExpiration(expiresIn);
    debugger;
    this.scheduleTokenRefresh(expiresIn);
  }

  private scheduleTokenRefresh(expiresIn: number) {
    const refreshTime = (expiresIn - 5) * 1000;
    console.log(refreshTime);
    setTimeout(this.refreshAccessToken, refreshTime);
  }
}
