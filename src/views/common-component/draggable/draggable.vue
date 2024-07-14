<template>
  <div class="dc-page">
    <a-space direction="vertical">
      <div class="draggable-container">
        <div class="title">Favorites</div>
        <draggable
          :list="list"
          class="draggable-box"
          chosen-class="chosenClass"
          animation="300"
          item-key="value"
          @start="onStart"
          @end="onEnd"
        >
          <template #item="{ element }">
            <div class="draggable-list" :class="!animated && 'animated-fade-up-' + element.value">
              <div class="draggable-inner">
                <SvgIcon :name="element.svg" :size="30" class="svg-box" />
                <div>{{ element.label }}</div>
              </div>
            </div>
          </template>
        </draggable>
      </div>
      <div>
        采用开源拖拽库：<a-link href="https://github.com/SortableJS/vue.draggable.next" target="_blank">vue.draggable</a-link>
      </div>
    </a-space>
    <a-scrollbar style="height: 396px; overflow: auto" outer-class="scrollbar">
      <CodeView :code-json="codeJson" style="width: 500px" />
    </a-scrollbar>
  </div>
</template>

<script setup lang="ts">
import draggable from "vuedraggable";
const list = ref([
  { value: 0, label: "bilibili", svg: "bilibili" },
  { value: 1, label: "微信", svg: "wechat" },
  { value: 2, label: "QQ音乐", svg: "QQ音乐" },
  { value: 3, label: "百度", svg: "百度" },
  { value: 4, label: "优酷", svg: "优酷" },
  { value: 5, label: "网易云音乐", svg: "网易云音乐" },
  { value: 6, label: "抖音", svg: "抖音" },
  { value: 7, label: "西瓜视频", svg: "西瓜视频" },
  { value: 8, label: "微博", svg: "微博" },
  { value: 9, label: "豆瓣", svg: "豆瓣" },
  { value: 10, label: "github", svg: "github" },
  { value: 11, label: "gitee", svg: "gitee" }
]);
const codeJson = computed(() => JSON.stringify({ list: list.value }, null, "\t"));

const animated = ref(false);

// 拖拽开始
const onStart = () => {
  animated.value = true;
};

// 拖拽结束
const onEnd = () => {
  console.log("拖拽结束");
};
</script>

<style lang="scss" scoped>
.dc-page {
  display: flex;
  column-gap: $padding;
}
.draggable-container {
  padding: $padding;
  box-shadow: inset 0 0 0 1px $color-border-2;
  border-radius: $radius-box-5;
  background: $color-bg-1;
  .title {
    font-weight: bold;
    margin-bottom: $padding;
  }
  .draggable-box {
    width: 448px;
    display: flex;
    flex-wrap: wrap;
    row-gap: $padding;
    column-gap: $padding;

    .draggable-list {
      width: 100px;
      height: 100px;
      box-sizing: border-box;
      border: 1px solid $color-border-2;
      border-radius: $radius-box-5;
      background: $color-fill-1;
      display: flex;
      justify-content: center;
      align-items: center;
      .draggable-inner {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        .svg-box {
          margin-bottom: $margin;
        }
      }
    }
  }
  .chosenClass {
    color: $color-primary;
  }
}
.scrollbar {
  height: 100%;
}
</style>
