import { AxiosResponse } from "axios";

export interface HttpClient {
  get: (url: string, data?: object, config?: object) => Promise<any>;
  post: (url: string, data?: object, config?: object) => Promise<any>;
  put: (url: string, data?: object, config?: object) => Promise<any>;
  delete: (url: string, data?: object, config?: object) => Promise<any>;
}

export interface AxiosClient extends HttpClient {
  get: (url: string, data?: object, config?: object) => Promise<AxiosResponse>;
  post: (url: string, data?: object, config?: object) => Promise<AxiosResponse>;
  put: (url: string, data?: object, config?: object) => Promise<AxiosResponse>;
  delete: (url: string, data?: object, config?: object) => Promise<AxiosResponse>;
}

export interface IAuthApi {
  authorize: (authorization_server_url?: string, client_id?: string, redirect_url?: string) => void;
  loginByUsername: (username: string, password: string, client_id?: string, client_secret?: string) => Promise<any>;
  loginByCode: (code: string, client_id?: string, client_secret?: string, redirect_url?: string) => Promise<any>;
}
