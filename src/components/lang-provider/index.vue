<template>
  <div>
    <a-config-provider :locale="locale">
      <slot></slot>
    </a-config-provider>
  </div>
</template>

<script setup lang="ts">
import zhCN from "@arco-design/web-vue/es/locale/lang/zh-cn";
import enUS from "@arco-design/web-vue/es/locale/lang/en-us";
interface Lang {
  [key: string]: any;
}
const locales = ref<Lang>({
  "zh-CN": zhCN,
  "en-US": enUS
});
const localeType = ref<string>("zh-CN");
const locale = computed(() => {
  return locales.value[localeType.value] || zhCN;
});
</script>

<style lang="scss" scoped></style>
