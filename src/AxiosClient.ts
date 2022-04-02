import { default as AxiosFactory } from "axios";
import { AxiosClient } from "../types";
import { AxiosInstance } from "axios";
import qs from "qs";

export class DefaultAxiosClient implements AxiosClient {
  private readonly axios: AxiosInstance;

  constructor(axios?: AxiosInstance) {
    this.axios = axios || AxiosFactory.create();
  }

  public get(url: string, data?: object, config?: object) {
    return this.axios.get(this.generate_no_body_url(url, data), config);
  }

  public post(url: string, data?: object, config?: object) {
    return this.axios.post(url, data, config);
  }

  public put(url: string, data?: object, config?: object) {
    return this.axios.put(url, data, config);
  }

  public delete(url: string, data?: object, config?: object) {
    return this.axios.delete(this.generate_no_body_url(url, data), config);
  }

  protected generate_no_body_url(url: string, data?: object): string {
    let result = url;
    if (data && Object.keys(data).length > 0) {
      result = `${url}?${qs.stringify(data, { arrayFormat: "repeat" })}`;
    }
    return result;
  }
}

export default DefaultAxiosClient;
