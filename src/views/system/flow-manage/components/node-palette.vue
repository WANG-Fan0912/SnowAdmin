<template>
  <div class="node-palette">
    <div class="palette-header">
      <span class="palette-title">节点库</span>
      <span class="palette-tip">拖拽 / 点击添加</span>
    </div>

    <div class="palette-list">
      <div
        v-for="item in nodeTypeList"
        :key="item.type"
        class="palette-item"
        :style="{ '--node-color': item.color }"
        draggable="true"
        @dragstart="onDragStart($event, item.type)"
        @click="emit('add', item.type)"
      >
        <span class="palette-icon"><component :is="item.icon" /></span>
        <div class="palette-text">
          <div class="palette-name">{{ item.name }}</div>
          <div class="palette-desc">{{ item.defaultDesc }}</div>
        </div>
        <icon-plus class="palette-plus" />
      </div>
    </div>

    <div class="palette-help">
      <div class="help-title">操作说明</div>
      <p>1、拖拽左侧节点到画布即可新增节点</p>
      <p>2、拖动节点上下两端的圆点即可连线</p>
      <p>3、点击节点可在右侧编辑节点属性</p>
      <p>4、选中节点或连线后按 Backspace 删除</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nodeTypeList, type FlowNodeType } from "../model/flow";

const emit = defineEmits<{ add: [type: FlowNodeType] }>();

/** 拖拽开始：把节点类型写进 dataTransfer，画布 drop 时再取出来 */
const onDragStart = (event: DragEvent, type: FlowNodeType) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData("application/vueflow", type);
    event.dataTransfer.effectAllowed = "move";
  }
};
</script>

<style lang="scss" scoped>
.node-palette {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
}
.palette-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: $margin-text;
}
.palette-title {
  font-size: 14px;
  font-weight: 600;
  color: $color-text-1;
}
.palette-tip {
  font-size: 12px;
  color: $color-text-4;
}
.palette-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.palette-item {
  display: flex;
  gap: $margin-text;
  align-items: center;
  padding: 8px 10px;
  cursor: grab;
  background: $color-fill-1;
  border: 1px solid $color-border-1;
  border-left: 3px solid var(--node-color);
  border-radius: $radius-box-2;
  transition:
    background 0.2s,
    border-color 0.2s;
  &:hover {
    background: $color-fill-2;
    border-color: var(--node-color);
    .palette-plus {
      color: var(--node-color);
    }
  }
  &:active {
    cursor: grabbing;
  }
}
.palette-icon {
  display: flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: $icon-box;
  height: $icon-box;
  color: #ffffff;
  background: var(--node-color);
  border-radius: $radius-box-1;
}
.palette-text {
  flex: 1;
  overflow: hidden;
}
.palette-name {
  font-size: 13px;
  color: $color-text-1;
}
.palette-desc {
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  color: $color-text-3;
  white-space: nowrap;
}
.palette-plus {
  flex: none;
  color: $color-text-4;
}
.palette-help {
  padding-top: $padding;
  margin-top: $padding;
  font-size: 12px;
  color: $color-text-3;
  border-top: 1px dashed $color-border-2;
  p {
    margin: 4px 0;
    line-height: 20px;
  }
}
.help-title {
  margin-bottom: 4px;
  font-weight: 600;
  color: $color-text-1;
}
</style>
