import type { MockMethod } from "vite-plugin-mock";
import { resultSuccess } from "../_utils";
import { onlineuser } from "../_data/monitor_data";
/**
 * post请求body,get请求query
 * /mock/monitor/getOnlineuser 获取在线用户
 */
export default [
  {
    url: "/mock/monitor/getOnlineuser",
    method: "get",
    timeout: 300,
    response: () => {
      return resultSuccess(onlineuser);
    }
  }
] as MockMethod[];
