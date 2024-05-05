import { defineStore } from "pinia";
import persistedstateConfig from "@/store/config/index";

interface ThemeConfig {
  collapsed: Boolean;
  refreshPage: Boolean;
  language: string;
  darkMode: Boolean;
  isAccordion: Boolean;
  isBreadcrumb: Boolean;
  isTabs: Boolean;
  isFooter: Boolean;
  watermark: string;
  watermarkStyle: any;
  watermarkRotate: number;
  watermarkGap: Array<number>;
  layoutType: string;
  themeColor: string;
}

/**
 * 全局配置
 * @methods setCollapsed 设置菜单折叠
 * @methods setRefreshPage 刷新页面
 * @methods setLanguage 设置语言
 */
export const useThemeConfig = defineStore("theme-config", {
  state: (): ThemeConfig => ({
    collapsed: false, // 是否折叠菜单
    refreshPage: true, // 刷新页面
    language: "zh-CN", // 系统语言
    darkMode: false, // 黑暗模式
    isAccordion: true, // 菜单手风琴
    isBreadcrumb: true, // 面包屑渲染
    isTabs: true, // 标签栏渲染
    isFooter: true, // 页脚渲染
    watermark: "dc admin", // 水印
    watermarkStyle: {
      fontSize: 12,
      color: "rgba(0, 0, 0, 0.15)"
    }, // 水印风格
    watermarkRotate: 330, // 水印角度
    watermarkGap: [100, 100], // 水印间隙
    layoutType: "layoutDefaults", // 布局模式：layoutDefaults、layoutHead、layoutMixing
    themeColor: "#165dff" // 主题色
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
