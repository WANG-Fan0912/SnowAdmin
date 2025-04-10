import axios from "@/api";

// 登录
export const loginAPI = (data: any) => {
  return axios({
    url: "/mock/login",
    method: "post",
    data
  });
};

// 获取用户信息
export const getUserInfoAPI = () => {
  return axios({
    url: "/mock/user/getUserInfo",
    method: "get"
  });
};
