<template>
  <a-layout-header class="header">
    <div class="header_crumb">
      <div class="menu_fold">
        <a-button size="mini" type="text" class="menu_fold_icon" @click="onCollapsed">
          <template #icon>
            <icon-menu-fold :size="18" v-if="!collapsed" />
            <icon-menu-unfold :size="18" v-if="collapsed" />
          </template>
        </a-button>
      </div>
      <div class="breadcrumb" v-if="isBreadcrumb">
        <Breadcrumb />
      </div>
    </div>
    <div class="header_setting">
      <!-- 国际化 -->
      <a-dropdown trigger="hover" @select="onLange">
        <a-button size="mini" type="text" class="icon_btn">
          <template #icon>
            <icon-language :size="18" />
          </template>
        </a-button>
        <template #content>
          <a-doption :disabled="language === 'zh-CN'">{{ $t(`language.zh-CN`) }}</a-doption>
          <a-doption :disabled="language === 'en-US'">{{ $t(`language.en-US`) }}</a-doption>
        </template>
      </a-dropdown>
      <!-- 切换黑夜模式 -->
      <a-tooltip :content="$t(`language.${!darkMode ? 'switch-to-night-mode' : 'switch-to-daytime-mode'}`)">
        <a-button size="mini" type="text" class="icon_btn" @click="onNightMode">
          <template #icon>
            <icon-sun-fill :size="18" v-if="!darkMode" />
            <icon-moon-fill :size="18" v-else />
          </template>
        </a-button>
      </a-tooltip>
      <!-- 通知 -->
      <a-popover position="bottom" trigger="click">
        <a-button size="mini" type="text" class="icon_btn notice">
          <template #icon>
            <icon-notification :size="18" />
          </template>
        </a-button>
        <template #content><Notice /></template>
      </a-popover>
      <!-- 全屏 -->
      <a-tooltip :content="$t(`language.${fullScreen ? 'full-screen' : 'exit-full-screen'}`)">
        <a-button size="mini" type="text" class="icon_btn" @click="onFullScreen">
          <template #icon>
            <icon-fullscreen :size="18" v-if="fullScreen" />
            <icon-fullscreen-exit :size="18" v-else />
          </template>
        </a-button>
      </a-tooltip>
      <!-- 系统设置 -->
      <a-tooltip :content="$t(`language.system-settings`)">
        <a-button size="mini" type="text" class="icon_btn" @click="onSystemSetting">
          <template #icon>
            <icon-settings :size="18" />
          </template>
        </a-button>
      </a-tooltip>
      <!-- 主题设置 -->
      <a-tooltip :content="$t(`language.theme-settings`)">
        <a-button size="mini" type="text" class="icon_btn" @click="onThemeSetting">
          <template #icon>
            <icon-skin :size="18" />
          </template>
        </a-button>
      </a-tooltip>
      <!-- 我的 -->
      <a-dropdown trigger="hover">
        <div class="my_setting">
          <a-image width="32" height="32" fit="cover" :src="myImage" class="my_image" />
          <span>admin</span>
          <div class="icon_down">
            <icon-down style="stroke-width: 3" />
          </div>
        </div>
        <template #content>
          <!-- 个人中心 -->
          <a-doption>
            <template #default>
              <SvgIcon :name="'user'" :size="18" />
              <span class="margin-left-text">{{ $t(`language.personal-information`) }}</span>
            </template>
          </a-doption>
          <!-- 修改密码 -->
          <a-doption>
            <template #default>
              <SvgIcon :name="'lock-pwd'" :size="18" />
              <span class="margin-left-text">{{ $t(`language.change-password`) }}</span>
            </template>
          </a-doption>
          <!-- 项目地址 -->
          <a-doption>
            <template #default>
              <SvgIcon :name="'gitee'" :size="18" />
              <span class="margin-left-text">{{ $t(`language.project-address`) }}</span>
            </template>
          </a-doption>
          <a-divider margin="0" />
          <!-- 退出登录 -->
          <a-doption @click="logOut">
            <template #default>
              <SvgIcon :name="'exit'" :size="18" />
              <span class="margin-left-text">{{ $t(`language.logout`) }}</span>
            </template>
          </a-doption>
        </template>
      </a-dropdown>
    </div>
    <SystemSettings :system-open="systemOpen" @system-cancel="systemOpen = false" />
    <ThemeSettings :theme-open="themeOpen" @theme-cancel="themeOpen = false" />
  </a-layout-header>
</template>
<script setup lang="ts">
import Notice from "@/layout/components/Header/components/notice/index.vue";
import Breadcrumb from "@/layout/components/Header/components/breadcrumb/index.vue";
import SystemSettings from "@/layout/components/Header/components/system-settings/index.vue";
import ThemeSettings from "@/layout/components/Header/components/theme-settings/index.vue";
import myImage from "@/assets/img/my-image.jpg";
import { useI18n } from "vue-i18n";
import { Modal } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useUserInfoStore } from "@/store/modules/user-info";
import { useThemeConfig } from "@/store/modules/theme-config";
const i18n = useI18n();
const router = useRouter();
const themeStore = useThemeConfig();
const { collapsed, language, darkMode, isBreadcrumb } = storeToRefs(themeStore);

// 折叠
const onCollapsed = () => {
  themeStore.setCollapsed(!collapsed.value);
};

// 系统设置
const systemOpen = ref(false);
const onSystemSetting = () => {
  systemOpen.value = true;
};

// 主题设置
const themeOpen = ref(false);
const onThemeSetting = () => {
  themeOpen.value = true;
};
// 全屏
const fullScreen = ref(true);
const onFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    fullScreen.value = false;
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      fullScreen.value = true;
    }
  }
};

// 黑暗模式
const onNightMode = () => {
  darkMode.value = !darkMode.value;
  if (darkMode.value) {
    // 设置为暗黑主题
    document.body.setAttribute("arco-theme", "dark");
  } else {
    // 恢复亮色主题
    document.body.removeAttribute("arco-theme");
  }
};

// 语言
const onLange = (e: string) => {
  if (e === "Chinese" || e === "中文") {
    themeStore.setLanguage("zh-CN");
  } else {
    themeStore.setLanguage("en-US");
  }
  i18n.locale.value = language.value;
};

// 退出登录
const logOut = () => {
  Modal.warning({
    title: "提示",
    content: "确定退出登录？",
    hideCancel: false,
    closable: true,
    onBeforeOk: async () => {
      try {
        const store = useUserInfoStore();
        await store.logOut();
        router.replace("/login");
        return true;
      } catch {
        return false;
      }
    }
  });
};
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
      height: 32px;
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
.notice {
  position: relative;
  &::before {
    content: "";
    width: 6px;
    height: 6px;
    border: 2px solid #fff;
    border-radius: 50%;
    position: absolute;
    right: -2px;
    top: -4px;
    background: $color-danger;
  }
}
:deep(.arco-dropdown-open) {
  .icon_down {
    transform: rotate(180deg) !important;
  }
}
</style>
