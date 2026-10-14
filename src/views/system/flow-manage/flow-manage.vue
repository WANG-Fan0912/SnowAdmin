<template>
  <div class="snow-fill">
    <div class="snow-fill-inner flow-manage">
      <!-- 顶部工具栏 -->
      <div class="flow-toolbar">
        <a-space wrap>
          <a-button type="primary" size="small" @click="onAdd('approval')">
            <template #icon><icon-plus /></template>
            <span>新增节点</span>
          </a-button>
          <a-button size="small" @click="onAutoLayout">
            <template #icon><icon-mind-mapping /></template>
            <span>自动布局</span>
          </a-button>
          <a-button size="small" @click="onValidate">
            <template #icon><icon-check-circle /></template>
            <span>流程校验</span>
          </a-button>
          <a-button size="small" @click="onSave">
            <template #icon><icon-save /></template>
            <span>保存</span>
          </a-button>
          <a-button size="small" @click="onExport">
            <template #icon><icon-download /></template>
            <span>导出 JSON</span>
          </a-button>
          <a-button size="small" status="danger" @click="onReset">
            <template #icon><icon-refresh /></template>
            <span>重置</span>
          </a-button>
        </a-space>
        <a-space>
          <a-tag size="small" color="arcoblue">节点 {{ nodes.length }}</a-tag>
          <a-tag size="small" color="green">连线 {{ edges.length }}</a-tag>
        </a-space>
      </div>

      <div class="flow-body">
        <!-- 左侧节点库 -->
        <div class="flow-aside">
          <NodePalette @add="onAdd" />
        </div>

        <!-- 中间画布 -->
        <div class="flow-canvas" @drop="onDrop" @dragover.prevent @dragenter.prevent>
          <VueFlow
            v-model:nodes="nodes"
            v-model:edges="edges"
            :min-zoom="0.2"
            :max-zoom="2"
            :default-viewport="{ zoom: 0.8 }"
            :fit-view-on-init="true"
            :is-valid-connection="isValidConnection"
            delete-key-code="Backspace"
            @connect="onConnect"
            @node-click="onNodeClick"
            @edge-click="onEdgeClick"
            @pane-click="onPaneClick"
          >
            <!-- 自定义节点：type 为 flow-node 的节点都用 FlowNode 渲染 -->
            <template #node-flow-node="nodeProps">
              <FlowNode v-bind="nodeProps" />
            </template>

            <!-- 画布右下角的缩放控制条 -->
            <Panel position="bottom-right" class="flow-controls">
              <a-button-group size="mini">
                <a-button title="放大" @click="zoomIn()"><icon-zoom-in /></a-button>
                <a-button title="缩小" @click="zoomOut()"><icon-zoom-out /></a-button>
                <a-button title="适应画布" @click="fitView({ padding: 0.2 })"><icon-fullscreen /></a-button>
              </a-button-group>
            </Panel>

            <!-- 画布左上角的提示 -->
            <Panel position="top-left" class="flow-tips">
              <span>拖动节点圆点连线，选中后按 Backspace 删除</span>
            </Panel>
          </VueFlow>
        </div>

        <!-- 右侧属性配置 -->
        <div class="flow-aside">
          <PropertyPanel
            :node="selectedNode"
            :edge="selectedEdge"
            @update-data="onUpdateData"
            @update-edge="onUpdateEdge"
            @remove="onRemove"
          />
        </div>
      </div>
    </div>

    <!-- 校验结果 -->
    <a-modal v-model:visible="validateVisible" title="流程校验结果" :footer="false" width="520px">
      <ul v-if="validateResult.messages.length" class="validate-list">
        <li v-for="(item, index) in validateResult.messages" :key="index">
          <icon-exclamation-circle class="validate-icon" />
          <span>{{ index + 1 }}、{{ item }}</span>
        </li>
      </ul>
      <a-result v-else status="success" title="流程校验通过" subtitle="该流程节点与连线均配置完整" />
    </a-modal>

    <!-- 导出 JSON -->
    <a-modal v-model:visible="jsonVisible" title="流程 JSON" width="640px" :footer="false">
      <pre class="flow-json">{{ flowJson }}</pre>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { Panel, VueFlow, useVueFlow, type Connection } from "@vue-flow/core";
