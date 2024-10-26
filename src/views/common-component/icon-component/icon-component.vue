<template>
  <div class="snow-page">
    <div class="snow-inner-page">
      <div class="title">图标选择器</div>
      <a-input
        :style="{ width: '400px' }"
        placeholder="请选择图标"
        allow-clear
        v-model="iconName"
        @focus="onFocus"
        @clear="onClear"
      >
        <template #suffix v-if="iconName">
          <component :is="iconName"></component>
        </template>
      </a-input>
      <a-divider />
      <div class="target-title">当前选择的图标：</div>
      <component v-if="iconName" :is="iconName" size="50"></component>
      <a-empty v-else />
      <SelectIcon ref="SelectIconRef" @select="select" />
    </div>
  </div>
</template>

<script setup lang="ts">
const iconName = ref<string>("");
const SelectIconRef = ref();
const onFocus = () => {
  SelectIconRef.value.open();
};
const onClear = () => {
  iconName.value = "";
};

const select = (icon: string) => {
  iconName.value = icon;
};
</script>

<style lang="scss" scoped>
.title {
  color: $color-text-1;
  font-size: $font-size-title-1;
  margin-bottom: $margin;
}
.target-title {
  margin-bottom: $margin;
}
</style>
