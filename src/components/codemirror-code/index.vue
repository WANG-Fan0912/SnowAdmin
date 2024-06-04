<template>
  <code-mirror basic :lang="lang" v-model="codeVal" :theme="theme" :extensions="extensions" />
</template>

<script setup lang="ts">
import CodeMirror from "vue-codemirror6";
import { oneDark } from "@codemirror/theme-one-dark";
import { json } from "@codemirror/lang-json";

defineOptions({ name: "CodemirrorCode" });
const props = defineProps({
  initJson: {
    type: Object,
    default: {}
  }
});

// 初始化
let codeVal = ref("");
// 转成json字符串并格式化
codeVal.value = JSON.stringify(props.initJson, null, "\t");
// json
const lang = json();
// 扩展
const extensions = [oneDark];
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

<style lang="scss" scoped></style>
