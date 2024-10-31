import type { MockMethod } from "vite-plugin-mock";
import { resultSuccess, resultError } from "../_utils";

export default [
  {
    url: "/mock/test/success",
    method: "get",
    timeout: 300,
    response: () => {
      return resultSuccess("mock数据成功了");
    }
  },
  {
    url: "/mock/test/fail",
    method: "get",
    timeout: 300,
    response: () => {
      return resultError(null, "请求数据出错了", 500);
    }
  }
] as MockMethod[];