import { Message } from "@arco-design/web-vue";
import "@vue-flow/core/dist/style.css";
import "@vue-flow/core/dist/theme-default.css";
import FlowNode from "./components/flow-node.vue";
import NodePalette from "./components/node-palette.vue";
import PropertyPanel from "./components/property-panel.vue";
import {
  autoLayout,
  createDefaultFlow,
  createFlowNode,
  validateFlow,
  type FlowEdge,
  type FlowNode as FlowNodeItem,
  type FlowNodeData,
  type FlowNodeType,
  type ValidateResult
} from "./model/flow";

defineOptions({ name: "FlowManage" });

const CACHE_KEY = "snow-flow-manage-demo";

/** 从本地缓存恢复，没有则使用内置示例流程 */
function loadFlow() {
  try {
    const cache = localStorage.getItem(CACHE_KEY);
    if (!cache) return null;
    const parsed = JSON.parse(cache);
    if (!Array.isArray(parsed.nodes) || !Array.isArray(parsed.edges)) return null;
    return { nodes: parsed.nodes as FlowNodeItem[], edges: parsed.edges as FlowEdge[] };
  } catch {
    return null;
  }
}

const initialFlow = loadFlow() || createDefaultFlow();
const nodes = ref<FlowNodeItem[]>(initialFlow.nodes);
const edges = ref<FlowEdge[]>(initialFlow.edges);

const {
  addEdges,
  addNodes,
  addSelectedNodes,
  findEdge,
  findNode,
  fitView,
  removeEdges,
  removeNodes,
  screenToFlowCoordinate,
  setEdges,
  setNodes,
  toObject,
  updateNodeData,
  zoomIn,
  zoomOut
} = useVueFlow();

/** 当前选中的是节点还是连线 */
const selectedId = ref("");
const selectedKind = ref<"node" | "edge">("node");
const selectedNode = computed(() => (selectedKind.value === "node" ? findNode(selectedId.value) || null : null));
const selectedEdge = computed(() => (selectedKind.value === "edge" ? findEdge(selectedId.value) || null : null));

/** 节点 id 自增种子，保证唯一 */
let seed = 0;
const createId = (type: FlowNodeType) => `${type}_${Date.now().toString(36)}${++seed}`;

/** 新增节点：position 为空时放在画布可视区域中间 */
const onAdd = async (type: FlowNodeType, position?: { x: number; y: number }) => {
  const id = createId(type);
  const target = position || { x: 320 + Math.round(Math.random() * 160), y: 160 + Math.round(Math.random() * 160) };
  const node = createFlowNode(id, type, target);
  addNodes(node);
  selectedId.value = id;
  selectedKind.value = "node";
  await nextTick();
  const created = findNode(id);
  if (created) addSelectedNodes([created]);
  Message.success(`已添加「${node.data.label}」`);
};

/** 从左侧节点库拖拽到画布 */
const onDrop = (event: DragEvent) => {
  const type = event.dataTransfer?.getData("application/vueflow") as FlowNodeType;
  if (!type) return;
  onAdd(type, screenToFlowCoordinate({ x: event.clientX, y: event.clientY }));
};

/** 禁止自己连自己 */
const isValidConnection = (connection: Connection) => connection.source !== connection.target;

/** 连线 */
const onConnect = (params: Connection) => {
  const sourceHandle = params.sourceHandle || "";
  const exist = edges.value.some(
    item => item.source === params.source && item.target === params.target && (item.sourceHandle || "") === sourceHandle
  );
  if (exist) {
    Message.warning("该连线已存在");
    return;
  }
  addEdges([
    {
      ...params,
      id: `edge_${params.source}_${sourceHandle || "out"}_${params.target}`,
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2 }
    }
  ]);
};

const onNodeClick = ({ node }: { node: { id: string } }) => {
  selectedId.value = node.id;
  selectedKind.value = "node";
};

