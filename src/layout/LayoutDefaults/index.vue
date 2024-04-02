<template>
  <a-layout class="layout">
    <Aside />
    <a-layout>
      <Header />
      <Main />
      <Footer />
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import Aside from "@/layout/components/Aside/index.vue";
import Header from "@/layout/components/Header/index.vue";
import Main from "@/layout/components/Main/index.vue";
import Footer from "@/layout/components/Footer/index.vue";
defineOptions({ name: "LayoutDefaults" });
</script>

<style lang="scss" scoped>
.layout {
  height: 100vh;
}
</style>
