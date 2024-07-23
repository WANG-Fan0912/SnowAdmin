<template>
  <div class="dc-page">
    <button v-custom="getFun" :goodsId="goodsId">文字变色</button>
  </div>
</template>

<script setup lang="ts">
const goodsId = ref(100);
setTimeout(() => {
  goodsId.value = 200;
}, 1000);

const getFun = (e: any) => {
  console.log("点击事件", e);
};
</script>

<style lang="scss" scoped></style>
