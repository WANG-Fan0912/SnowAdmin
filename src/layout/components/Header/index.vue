<template>
  <a-layout-header class="header">
    <div class="header_crumb">
      <div class="menu_fold"><icon-menu-fold style="font-size: 18px; stroke-width: 3" /></div>
      <div class="breadcrumb">
        <a-space direction="vertical">
          <a-breadcrumb>
            <a-breadcrumb-item>
              <icon-home />
              首页
            </a-breadcrumb-item>
            <a-breadcrumb-item>
              <icon-at />
              常用组件
            </a-breadcrumb-item>
            <a-breadcrumb-item>
              <icon-at />
              文件上传
            </a-breadcrumb-item>
          </a-breadcrumb>
        </a-space>
      </div>
    </div>
    <div class="header_setting">
      <a-tooltip content="语言">
        <div>
          <icon-language />
        </div>
      </a-tooltip>
      <a-tooltip content="切换黑夜模式">
        <div>
          <icon-sun-fill />
        </div>
      </a-tooltip>
      <a-tooltip content="通知">
        <div>
          <icon-notification />
        </div>
      </a-tooltip>
      <a-tooltip content="全屏">
        <div>
          <icon-fullscreen />
        </div>
      </a-tooltip>
      <a-tooltip content="系统设置">
        <div>
          <icon-settings />
        </div>
      </a-tooltip>
      <a-tooltip content="主题设置">
        <div>
          <icon-skin />
        </div>
      </a-tooltip>
      <div class="my_image"><a-image width="32" :src="Tom" /></div>
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import Tom from "@/assets/img/tom.jpg";
</script>

<style lang="scss" scoped>
.header {
  height: 60px;
  padding: 0 $padding;
  box-sizing: border-box;
  border-bottom: $border-1 solid $color-border-2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .header_crumb {
    width: 100%;
    display: flex;
    align-items: center;
    .menu_fold {
      width: 32px;
      height: 32px;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .breadcrumb {
      margin-left: $margin;
    }
  }
  .header_setting {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      box-sizing: border-box;
      // border: $border-1 solid $color-border-1;
      margin-left: $margin;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    > div:hover {
      background: $color-fill-1;
    }
    .my_image {
      width: 32px;
      height: 32px;
      overflow: hidden;
    }
  }
}
</style>
