<template>
  <div class="main">
    <code-mirror basic :lang="lang" v-model="codeVal" style="height: 400px" :theme="theme" />
  </div>
</template>

<script setup lang="ts">
import CodeMirror from "vue-codemirror6";
import { json } from "@codemirror/lang-json";

defineOptions({ name: "CodemirrorCode" });
const props = defineProps({
  initJson: {
    type: Object,
    default: () => {}
  }
});

// const initJson = {
//   name: `maybaby`,
//   year: 25,
//   weight: 45,
//   height: 165
// };
// 初始化
let codeVal = ref("");
// 转成json字符串并格式化
codeVal.value = JSON.stringify(props.initJson, null, "\t");
// json
const lang = json();
// 主题样式设置
const theme = {
  "&": {
    color: "white",
    backgroundColor: "#034"
  },
  ".cm-content": {
    caretColor: "#0e9"
  },
  "&.cm-focused .cm-cursor": {
    borderLeftColor: "#0e9"
  },
  "&.cm-focused .cm-selectionBackground, ::selection": {
    backgroundColor: "#074"
  },
  ".cm-gutters": {
    backgroundColor: "#045",
    color: "#ddd",
    border: "none"
  }
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
}
/* required! */
.cm-editor {
  height: 100%;
}
</style>
