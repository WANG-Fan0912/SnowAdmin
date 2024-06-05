<template>
  <code-mirror
    basic
    v-model="codeValue"
    :extensions="extensions"
    :tab-size="config.tabSize"
    :basic="config.basic"
    :dark="config.dark"
    :readonly="config.readonly"
  />
</template>

<script setup lang="ts">
import CodeMirror from "vue-codemirror6";
import { oneDark } from "@codemirror/theme-one-dark";
import { json } from "@codemirror/lang-json";
import { javascript } from "@codemirror/lang-javascript";
import { vue } from "@codemirror/lang-vue";

defineOptions({ name: "CodeView" });

interface Props {
  type?: "javascript" | "vue" | "json";
  codeJson: string;
}
// withDefaults为defineProps标注类型
// https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-props
const props = withDefaults(defineProps<Props>(), {
  type: "javascript",
  codeJson: ""
});

const codeValue = computed(() => JSON.stringify(props.codeJson, null, "\t"));

const defaultConfig = {
  tabSize: 2,
  basic: true,
  dark: true,
  readonly: true
};
const config = defaultConfig;

// 扩展
const extensions = computed(() => {
  const arr = [oneDark];
  if (props.type === "javascript") {
    arr.push(javascript());
  }
  if (props.type === "vue") {
    arr.push(vue());
  }
  if (props.type === "json") {
    arr.push(json());
  }
  return arr;
});
</script>

<style lang="scss" scoped>
// 修改code中的字体样式
:deep(.ͼ1 .cm-scroller) {
  font-family: source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace;
}
</style>
