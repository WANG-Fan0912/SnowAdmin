import axios from "@/api";

// 获取菜单数据
export const getMenuListAPI = () => {
  return axios({
    url: "/mock/menu/getMenuList",
    method: "get"
  });
};

// 获取字典数据
export const getDictAPI = () => {
  return axios({
    url: "/mock/system/getDict",
    method: "get"
  });
};

// 获取部门数据
export const getDivisionAPI = () => {
  return axios({
    url: "/mock/system/getDivision",
    method: "get"
  });
};

// 获取角色数据
export const getRoleAPI = () => {
  return axios({
    url: "/mock/system/getRole",
    method: "get"
  });
};

// 获取账户数据
export const getAccountAPI = () => {
  return axios({
    url: "/mock/system/getAccount",
    method: "get"
  });
};
