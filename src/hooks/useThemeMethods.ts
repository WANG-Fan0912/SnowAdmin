import { storeToRefs } from "pinia";
import { useThemeConfig } from "@/store/modules/theme-config";
import { generate, getRgbStr } from "@arco-design/color";
/* 主题处理hooks */
export const useThemeMethods = () => {
  /**
   * @description: 暗黑模式
   */
  const setDarkMode = () => {
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

  /**
   * @description: 主题色设置
   */
  const setThemeColor = () => {
    const themeStore = useThemeConfig();
    const { themeColor, darkMode } = storeToRefs(themeStore);
    // 对于给定的颜色，使用算法生成包含10种颜色的渐变样本。这适用于光模式和暗模式。
    let list = generate(themeColor.value, { list: true, dark: darkMode.value });
    list.forEach((color: string, index: number) => {
      // https://arco.design/palette/list
      // arco的颜色等级为1-10，这里需要index+1
      document.body.style.setProperty(`--primary-${index + 1}`, getRgbStr(color));
    });
  };

  return {
    setDarkMode,
    setThemeColor
  };
};
