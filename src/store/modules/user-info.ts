import { defineStore } from "pinia";
import persistedstateConfig from "@/store/config/index";
/**
 * 用户信息
 * @methods setAccount 设置账号信息
 * @methods setToken 设置token
 * @methods logOut 退出登录
 */
export const useUserInfoStore = defineStore("user-info", {
  state: (): any => ({
    account: {
      username: "",
      roles: []
    }, // 账号信息
    AdminToken: "" // token
  }),
  actions: {
    async setAccount(data: Array<string>) {
      this.account = data;
    },
    async setToken(data: string) {
      this.AdminToken = data;
    },
    async logOut() {
      this.account = {};
      this.AdminToken = "";
    }
  },
  persist: persistedstateConfig("user-info")
});
