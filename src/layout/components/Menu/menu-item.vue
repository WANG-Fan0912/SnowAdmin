<template>
  <template v-for="item in props.routeTree" :key="item.name">
    <a-sub-menu v-if="item.children && item.children.length > 0" :key="item.name">
      <template #icon v-if="item.meta.svgIcon || item.meta.icon">
        <MenuItemIcon :svg-icon="item.meta.svgIcon" :icon="item.meta.icon" />
      </template>
      <template #title>{{ $t(`language.${item.meta.title}`) }}</template>
      <MenuItem :route-tree="item.children" />
    </a-sub-menu>
    <a-menu-item v-else :key="item?.name">
      <template #icon v-if="item.meta.svgIcon || item.meta.icon">
        <MenuItemIcon :svg-icon="item.meta.svgIcon" :icon="item.meta.icon" />
      </template>
      <span>{{ $t(`language.${item.meta.title}`) }}</span>
    </a-menu-item>
  </template>
</template>

<script setup lang="ts">
import MenuItem from "@/layout/components/Menu/menu-item.vue";
import MenuItemIcon from "@/layout/components/Menu/menu-item-icon.vue";
defineOptions({ name: "MenuItem", inheritAttrs: false });

interface Props {
  routeTree: Menu.MenuOptions[];
}
// props的数据类型
// type类型参考：https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-props
const props = withDefaults(defineProps<Props>(), {
  routeTree: () => []
});
</script>

<style lang="scss" scoped></style>
