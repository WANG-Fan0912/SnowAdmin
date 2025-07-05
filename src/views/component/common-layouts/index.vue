<template>
  <s-full-screen>
    <a-layout class="layout">
      <a-layout-sider class="layout-sider" :collapsed-width="12" :collapsed="collapsed">
        <div class="packup-btn" @click="collapsed = !collapsed">
          <icon-left v-if="!collapsed" />
          <icon-right v-else />
        </div>
        <div v-show="!collapsed">sider</div>
      </a-layout-sider>
      <a-layout-content>Content</a-layout-content>
    </a-layout>
  </s-full-screen>
</template>

<script setup lang="ts">
const collapsed = ref<boolean>(false);
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  box-shadow: $shadow-border-1;
  .layout-sider {
    position: relative;
    border-right: 1px solid cyan;
    .packup-btn {
      position: absolute;
      top: 50%;
      right: calc(-24px / 2);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      background: $color-bg-white;
      border-radius: 50%;
      box-shadow: inset 0 0 0 1px $color-border-2;
      transform: translateY(-50%);
      transition: all 0.1s;
      &:hover {
        transform: translateY(-50%) scale(1.1);
      }
    }
  }
}
:deep(.arco-layout-sider-light) {
  box-shadow: unset;
}
</style>
