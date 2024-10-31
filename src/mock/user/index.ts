import type { MockMethod } from "vite-plugin-mock";
import { resultSuccess, resultError } from "../_utils";

// post请求body,get请求query
export default [
  {
    url: "/mock/login",
    method: "post",
    timeout: 300,
    response: ({ body }) => {
      let { username, password } = body;
      if (username === "admin" && password === "123456") {
        // 请求成功返回token
        return resultSuccess({ token: "Your-Token" });
      }
      return resultError(null, "账号或者密码错误", 500);
    }
  },
  {
    url: "/mock/user/info",
    method: "get",
    timeout: 300,
    response: () => {
      let data = {
        username: "admin", // 用户名
        roles: ["admin"] // 角色
      };
      return resultSuccess(data);
    }
  }
] as MockMethod[];
