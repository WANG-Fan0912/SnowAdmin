<template>
  <div class="tabs">
    <a-tabs :editable="true" :hide-content="true" size="medium" type="line" @delete="handleDelete">
      <a-tab-pane v-for="item of tagsList" :key="item.name" :title="item.meta.title" :closable="!item.meta.isAffix" />
    </a-tabs>
    <div class="tabs_setting">
      <a-dropdown trigger="hover">
        <div class="setting"><icon-loop :size="18" /></div>
        <template #content>
          <a-doption>
            <template #icon><icon-refresh /></template>
            <template #default>刷新</template>
          </a-doption>
          <a-doption>
            <template #icon><icon-left /></template>
            <template #default>关闭左侧</template>
          </a-doption>
          <a-doption>
            <template #icon><icon-right /></template>
            <template #default>关闭右侧</template>
          </a-doption>
          <a-doption>
            <template #icon><icon-close /></template>
            <template #default>关闭其它</template>
          </a-doption>
          <a-doption>
            <template #icon><icon-close-circle /></template>
            <template #default>全部关闭</template>
          </a-doption>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRoutesListStore } from "@/store/route-list";
const routerStore = useRoutesListStore();
const { tagsList } = storeToRefs(routerStore);

watch(
  tagsList.value,
  newV => {
    console.log("tagsList", newV);
  },
  { flush: "post" }
);

// let count = 5;
// const data = ref([
//   {
//     key: "1",
//     title: "Tab 1",
//     content: "Content of Tab Panel 1"
//   },
//   {
//     key: "2",
//     title: "Tab 2",
//     content: "Content of Tab Panel 2"
//   },
//   {
//     key: "3",
//     title: "Tab 3",
//     content: "Content of Tab Panel 3"
//   },
//   {
//     key: "4",
//     title: "Tab 4",
//     content: "Content of Tab Panel 4"
//   }
// ]);

// const handleAdd = () => {
//   const number = count++;
//   data.value = data.value.concat({
//     key: `${number}`,
//     title: `New Tab ${number}`,
//     content: `Content of New Tab Panel ${number}`
//   });
// };
const handleDelete = (key: any) => {
  console.log("关闭tags", key);

  // data.value = data.value.filter(item => item.key !== key);
};
</script>

<style lang="scss" scoped>
.tabs {
  height: 40px;
  box-sizing: border-box;
  border-bottom: $border-1 solid $color-border-2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .tabs_setting {
    margin: 0 0 0 $margin;
    .setting {
      margin-right: $margin;
      color: $color-text-2;
    }
  }
}
:deep(.arco-tabs-nav-tab) {
  // 移入展示关闭icon
  .arco-tabs-tab-closable {
    svg {
      width: 0px;
      transition: all 0.2s;
    }
    &:hover {
      svg {
        width: 1em;
      }
    }
  }
  // 消除tab移入的背景色
  &:hover .arco-tabs-tab-title::before {
    background: unset;
  }
}
// 消除tabs底部边线
:deep(.arco-tabs-nav) {
  &::before {
    background: unset;
  }
}
</style>
