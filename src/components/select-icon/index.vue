<template>
  <a-modal v-model:visible="visible" width="70vw" :top="'50px'" :align-center="false" :footer="false">
    <template #title> 请选择图标 </template>
    <a-input
      :style="{
        width: '100%',
        marginBottom: '14px'
      }"
      placeholder="请输入关键词搜索"
      allow-clear
      v-model="searchName"
    >
      <template #prefix>
        <icon-search />
      </template>
    </a-input>
    <div class="over-scroll">
      <div class="icon-grid">
        <div v-for="item in iconList" :key="item" class="grid-item" @click="onIcon(item)">
          <component :is="item" :size="30"></component>
          <span>{{ item }}</span>
        </div>
      </div>
      <div v-if="iconList.length === 0" class="empty-row">
        <a-empty>
          <template #image>
            <icon-exclamation-circle-fill />
          </template>
          <span>未查询到您要找的图标</span>
        </a-empty>
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import * as ArcoIcons from "@arco-design/web-vue/es/icon";
const emit = defineEmits(["select"]);

const searchName = ref<string>("");
const iconList = computed(() => {
  if (!ArcoIcons) return [];
  let icons: string[] = [];
  for (let key in ArcoIcons) {
    if (key != "default") icons.push(key);
  }
  // 若按照关键字搜索，则返回搜索结果
  if (searchName.value) {
    return icons.filter(item => item.toLowerCase().includes(searchName.value.toLowerCase()));
  }
  // 若关键字为空则返回全部列表
  return icons;
});

const onIcon = (iconName: string) => {
  visible.value = false;
  emit("select", iconName);
};

const visible = ref(false);
const open = () => {
  searchName.value = "";
  visible.value = true;
};

defineExpose({
  open
});
</script>

<style lang="scss" scoped>
.over-scroll {
  max-height: 70vh;
  overflow: auto;
  .icon-grid {
    overflow: hidden;
    display: grid;
    grid-template-columns: repeat(auto-fill, 150px); /* 自适应填充列，每列宽为 150px */
    justify-content: space-evenly; /* 水平均匀分配列之间的空隙 */
    .grid-item {
      height: 100px;
      display: flex;
      flex-direction: column;
      row-gap: $margin;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s ease-in-out; /* 添加过渡效果 */
      &:hover {
        transform: scale(1.3); /* 鼠标移入时放大到 1.3 倍 */
      }
    }
  }
}

.empty-row {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
