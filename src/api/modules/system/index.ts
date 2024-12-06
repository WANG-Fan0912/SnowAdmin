import axios from "@/api";

// 获取菜单数据
export const getMenuListAPI = () => {
  return axios({
    url: "/mock/menu/list",
    method: "get"
  });
};
