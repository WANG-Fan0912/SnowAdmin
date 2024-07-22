import { Directive } from "vue";

const custom: Directive = {
  mounted(el, binding) {
    el.style.color = binding.value;
  }
};

export default custom;
