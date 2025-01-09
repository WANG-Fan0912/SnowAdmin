<template>
  <div class="snow-page">
    <div class="snow-inner">
      <svg id="imgcode"></svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import JsBarcode from "jsbarcode";

const createCode = () => {
  JsBarcode("#imgcode", "123", {
    format: "CODE39", //选择要使用的条形码类型
    width: 3, //设置条之间的宽度
    height: 100, //高度
    displayValue: true, //是否在条形码下方显示文字
    text: "456", //覆盖显示的文本
    fontOptions: "bold italic", //使文字加粗体或变斜体
    font: "fantasy", //设置文本的字体
    textAlign: "left", //设置文本的水平对齐方式
    textPosition: "top", //设置文本的垂直位置
    textMargin: 5, //设置条形码和文本之间的间距
    fontSize: 15, //设置文本的大小
    background: "#eee", //设置条形码的背景
    lineColor: "#2196f3", //设置条和文本的颜色。
    margin: 15 //设置条形码周围的空白边距
  });
};

onMounted(() => {
  createCode();
});
</script>

<style lang="scss" scoped></style>
