import axios from "@/api";

// 获取在线用户
export const getOnlineuserAPI = () => {
  return axios({
    url: "/mock/monitor/getOnlineuser",
    method: "get"
  });
};
