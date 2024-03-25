import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "virtual:svg-icons-register";
import SvgIcon from "./components/SvgIcon/index.vue"; // 全局svg图标组件

const app = createApp(App);
app.component("SvgIcon", SvgIcon);
app.mount("#app");
