import type { MockMethod } from "vite-plugin-mock";
import { resultSuccess } from "../_utils";
import { onlineuser, cronJob } from "../_data/monitor_data";
/**
 * post请求body,get请求query
 * /mock/monitor/getOnlineuser 获取在线用户
 * /mock/monitor/getCronJob 定时任务
 */
export default [
  {
    url: "/mock/monitor/getOnlineuser",
    method: "get",
    timeout: 300,
    response: () => {
      return resultSuccess(onlineuser);
    }
  },
  {
    url: "/mock/monitor/getCronJob",
    method: "get",
    timeout: 300,
    response: () => {
      return resultSuccess(cronJob);
    }
  }
] as MockMethod[];
