import { defineStore } from "pinia";

/**
 * 全局配置
 * @methods setCollapsed 设置菜单折叠
 */
export const useThemeConfig = defineStore("themeConfig", {
  state: (): any => ({
    collapsed: false, // 是否折叠菜单
    refreshPage: true, // 刷新页面
    language: "zh-CN" // 系统语言
  }),
  actions: {
    // 折叠菜单
    async setCollapsed(data: boolean) {
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
  persist: {
    enabled: true, // 开启数据缓存-默认缓存全部数据
    key: "themeConfig"
  }
});
