import axios from "@/api";

// 登录
export const LoginAPI = (data: any) => {
  return axios({
    url: "store/store.php?action=Login",
    method: "post",
    data
  });
};
