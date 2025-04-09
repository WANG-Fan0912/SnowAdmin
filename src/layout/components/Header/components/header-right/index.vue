<template>
  <div class="header_setting" :class="isMobile && 'head-absolute-fix'">
    <!-- 国际化 -->
    <a-dropdown trigger="hover" @select="onLange">
      <a-button size="mini" type="text" class="icon_btn" id="system-language">
        <template #icon>
          <icon-language :size="18" />
        </template>
      </a-button>
      <template #content>
        <a-doption :disabled="language === 'zh-CN'">{{ $t(`system.zh-CN`) }}</a-doption>
        <a-doption :disabled="language === 'en-US'">{{ $t(`system.en-US`) }}</a-doption>
      </template>
    </a-dropdown>
    <!-- 切换黑夜模式 -->
    <a-tooltip :content="$t(`system.${!darkMode ? 'switch-to-night-mode' : 'switch-to-daytime-mode'}`)">
      <a-button size="mini" type="text" class="icon_btn" id="system-dark" @click="onNightMode">
        <template #icon>
          <icon-sun-fill :size="18" v-if="!darkMode" />
          <icon-moon-fill :size="18" v-else />
        </template>
      </a-button>
    </a-tooltip>
    <!-- 通知 -->
    <a-popover position="bottom" trigger="click">
      <a-button size="mini" type="text" class="icon_btn notice" id="system-notice">
        <template #icon>
          <icon-notification :size="18" />
        </template>
      </a-button>
      <template #content><Notice /></template>
    </a-popover>
    <!-- 全屏 -->
    <a-tooltip :content="$t(`system.${fullScreen ? 'full-screen' : 'exit-full-screen'}`)">
      <a-button size="mini" type="text" class="icon_btn" id="system-fullscreen" @click="onFullScreen">
        <template #icon>
          <icon-fullscreen :size="18" v-if="fullScreen" />
          <icon-fullscreen-exit :size="18" v-else />
        </template>
      </a-button>
    </a-tooltip>
    <!-- 系统设置 -->
    <a-tooltip :content="$t(`system.system-settings`)">
      <a-button size="mini" type="text" class="icon_btn" id="system-settings" @click="onSystemSetting">
        <template #icon>
          <icon-settings :size="18" />
        </template>
      </a-button>
    </a-tooltip>
    <!-- 主题设置 -->
    <a-tooltip :content="$t(`system.theme-settings`)">
      <a-button size="mini" type="text" class="icon_btn" id="system-theme" @click="onThemeSetting">
        <template #icon>
          <icon-skin :size="18" />
        </template>
      </a-button>
    </a-tooltip>
    <!-- 我的 -->
    <a-dropdown trigger="hover">
      <div class="my_setting" id="system-my-setting">
        <a-image width="32" height="32" fit="cover" :src="myImage" class="my_image" />
        <span>admin</span>
        <div class="icon_down">
          <icon-down style="stroke-width: 3" />
        </div>
      </div>
      <template #content>
        <!-- 个人中心 -->
        <a-doption @click="onPerson">
          <template #default>
            <SvgIcon :name="'user'" :size="18" />
            <span class="margin-left-text">{{ $t(`system.personal-information`) }}</span>
          </template>
        </a-doption>
        <!-- 修改密码 -->
        <a-doption @click="onUpdate">
          <template #default>
            <SvgIcon :name="'lock-pwd'" :size="18" />
            <span class="margin-left-text">{{ $t(`system.change-password`) }}</span>
          </template>
        </a-doption>
        <!-- 项目地址 -->
        <a-doption @click="onProject">
          <template #default>
            <SvgIcon :name="'gitee'" :size="18" />
            <span class="margin-left-text">{{ $t(`system.project-address`) }}</span>
          </template>
        </a-doption>
        <a-divider margin="0" />
        <!-- 退出登录 -->
        <a-doption @click="logOut">
          <template #default>
            <SvgIcon :name="'exit'" :size="18" />
            <span class="margin-left-text">{{ $t(`system.logout`) }}</span>
          </template>
        </a-doption>
      </template>
    </a-dropdown>
  </div>
  <SystemSettings :system-open="systemOpen" @system-cancel="systemOpen = false" />
  <ThemeSettings :theme-open="themeOpen" @theme-cancel="themeOpen = false" />
</template>

<script setup lang="ts">
import Notice from "@/layout/components/Header/components/Notice/index.vue";
import SystemSettings from "@/layout/components/Header/components/system-settings/index.vue";
import ThemeSettings from "@/layout/components/Header/components/theme-settings/index.vue";
import myImage from "@/assets/img/my-image.jpg";
import { useI18n } from "vue-i18n";
import { Modal } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useUserInfoStore } from "@/store/modules/user-info";
import { useThemeConfig } from "@/store/modules/theme-config";
import { useThemeMethods } from "@/hooks/useThemeMethods";
import { useDevicesSize } from "@/hooks/useDevicesSize";
import { useRoutesConfigStore } from "@/store/modules/route-config";
const i18n = useI18n();
const router = useRouter();
const { isMobile } = useDevicesSize();
const themeStore = useThemeConfig();
const { language, darkMode } = storeToRefs(themeStore);

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
  let { setDarkMode } = useThemeMethods();
  setDarkMode();
};

// 语言
const onLange = (value: string) => {
  if (value === "Chinese" || value === "中文") {
    themeStore.setLanguage("zh-CN");
  } else {
    themeStore.setLanguage("en-US");
  }
  i18n.locale.value = language.value;
};

// 个人中心
const onPerson = () => {
  router.push({
    path: "/personal/userinfo"
  });
};

// 修改密码
const onUpdate = () => {
  router.push({
    path: "/personal/user-settings"
  });
};

// 项目地址
const onProject = () => {
  window.open("https://gitee.com/wang_fan_w/SnowAdmin", "_blank");
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
        // 用户退出
        const store = useUserInfoStore();
        await store.logOut();
        router.replace("/login");
        // 清除路由数据
        useRoutesConfigStore().resetRoute();
        return true;
      } catch {
        return false;
      }
    }
  });
};
</script>

<style lang="scss" scoped>
.head-absolute-fix {
  position: absolute;
  top: 0;
  right: $padding;
}
.header_setting {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  background-color: $color-bg-2;
  > .icon_btn {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: $icon-box;
    height: $icon-box;
    margin-left: $margin;
    color: $color-text-1;
    border-radius: $radius-box-1;
  }
  .my_setting {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 32px;
    margin-left: $margin;
    overflow: hidden;
    .my_image {
      margin-right: 8px;
      border-radius: 50%;
    }
    .icon_down {
      margin: 0 0 0 5px;
      transition: transform 0.2s;
      transform: rotate(0deg);
    }
  }
}
.notice {
  position: relative;
  &::before {
    position: absolute;
    top: -4px;
    right: -2px;
    width: 6px;
    height: 6px;
    content: "";
    background: $color-danger;
    border: 2px solid #ffffff;
    border-radius: 50%;
  }
}
:deep(.arco-dropdown-open) {
  .icon_down {
    transform: rotate(180deg) !important;
  }
}
.margin-left-text {
  margin-left: $margin-text;
}
</style>
