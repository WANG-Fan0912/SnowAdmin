import axios from "@/api";

// 获取在线用户
export const getOnlineuserAPI = () => {
  return axios({
    url: "/mock/monitor/getOnlineuser",
    method: "get"
  });
};

// 获取定时任务
export const getCronJobAPI = () => {
  return axios({
    url: "/mock/monitor/getCronJob",
    method: "get"
  });
};
