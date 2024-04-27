import { defineStore } from "pinia";
/**
 * 用户信息
 * @methods setAccount 设置账号信息
 * @methods setToken 设置token
 * @methods logOut 退出登录
 */
export const useUserInfoStore = defineStore("userInfo", {
  state: (): any => ({
    account: {
      username: "",
      roles: []
    }, // 账号信息
    token: "" // token
  }),
  actions: {
    async setAccount(data: Array<string>) {
      this.account = data;
    },
    async setToken(data: string) {
      this.token = data;
    },
    async logOut() {
      this.account = {};
      this.token = "";
    }
  },
  persist: {
    enabled: true, // 开启数据缓存-默认缓存全部数据
    key: "userInfo"
  }
});
