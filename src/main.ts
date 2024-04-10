import { createApp } from "vue";
import "@/style.css";
import App from "@/App.vue";
import ArcoVue from "@arco-design/web-vue";
import router from "@/router/index";
import pinia from "@/store/index";
import "virtual:svg-icons-register";
import "@arco-design/web-vue/dist/arco.css";

const app = createApp(App);
app.use(ArcoVue, {
  // 用于改变使用组件时的前缀名称
  componentPrefix: "arco"
});
app.use(pinia);
app.use(router);
app.mount("#app");
