<template>
  <Transition name="slideRight" mode="out-in" appear>
    <!-- 向内传递插槽内容 -->
    <slot></slot>
  </Transition>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
// Transition过渡动画
.slideRight-enter-active {
  animation: slide-enter-right 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
.slideRight-leave-active {
  animation: slide-leave-right 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
@keyframes slide-enter-right {
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes slide-leave-right {
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(20px);
  }
}
</style>
