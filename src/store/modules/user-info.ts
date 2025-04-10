import { defineStore } from "pinia";
import persistedstateConfig from "@/store/config/index";
import { getUserInfoAPI } from "@/api/modules/user/index";

interface Account {
  user: any; // 用户信息
  roles: string[]; // 角色
  permissions: string[]; // 权限
}

/**
 * 用户信息
 * @methods setAccount 设置账号信息
 * @methods setToken 设置token
 * @methods logOut 退出登录
 */
const userInfoStore = () => {
  // 账号信息
  const account = ref<Account>({
    user: {}, // 用户信息
    roles: [], // 角色
    permissions: [] // 权限
  });
  // token
  const token = ref<string>("");

  // 设置账号信息
  async function setAccount() {
    // 存储用户信息
    let data = await getUserInfoAPI();
    account.value = data.data;
  }
  // 设置token
  async function setToken(data: string) {
    token.value = data;
  }
  // 退出登录
  async function logOut() {
    // 清除账号数据
    account.value = {
      user: {},
      roles: [],
      permissions: []
    };
    token.value = "";
  }

  return { account, token, setAccount, setToken, logOut };
};

export const useUserInfoStore = defineStore("user-info", userInfoStore, {
  persist: persistedstateConfig("user-info", ["token"])
});
