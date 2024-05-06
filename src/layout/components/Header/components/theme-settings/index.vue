<template>
  <a-drawer :width="340" :visible="props.themeOpen" @ok="handleCancel" @cancel="handleCancel" unmount-on-close>
    <template #title> 主题设置 </template>
    <div>
      <div>
        <a-divider orientation="center">导航模式</a-divider>
        <div class="flex-center">
          <a-tooltip v-for="item in layoutList" :key="item.value" :content="item.label" position="top" mini>
            <div
              :class="layoutType === item.value ? `current-layout ${item.class}` : item.class"
              @click="layouetChange(item.value)"
            >
              <icon-check-circle-fill class="layout-icon" />
            </div>
          </a-tooltip>
        </div>
      </div>
      <div class="box-gap">
        <a-divider orientation="center">主题设置</a-divider>
        <div class="flex-center">
          <a-color-picker
            v-model="themeColor"
            hide-trigger
            show-preset
            :preset-colors="presetColors"
            @change="themeColorChange"
          />
        </div>
      </div>
      <div class="box-gap">
        <div class="flex-row">
          <div>色弱模式</div>
          <a-switch v-model="colorWeakMode" @change="onColorWeak" />
        </div>
        <div class="flex-row">
          <div>灰色模式</div>
          <a-switch v-model="grayMode" @change="onGray" />
        </div>
        <div class="flex-row">
          <div>侧边栏深色</div>
          <a-switch />
        </div>
        <div class="flex-row">
          <div>页面过渡</div>
          <a-select :style="{ width: '100px' }" placeholder="请选择">
            <a-option>轻过渡</a-option>
            <a-option>卡片</a-option>
          </a-select>
        </div>
      </div>
    </div>
  </a-drawer>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useThemeConfig } from "@/store/modules/theme-config";
import { useThemeMethods } from "@/hooks/useThemeMethods";

const themeStore = useThemeConfig();
const { layoutType, themeColor, presetColors, colorWeakMode, grayMode } = storeToRefs(themeStore);

const layoutList = reactive({
  layoutDefaults: {
    value: "layoutDefaults",
    label: "默认布局",
    class: "layout-defaults"
  },
  layoutHead: {
    value: "layoutHead",
    label: "横向布局",
    class: "layout-head"
  },
  layoutMixing: {
    value: "layoutMixing",
    label: "混合布局",
    class: "layout-mixing"
  }
});

// 主题色设置
const themeColorChange = (value: string) => {
  themeColor.value = value;
  const { setThemeColor } = useThemeMethods();
  setThemeColor();
};

// 色弱模式
const onColorWeak = () => {
  const { setColorWeak } = useThemeMethods();
  setColorWeak();
};

// 灰色模式
const onGray = () => {
  const { setGray } = useThemeMethods();
  setGray();
};

// 布局变化
const layouetChange = (type: string) => {
  layoutType.value = type;
};

const props = defineProps({
  themeOpen: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits(["themeCancel"]);
const handleCancel = () => {
  emits("themeCancel");
};
</script>

<style lang="scss" scoped>
.box-gap {
  margin-top: 30px;
}

.flex-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $margin;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: $margin;
}

.layout-defaults,
.layout-head,
.layout-mixing {
  width: 70px;
  height: 50px;
  margin-right: $margin;
  background: $color-fill-1;
  border-radius: $radius-box;
  overflow: hidden;
  box-shadow: $shadow-special;

  .layout-icon {
    display: none;
  }
}

.current-layout {
  position: relative;

  .layout-icon {
    display: block;
    position: absolute;
    right: 2px;
    bottom: 2px;
    font-size: $font-size-body-3;
    color: $color-primary;
  }
}

.layout-defaults {
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    width: 20px;
    height: 100%;
    background: #232324;
  }

  &::after {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    width: 50px;
    height: 15px;
    background: #fff;
  }
}

.layout-head {
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    width: 100%;
    height: 15px;
    background: #232324;
  }
}

.layout-mixing {
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    width: 100%;
    height: 15px;
    background: #232324;
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 15px;
    width: 20px;
    height: calc(100% - 15px);
    background: #fff;
  }
}

:deep(.arco-divider-text) {
  background: $color-bg-3;
}
</style>
