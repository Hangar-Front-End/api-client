import axios from "axios";
import { DefaultAxiosClient } from "../src";
import { AuthApi } from "../src";

const api = new AuthApi(new DefaultAxiosClient(axios.create({ baseURL: "http://10.10.10.107:9000" })));

test("密码模式登录", async () => {
  const res = await api.loginByUsername("admin", "123456", "halo-admin", "123456");
  expect(res.status).toBe(200);
  expect(res.data.access_token).not.toBeNull;
});
