<template>
  <div>{{ val }}</div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const val = ref<number>(300);
</script>
<style scoped lang="scss">
.read-the-docs {
  color: #888;
}
.aaa {
  border: 1px solid red;
  .bbb {
    color: $primary-color;
    user-select: none;
    width: 200px;
    padding: 10px;
    position: absolute;
  }
}
</style>
