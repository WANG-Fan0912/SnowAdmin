import { createI18n } from "vue-i18n";
import zhCN from "@/lang/modules/zhCN";
import enUS from "@/lang/modules/enUS";
// import pinia from "@/store/index";
// import { storeToRefs } from "pinia";
// import { useThemeConfig } from "@/store/modules/theme-config";
// const themeStore = useThemeConfig(pinia);
// const { language } = storeToRefs(themeStore);
/* 这里必须是messages名称 */
const messages = {
  "zh-CN": zhCN,
  "en-US": enUS
};

const i18n = createI18n({
  legacy: false, // Composition API模式需要设为false
  globalInjection: true, // 全局生效: $
  locale: "zh-CN", // 默认语言
  messages // 数据源
});

export default i18n;
