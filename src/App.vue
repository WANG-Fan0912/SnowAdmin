<template>
  <div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { loadingPage } from "@/utils/loading-page";

loadingPage.start();

onMounted(() => {
  loadingPage.done(200);
});
</script>

<style lang="scss" scoped></style>
