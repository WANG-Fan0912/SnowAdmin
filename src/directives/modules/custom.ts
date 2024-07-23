import { Directive } from "vue";

const custom: Directive = {
  mounted(el, binding, vnode) {
    el.__onClick__ = () => {
      binding.value(vnode.props);
    };
    el.addEventListener("click", el.__onClick__);
  },
  beforeUnmount(el) {
    // 解绑dom上的点击事件
    el.removeEventListener("click", el.__onClick__);
  }
};

export default custom;
