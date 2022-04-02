import { DefaultAxiosClient } from "../src";

const client = new DefaultAxiosClient();

test("无参数GET请求", async () => {
  const res = await client.get("http://www.baidu.com");
  expect(res.status).toBe(200);
});

test("有参数GET请求", async () => {
  const res = await client.get("http://cn.bing.com/search", { q: "hangar" });
  expect(res.status).toBe(200);
  expect(res.data.indexOf("汉佳") > 0).toBeTruthy;
});
