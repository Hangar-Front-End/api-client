import { IAuthApi, HttpClient } from "../types";
import DefaultAxiosClient from "./AxiosClient";
import qs from "qs";

export class AuthApi implements IAuthApi {
  private readonly client;

  constructor(client?: HttpClient) {
    this.client = client || new DefaultAxiosClient();
  }

  public authorize(authorization_url?: string, client_id?: string, redirect_url?: string) {
    const parameters = qs.stringify({
      client_id: client_id || process.env.CLIENT_ID,
      redirect_uri: redirect_url || process.env.REDIRECT_URI || `${window.location.origin}/user/login`,
      response_type: "code"
    });
    window.location.href = `${authorization_url || process.env.AUTHORIZATION_URI}/oauth2/authorize?${parameters}`;
  }

  public loginByUsername(username: string, password: string, client_id?: string, client_secret?: string) {
    const data = {
      username: username,
      password: password,
      grant_type: "password",
      client_id: client_id || process.env.CLIENT_ID,
      client_secret: client_secret || process.env.CLIENT_SECRET
    };
    return this.client.post(
      "/oauth2/token?" + qs.stringify(data),
      {},
      {
        headers: { "X-Requested-With": "XMLHttpRequest" }
      }
    );
  }

  public loginByCode(code: string, client_id?: string, client_secret?: string, redirect_url?: string) {
    const data = {
      code: code,
      grant_type: "authorization_code",
      client_id: client_id || process.env.CLIENT_ID,
      client_secret: client_secret || process.env.CLIENT_SECRET,
      redirect_uri: redirect_url || process.env.REDIRECT_URI
    };
    return this.client.post("/oauth2/token", data);
  }
}

export default AuthApi;
