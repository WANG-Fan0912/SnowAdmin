import { createApp } from "vue";
import "@/style.css";
import App from "@/App.vue";
import ArcoVue from "@arco-design/web-vue";
import router from "@/router/index";
import pinia from "@/store/index";
import "virtual:svg-icons-register";
import "@arco-design/web-vue/dist/arco.css";
// 额外引入图标库
import ArcoVueIcon from "@arco-design/web-vue/es/icon";
// 引入i18n
import i18n from "@/lang/index";
const app = createApp(App);
app.use(ArcoVue, {
  componentPrefix: "arco"
});
app.use(i18n);
app.use(ArcoVueIcon);
app.use(pinia);
app.use(router);
app.mount("#app");
