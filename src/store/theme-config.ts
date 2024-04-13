import { defineStore } from "pinia";

/**
 * 全局配置
 * @methods setCollapsed 设置菜单折叠
 */
export const useThemeConfig = defineStore("themeConfig", {
  state: (): any => ({
    collapsed: false // 是否折叠菜单
  }),
  actions: {
    async setCollapsed(data: boolean) {
      this.collapsed = data;
    }
  },
  persist: {
    enabled: true
  }
});
