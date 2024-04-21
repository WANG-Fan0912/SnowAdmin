import { defineStore } from "pinia";

/**
 * 全局配置
 * @methods setCollapsed 设置菜单折叠
 */
export const useThemeConfig = defineStore("themeConfig", {
  state: (): any => ({
    collapsed: false, // 是否折叠菜单
    refreshPage: true // 刷新页面
  }),
  actions: {
    // 折叠菜单
    async setCollapsed(data: boolean) {
      this.collapsed = data;
    },
    // 刷新页面
    setRefreshPage(data: Boolean) {
      this.refreshPage = data;
    }
  },
  persist: {
    enabled: true
  }
});
