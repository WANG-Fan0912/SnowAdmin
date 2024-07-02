<template>
  <FillPage>
    <div class="container">
      <div class="container-main">
        <div class="left-box">
          <a-scrollbar style="height: 100%; overflow: auto" outer-class="scrollbar">
            <div style="height: 4000px; width: 100%; background-color: var(--color-primary-light-4)">Content</div>
          </a-scrollbar>
        </div>
        <div class="right-box"></div>
      </div>
    </div>
  </FillPage>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.container {
  height: 100%;
  padding: $padding;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: $shadow-border-1;
}
.container-main {
  height: 100%;
  display: flex;
  border: 1px solid gold;
  overflow: hidden;
  .left-box {
    width: 300px;
    height: 100%;
    border: 1px solid red;
    .scrollbar {
      height: 100%;
    }
  }
  .right-box {
    margin-left: $padding;
    width: calc(100% - 220px - $padding);
    height: 100%;
    border: 1px solid cyan;
  }
}
</style>
