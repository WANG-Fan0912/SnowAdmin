<template>
  <div>
    <div class="bbb">{{ val }}</div>
    <img :src="Tom" />
    <SvgIcon :name="'snow'" :size="20" />
    <SvgIcon :name="'bill'" :size="20" />
  </div>
</template>
<script setup lang="ts">
import Tom from "@assets/img/tom.jpg";
const val = ref<number>(600);
</script>
<style scoped lang="scss">
.read-the-docs {
  color: #888;
}
.bbb {
  user-select: none;
  width: 200px;
  padding: 10px;
}
</style>
