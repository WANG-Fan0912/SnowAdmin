<template>
  <div>
    <SvgIcon v-if="props.svgIcon" :name="props.svgIcon" :size="25" />
    <component v-else-if="props.icon" :is="props.icon"></component>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  svgIcon: {
    type: String,
    default: ""
  },
  icon: {
    type: String,
    default: ""
  }
});
</script>

<style lang="scss" scoped></style>
