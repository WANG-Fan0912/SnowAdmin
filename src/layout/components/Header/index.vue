<template>
  <a-layout-header class="header">
    <div class="header_crumb">
      <div class="menu_fold">
        <a-button size="mini" type="text" class="menu_fold_icon">
          <template #icon>
            <icon-menu-fold :size="18" />
          </template>
        </a-button>
      </div>
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
        <a-button size="mini" type="text" class="icon_btn">
          <template #icon>
            <icon-language :size="18" />
          </template>
        </a-button>
      </a-tooltip>
      <a-tooltip content="切换黑夜模式">
        <a-button size="mini" type="text" class="icon_btn">
          <template #icon>
            <icon-sun-fill :size="18" />
          </template>
        </a-button>
      </a-tooltip>
      <a-tooltip content="通知">
        <a-button size="mini" type="text" class="icon_btn">
          <template #icon>
            <icon-notification :size="18" />
          </template>
        </a-button>
      </a-tooltip>
      <a-tooltip content="全屏">
        <a-button size="mini" type="text" class="icon_btn">
          <template #icon>
            <icon-fullscreen :size="18" />
          </template>
        </a-button>
      </a-tooltip>
      <a-tooltip content="系统设置">
        <a-button size="mini" type="text" class="icon_btn">
          <template #icon>
            <icon-settings :size="18" />
          </template>
        </a-button>
      </a-tooltip>
      <a-tooltip content="主题设置">
        <a-button size="mini" type="text" class="icon_btn">
          <template #icon>
            <icon-skin :size="18" />
          </template>
        </a-button>
      </a-tooltip>
      <!-- 我的 -->
      <a-dropdown trigger="hover">
        <div class="my_setting">
          <a-image width="32" fit="contain" :src="Tom" class="my_image" />
          <span>admin</span>
          <div class="icon_down">
            <icon-down style="stroke-width: 3" />
          </div>
        </div>
        <template #content>
          <a-doption>
            <template #icon>
              <icon-location />
            </template>
            <template #default>个人信息</template>
          </a-doption>
          <a-doption>
            <template #icon>
              <icon-location />
            </template>
            <template #default>修改密码</template>
          </a-doption>
          <a-doption>
            <template #icon>
              <icon-location />
            </template>
            <template #default>项目地址</template>
          </a-doption>
          <a-divider margin="0" />
          <a-doption>
            <template #icon>
              <icon-location />
            </template>
            <template #default>退出登录</template>
          </a-doption>
        </template>
      </a-dropdown>
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
      .menu_fold_icon {
        color: $color-text-1;
        border-radius: $radius-box;
      }
    }
    .breadcrumb {
      margin-left: $margin;
    }
  }
  .header_setting {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > .icon_btn {
      width: $icon-box;
      height: $icon-box;
      border-radius: $radius-box;
      box-sizing: border-box;
      margin-left: $margin;
      display: flex;
      justify-content: space-around;
      align-items: center;
      color: $color-text-1;
    }

    .my_setting {
      // width: 32px;
      height: 32px;
      // border-radius: 50%;
      margin-left: $margin;
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .my_image {
        border-radius: 50%;
        margin-right: 8px;
      }
      .icon_down {
        transform: rotate(0deg);
        margin: 0 0 0 5px;
        transition: transform 0.2s;
      }
    }
  }
}
:deep(.arco-dropdown-open) {
  .icon_down {
    transform: rotate(180deg) !important;
  }
}
</style>
