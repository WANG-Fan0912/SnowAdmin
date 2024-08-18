<template>
  <div class="snow-page">
    <!-- 常用功能 -->
    <Shortcut />
    <!-- 第三板指标 -->
    <TargetBox />
    <!-- 财务指标 -->
    <Finance />
    <!-- 数据图 -->
    <DataBox />
  </div>
</template>

<script setup lang="ts">
import Shortcut from "@/views/home/components/shortcut.vue";
import TargetBox from "@/views/home/components/target-box.vue";
import Finance from "@/views/home/components/finance.vue";
import DataBox from "@/views/home/components/data-box.vue";

const route = useRoute();
onMounted(() => {
  console.log("初始化", route);
});
</script>

<style lang="scss" scoped></style>