const onEdgeClick = ({ edge }: { edge: { id: string } }) => {
  selectedId.value = edge.id;
  selectedKind.value = "edge";
};

const onPaneClick = () => {
  selectedId.value = "";
};

/** 修改节点属性 */
const onUpdateData = (id: string, patch: Partial<FlowNodeData>) => {
  updateNodeData(id, patch);
};

/** 修改连线名称 */
const onUpdateEdge = (id: string, label: string) => {
  const edge = findEdge(id);
  if (edge) edge.label = label;
};

/** 删除节点或连线 */
const onRemove = (id: string, kind: "node" | "edge") => {
  if (kind === "node") removeNodes(id);
  else removeEdges(id);
  selectedId.value = "";
  Message.success("删除成功");
};

/** 自动布局 */
const onAutoLayout = async () => {
  setNodes(autoLayout(nodes.value, edges.value));
  await nextTick();
  fitView({ padding: 0.2 });
};

/** 流程校验 */
const validateVisible = ref(false);
const validateResult = ref<ValidateResult>({ valid: true, messages: [] });
const onValidate = () => {
  validateResult.value = validateFlow(nodes.value, edges.value);
  if (validateResult.value.valid) {
    Message.success("流程校验通过");
    return;
  }
  validateVisible.value = true;
};

/** 保存（demo 阶段写入本地缓存） */
const onSave = () => {
  localStorage.setItem(CACHE_KEY, JSON.stringify(toObject()));
  Message.success("保存成功");
};

/** 导出 JSON */
const jsonVisible = ref(false);
const flowJson = ref("");
const onExport = () => {
  flowJson.value = JSON.stringify(toObject(), null, 2);
  jsonVisible.value = true;
};

/** 重置为内置示例流程 */
const onReset = async () => {
  const flow = createDefaultFlow();
  setNodes(flow.nodes);
  setEdges(flow.edges);
  selectedId.value = "";
  localStorage.removeItem(CACHE_KEY);
  await nextTick();
  fitView({ padding: 0.2 });
  Message.success("已重置为示例流程");
};
</script>

<style lang="scss" scoped>
.flow-manage {
  display: flex;
  flex-direction: column;
  gap: $margin;
}
.flow-toolbar {
  display: flex;
  flex: none;
  gap: $margin;
  align-items: center;
  justify-content: space-between;
}
.flow-body {
  display: flex;
  flex: 1;
  gap: $margin;
  min-height: 0;
}
.flow-aside {
  flex: none;
  width: 220px;
  padding: $padding;
  overflow: auto;
  background: $color-fill-1;
  border-radius: $radius-box-2;
}
.flow-canvas {
  position: relative;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  background-color: $color-bg-2;

  // 点阵背景：替代 @vue-flow/background，随主题色变化
  background-image: radial-gradient($color-border-3 1px, transparent 1px);
  background-size: 16px 16px;
  border: 1px solid $color-border-1;
  border-radius: $radius-box-2;
}
.flow-controls {
  display: flex;
  gap: 4px;
}
.flow-tips {
  padding: 4px 8px;
  font-size: 12px;
  color: $color-text-3;
  background: rgb(var(--color-bg-white) / 80%);
  border-radius: $radius-box-1;
}
.validate-list {
  padding: 0;
  margin: 0;
  list-style: none;
  li {
    display: flex;
    gap: 6px;
    align-items: center;
    padding: 6px 0;
    font-size: 13px;
    line-height: 20px;
    color: $color-text-2;
  }
}
.validate-icon {
  flex: none;
  color: $color-danger;
}
.flow-json {
  max-height: 420px;
  padding: $padding;
  margin: 0;
  overflow: auto;
  font-size: 12px;
  line-height: 20px;
  color: $color-text-2;
  background: $color-fill-1;
  border-radius: $radius-box-2;
}

// 窄屏隐藏两侧面板，只保留画布
@media screen and (max-width: $md) {
  .flow-aside {
    display: none;
  }
}
</style>
