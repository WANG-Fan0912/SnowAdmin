<template>
  <div class="dc-page">
    <a-space direction="vertical" :size="10">
      <a-typography-text id="newbie-title-1"> SnowAdmin </a-typography-text>
      <a-typography-text id="newbie-title-2"> 清晰的项目架构：结构清晰，优雅易懂。 </a-typography-text>
      <a-typography-text id="newbie-title-3"> 严格的代码规范：严格遵循开发设计规范，保证代码的规范性。 </a-typography-text>
      <a-typography-text id="newbie-title-4"> 内置国际化方案：轻松实现多语言支持。</a-typography-text>
      <a-typography-text id="newbie-title-5"> 清新丰富的主题配置：内置多样的主题配置。</a-typography-text>
    </a-space>
    <div class="margin-top">
      <a-button type="primary" @click="openNewbie">打开指引</a-button>
    </div>
    <div class="margin-top">新手指引，基于<a-link href="https://driver.employleague.cn/" target="_blank">driver.js</a-link></div>
  </div>
</template>

<script setup lang="ts">
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const openNewbie = () => {
  const driverObj = driver({
    allowClose: true,
    doneBtnText: "结束",
    nextBtnText: "下一步",
    prevBtnText: "上一步",
    steps: [
      {
        element: "#newbie-title-1",
        popover: {
          title: "SnowAdmin",
          description: "清新优雅的中后台管理模板",
          side: "right"
        }
      },
      {
        element: "#newbie-title-2",
        popover: {
          title: "清晰的项目架构",
          description: "结构清晰，优雅易懂",
          side: "right"
        }
      },
      {
        element: "#newbie-title-3",
        popover: {
          title: "严格的代码规范",
          description: "严格遵循开发设计规范，保证代码的规范性",
          side: "left"
        }
      },
      {
        element: "#newbie-title-4",
        popover: {
          title: "内置国际化方案",
          description: "轻松实现多语言支持",
          side: "left"
        }
      },
      {
        element: "#newbie-title-5",
        popover: {
          title: "清新丰富的主题配置",
          description: "内置多样的主题配置",
          side: "left"
        }
      }
    ]
  });
  driverObj.drive();
};
</script>

<style lang="scss" scoped>
.margin-top {
  margin-top: $padding;
}
</style>
