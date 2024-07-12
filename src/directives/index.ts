import { Directive } from "vue";

const myDirective: Directive = {
  beforeMount(el, binding) {
    el.style.color = binding.value;
  }
};

// 定义安装函数
// install 函数是一个对象中的方法，其作用是将一系列指令对象安装到 Vue 应用实例中，它自带两个参数：app 和 options
// app就是vue实例，options则是安装函数的参数(可选)
// install 方法的定义就插件对象，install 方法会在引入插件时自动被 vue 调用，并传参 vue 实例和 options
const directives = {
  install(app: any, options?: any) {
    // 将一系列自定义指令对象安装到 Vue 应用实例中
    app.directive("my-directive", myDirective);
  }
};

// 导出安装函数
export default directives;
