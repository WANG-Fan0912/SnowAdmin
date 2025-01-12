import { defineStore } from "pinia";
import persistedstateConfig from "@/store/config/index";
/**
 * 用户信息
 * @methods setAccount 设置账号信息
 * @methods setToken 设置token
 * @methods logOut 退出登录
 */
const userInfoStore = () => {
  // 账号信息
  const account = ref<any>({
    username: "",
    roles: []
  });
  // token
  const token = ref<string>("");

  async function setAccount(data: Array<string>) {
    account.value = data;
  }
  async function setToken(data: string) {
    token.value = data;
  }
  async function logOut() {
    account.value = {};
    token.value = "";
  }

  return { account, token, setAccount, setToken, logOut };
};

export const useUserInfoStore = defineStore("user-info", userInfoStore, {
  persist: persistedstateConfig("user-info", ["account", "token"])
});
