<template>
  <div class="property-panel">
    <div class="panel-header">
      <span class="panel-title">属性配置</span>
      <a-tag v-if="node" size="small" color="arcoblue">{{ config.name }}</a-tag>
      <a-tag v-else-if="edge" size="small" color="cyan">连线</a-tag>
    </div>

    <div v-if="node" class="panel-body">
      <div class="form-item">
        <div class="form-label">节点名称</div>
        <a-input v-model="label" placeholder="请输入节点名称" allow-clear />
      </div>

      <div class="form-item" v-if="showAssignee">
        <div class="form-label">{{ assigneeLabel }}</div>
        <a-input v-model="assignee" placeholder="请输入负责人" allow-clear />
      </div>

      <div class="form-item" v-if="node.data.nodeType === 'approval'">
        <div class="form-label">审批方式</div>
        <a-select v-model="approveMode" placeholder="请选择审批方式">
          <a-option v-for="item in approveModeOptions" :key="item.value" :value="item.value">{{ item.label }}</a-option>
        </a-select>
      </div>

      <div class="form-item" v-if="node.data.nodeType === 'condition'">
        <div class="form-label">判断条件</div>
        <a-input v-model="condition" placeholder="如：请假天数 > 3" allow-clear />
      </div>

      <div class="form-item">
        <div class="form-label">备注</div>
        <a-textarea v-model="desc" placeholder="请输入备注" :auto-size="{ minRows: 2, maxRows: 4 }" />
      </div>

      <div class="form-item">
        <div class="form-label">节点 ID</div>
        <div class="form-value">{{ node.id }}</div>
      </div>

      <a-button v-if="node.data.nodeType !== 'start'" long status="danger" @click="emit('remove', node.id, 'node')">
        <template #icon><icon-delete /></template>
        <span>删除节点</span>
      </a-button>
    </div>

    <div v-else-if="edge" class="panel-body">
      <div class="form-item">
        <div class="form-label">连线名称</div>
        <a-input v-model="edgeLabel" placeholder="如：同意 / 驳回" allow-clear />
      </div>
      <div class="form-item">
        <div class="form-label">来源节点</div>
        <div class="form-value">{{ edge.source }}</div>
      </div>
      <div class="form-item">
        <div class="form-label">目标节点</div>
        <div class="form-value">{{ edge.target }}</div>
      </div>
      <a-button long status="danger" @click="emit('remove', edge.id, 'edge')">
        <template #icon><icon-delete /></template>
        <span>删除连线</span>
      </a-button>
    </div>

    <a-empty v-else description="请选择一个节点或连线">
      <template #image>
        <icon-settings class="empty-icon" />
      </template>
    </a-empty>
  </div>
</template>

<script setup lang="ts">
import { approveModeOptions, nodeTypeMap, type FlowEdge, type FlowNode, type FlowNodeData } from "../model/flow";

const props = defineProps<{
  node: FlowNode | null;
  edge: FlowEdge | null;
}>();

const emit = defineEmits<{
  /** 修改节点属性 */
  updateData: [id: string, patch: Partial<FlowNodeData>];
  /** 修改连线名称 */
  updateEdge: [id: string, label: string];
  /** 删除节点或连线 */
  remove: [id: string, kind: "node" | "edge"];
}>();

const config = computed(() => nodeTypeMap[props.node?.data.nodeType || "task"]);
const showAssignee = computed(() => ["approval", "task", "cc"].includes(props.node?.data.nodeType || ""));
const assigneeLabel = computed(() => (props.node?.data.nodeType === "cc" ? "抄送人" : "负责人"));

/** 通用读写器：读节点数据，写则抛给父组件统一处理 */
function useNodeField<K extends keyof FlowNodeData>(key: K) {
  return computed({
    get: () => (props.node ? props.node.data[key] : ""),
    set: (value: any) => {
      if (props.node) emit("updateData", props.node.id, { [key]: value } as Partial<FlowNodeData>);
    }
  });
}

const label = useNodeField("label");
const desc = useNodeField("desc");
const assignee = useNodeField("assignee");
const approveMode = useNodeField("approveMode");
const condition = useNodeField("condition");

const edgeLabel = computed({
  get: () => String(props.edge?.label ?? ""),
  set: (value: string) => {
    if (props.edge) emit("updateEdge", props.edge.id, value);
  }
});
</script>

<style lang="scss" scoped>
.property-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
}
.panel-header {
  display: flex;
  gap: $margin-text;
  align-items: center;
  margin-bottom: $margin;
}
.panel-title {
  font-size: 14px;
  font-weight: 600;
  color: $color-text-1;
}
.panel-body {
  display: flex;
  flex-direction: column;
  gap: $margin;
}
.form-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.form-label {
  font-size: 12px;
  color: $color-text-3;
}
.form-value {
  padding: 4px 8px;
  font-size: 13px;
  color: $color-text-2;
  background: $color-fill-1;
  border-radius: $radius-box-1;
}
.empty-icon {
  font-size: 32px;
  color: $color-text-4;
}
</style>
