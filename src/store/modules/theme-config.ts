import { defineStore } from "pinia";
/**
 * 全局配置
 * @methods setCollapsed 设置菜单折叠
 * @methods setRefreshPage 刷新页面
 * @methods setLanguage 设置语言
 */
export const useThemeConfig = defineStore("theme-config", {
  state: (): any => ({
    collapsed: false, // 是否折叠菜单
    refreshPage: true, // 刷新页面
    language: "zh-CN" // 系统语言
  }),
  actions: {
    // 折叠菜单
    setCollapsed(data: boolean) {
      this.collapsed = data;
    },
    // 刷新页面
    setRefreshPage(data: Boolean) {
      this.refreshPage = data;
    },
    // 设置语言
    setLanguage(data: string) {
      this.language = data;
    }
  },
  persist: true
});
