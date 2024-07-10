/// <reference types="vite/client" />
declare module "*.vue" {
  import { defineComponent } from "vue";
  const component: ReturnType<typeof defineComponent>;
  export default component;
}

declare module "vue-i18n";
declare module "@arco-design/color";
declare module "sortablejs";
declare module "vue-codemirror6";
declare module "@codemirror/theme-one-dark";
declare module "@codemirror/lang-json";
declare module "@codemirror/lang-javascript";
declare module "@codemirror/lang-vue";
declare module "nprogress";
