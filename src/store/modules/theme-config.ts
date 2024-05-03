import { defineStore } from "pinia";
import persistedstateConfig from "@/store/config/index";
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
    language: "zh-CN", // 系统语言
    darkMode: false, // 黑暗模式
    isBreadcrumb: true, // 面包屑渲染
    isTabs: true, // 标签栏渲染
    isFooter: true // 页脚渲染
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
  persist: persistedstateConfig("theme-config")
});
