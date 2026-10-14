<template>
  <div class="flow-node" :class="[`is-${data.nodeType}`, { 'is-selected': selected }]" :style="nodeStyle">
    <!-- 入口连接点：开始节点没有入口 -->
    <Handle v-if="showTarget" type="target" :position="Position.Top" class="flow-node__handle" />

    <div class="flow-node__head">
      <span class="flow-node__icon"><component :is="config.icon" /></span>
      <span class="flow-node__title">{{ data.label }}</span>
      <span class="flow-node__tag">{{ config.name }}</span>
    </div>
    <div class="flow-node__desc">{{ summary }}</div>

    <!-- 删除按钮，悬浮时显示 -->
    <div class="flow-node__remove" title="删除节点" @mousedown.stop @click.stop="onRemove">
      <icon-close />
    </div>

    <!-- 出口连接点：条件节点有「是 / 否」两个出口，结束节点没有出口 -->
    <template v-if="isCondition">
      <Handle id="yes" type="source" :position="Position.Bottom" class="flow-node__handle handle-yes" />
      <Handle id="no" type="source" :position="Position.Bottom" class="flow-node__handle handle-no" />
      <div class="flow-node__branch">
        <span class="branch-yes">是</span>
        <span class="branch-no">否</span>
      </div>
    </template>
    <Handle v-else-if="showSource" type="source" :position="Position.Bottom" class="flow-node__handle" />
  </div>
</template>

<script setup lang="ts">
import { Handle, Position, useVueFlow } from "@vue-flow/core";
import { IconClose } from "@arco-design/web-vue/es/icon";
import { approveModeOptions, nodeTypeMap, type FlowNodeData } from "../model/flow";

defineOptions({ inheritAttrs: false });

const props = defineProps<{
  id: string;
  data: FlowNodeData;
  selected?: boolean;
}>();

const { removeNodes } = useVueFlow();

const config = computed(() => nodeTypeMap[props.data.nodeType]);
const isCondition = computed(() => props.data.nodeType === "condition");
const showTarget = computed(() => props.data.nodeType !== "start");
const showSource = computed(() => props.data.nodeType !== "end");

// 节点主体展示的一句话摘要
const summary = computed(() => {
  const { nodeType, desc, assignee, approveMode, condition } = props.data;
  if (nodeType === "condition") return condition || "未配置判断条件";
  if (nodeType === "start" || nodeType === "end") return desc;
  if (nodeType === "approval") {
    const mode = approveModeOptions.find(item => item.value === approveMode)?.label || "未设置";
    return `${assignee || "未指定负责人"} · ${mode}`;
  }
  return assignee || desc || "未指定负责人";
});

const nodeStyle = computed(() => ({ "--node-color": config.value.color }));

const onRemove = () => {
  removeNodes(props.id);
};
</script>

<style lang="scss" scoped>
.flow-node {
  position: relative;
  box-sizing: border-box;
  width: 220px;
  padding: 10px 12px;
  overflow: visible;
  background: $color-bg-1;
  border: 1px solid $color-border-2;
  border-left: 3px solid var(--node-color);
  border-radius: $radius-box-2;
  box-shadow: 0 1px 4px rgb(0 0 0 / 8%);
  transition:
    box-shadow 0.2s,
    border-color 0.2s;
  &:hover {
    border-color: var(--node-color);
    box-shadow: 0 4px 12px rgb(0 0 0 / 12%);
    .flow-node__remove {
      display: flex;
    }
  }
  &.is-selected {
    border-color: var(--node-color);
    box-shadow: 0 0 0 2px rgb(var(--primary-1));
  }
  &.is-start,
  &.is-end {
    width: 180px;
    text-align: center;
    border-radius: 24px;
  }
  &.is-condition {
    border-left-color: var(--node-color);
  }
}
.flow-node__head {
  display: flex;
  gap: $margin-text;
  align-items: center;
}
.flow-node__icon {
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
.flow-node__title {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: 500;
  color: $color-text-1;
  white-space: nowrap;
}
.flow-node__tag {
  flex: none;
  padding: 0 6px;
  font-size: 12px;
  line-height: 18px;
  color: var(--node-color);
  background: $color-fill-2;
  border-radius: $radius-box-1;
}
.flow-node__desc {
  margin-top: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  line-height: 18px;
  color: $color-text-3;
  white-space: nowrap;
}
.flow-node__remove {
  position: absolute;
  top: -8px;
  right: -8px;
  display: none;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  font-size: 12px;
  color: #ffffff;
  cursor: pointer;
  background: $color-danger;
  border-radius: 50%;
}
.flow-node__branch {
  position: absolute;
  bottom: -20px;
  left: 0;
  display: flex;
  width: 100%;
  font-size: 12px;
  color: $color-text-3;
  .branch-yes {
    position: absolute;
    left: 30%;
    transform: translateX(-50%);
  }
  .branch-no {
    position: absolute;
    left: 70%;
    transform: translateX(-50%);
  }
}
.flow-node__handle {
  width: 8px;
  height: 8px;
  background: $color-bg-1;
  border: 2px solid var(--node-color);
}
:deep(.vue-flow__handle-bottom) {
  bottom: -5px;
}
.flow-node__handle.handle-yes {
  left: 30%;
}
.flow-node__handle.handle-no {
  left: 70%;
}
</style>
