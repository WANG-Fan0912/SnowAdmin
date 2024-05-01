import { storeToRefs } from "pinia";
import { useThemeConfig } from "@/store/modules/theme-config";
/* 主题处理hooks */
export const useRoutingMethod = () => {
  /**
   * @description: 暗黑模式
   */
  const darkMode = () => {
    const themeStore = useThemeConfig();
    const { darkMode } = storeToRefs(themeStore);
    if (darkMode.value) {
      // 设置为暗黑主题
      document.body.setAttribute("arco-theme", "dark");
    } else {
      // 恢复亮色主题
      document.body.removeAttribute("arco-theme");
    }
  };
  return {
    darkMode
  };
};
