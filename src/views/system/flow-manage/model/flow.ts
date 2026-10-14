/**
 * 流程管理 - 数据模型与工具方法
 * ------------------------------------------------------------------
 * 该文件只做「数据 + 纯函数」，不依赖任何组件，方便后续替换为真实接口数据
 */
import { MarkerType, type Edge, type Node } from "@vue-flow/core";
import { IconBranch, IconFile, IconNotification, IconPlayArrow, IconPoweroff, IconUser } from "@arco-design/web-vue/es/icon";

/** 自定义节点在 VueFlow 中注册的 type */
export const FLOW_NODE_TYPE = "flow-node";

/** 画布尺寸常量：用于自动布局计算 */
export const NODE_WIDTH = 220;
export const NODE_HEIGHT = 76;
export const LAYER_GAP = 130; // 层与层的垂直间距
export const SIBLING_GAP = 40; // 同层节点之间的水平间距

/** 流程节点类型 */
export type FlowNodeType = "start" | "approval" | "task" | "condition" | "cc" | "end";

/**
 * 节点业务数据
 * 注意：这里用 type 而不是 interface，保证可以隐式转换为 Record<string, any>，从而兼容 VueFlow 的 Node 泛型
 */
export type FlowNodeData = {
  nodeType: FlowNodeType;
  label: string;
  desc: string;
  assignee: string;
  approveMode: string;
  condition: string;
};

/** 流程节点：data 为必填，方便在业务代码中直接读写 */
export type FlowNode = Node<FlowNodeData> & { data: FlowNodeData };
export type FlowEdge = Edge;

/** 节点类型配置 */
export type NodeTypeConfig = {
  type: FlowNodeType;
  name: string;
  icon: any;
  color: string;
  /** 是否只允许在流程中存在一个 */
  single: boolean;
  /** 新增时的默认标题 */
  defaultLabel: string;
  /** 默认说明 */
  defaultDesc: string;
};

/** 所有节点类型（顺序即为左侧节点库展示顺序） */
export const nodeTypeList: NodeTypeConfig[] = [
  {
    type: "start",
    name: "开始",
    icon: IconPlayArrow,
    color: "#0e42d2",
    single: true,
    defaultLabel: "发起申请",
    defaultDesc: "流程的起点"
  },
  {
    type: "approval",
    name: "审批",
    icon: IconUser,
    color: "#ff7d00",
    single: false,
    defaultLabel: "审批节点",
    defaultDesc: "由指定人员审批"
  },
  {
    type: "task",
    name: "办理",
    icon: IconFile,
    color: "#00b42a",
    single: false,
    defaultLabel: "办理节点",
    defaultDesc: "由指定人员处理业务"
  },
  {
    type: "condition",
    name: "条件",
    icon: IconBranch,
    color: "#722ed1",
    single: false,
    defaultLabel: "条件判断",
    defaultDesc: "按条件分流"
  },
  {
    type: "cc",
    name: "抄送",
    icon: IconNotification,
    color: "#0fc6c2",
    single: false,
    defaultLabel: "抄送节点",
    defaultDesc: "通知相关人员"
  },
  {
    type: "end",
    name: "结束",
    icon: IconPoweroff,
    color: "#f53f3f",
    single: true,
    defaultLabel: "流程结束",
    defaultDesc: "流程的终点"
  }
];

/** 节点类型字典，便于通过 type 快速取配置 */
export const nodeTypeMap: Record<FlowNodeType, NodeTypeConfig> = nodeTypeList.reduce(
  (acc, item) => {
    acc[item.type] = item;
    return acc;
  },
  {} as Record<FlowNodeType, NodeTypeConfig>
);

/** 审批方式 */
export const approveModeOptions = [
  { value: "all", label: "会签（需全部同意）" },
  { value: "any", label: "或签（一人同意即可）" },
  { value: "sequential", label: "依次审批" }
];

/** 创建一个节点 */
export function createFlowNode(id: string, type: FlowNodeType, position: { x: number; y: number }): FlowNode {
  const config = nodeTypeMap[type];
  return {
    id,
    type: FLOW_NODE_TYPE,
    position,
    data: {
      nodeType: type,
      label: config.defaultLabel,
      desc: config.defaultDesc,
      assignee: "",
      approveMode: "all",
      condition: type === "condition" ? "请假天数 > 3" : ""
    }
  };
}

/** 创建一条连线 */
export function createFlowEdge(source: string, target: string, label = "", sourceHandle = ""): FlowEdge {
  return {
    id: `edge_${source}_${sourceHandle || "out"}_${target}`,
    source,
    target,
    sourceHandle: sourceHandle || undefined,
    label,
    type: "smoothstep",
    animated: true,
    style: { strokeWidth: 2 },
    markerEnd: MarkerType.ArrowClosed
  };
}

/** 示例流程：请假审批流程 */
export function createDefaultFlow(): { nodes: FlowNode[]; edges: FlowEdge[] } {
  const nodes: FlowNode[] = [
    node("start_1", "start", 320, 0, "发起请假申请", "员工本人填写请假单", ""),
    node("approval_1", "approval", 320, 130, "直属主管审批", "1 个工作日内完成审批", "直属主管"),
    node("condition_1", "condition", 320, 260, "是否超过 3 天", "按请假天数分流", "", "请假天数 > 3"),
    node("approval_2", "approval", 30, 390, "部门总监审批", "超过 3 天需总监审批", "部门总监"),
    node("task_1", "task", 610, 390, "HR 备案", "人事登记请假记录", "HRBP"),
    node("end_1", "end", 320, 520, "流程结束", "归档并同步考勤", "")
  ];

  const edges: FlowEdge[] = [
    createFlowEdge("start_1", "approval_1"),
    createFlowEdge("approval_1", "condition_1"),
    createFlowEdge("condition_1", "approval_2", "是", "yes"),
    createFlowEdge("condition_1", "task_1", "否", "no"),
    createFlowEdge("approval_2", "end_1"),
    createFlowEdge("task_1", "end_1")
  ];

  return { nodes, edges };
}

/** 内部快捷方法：组装一个示例节点 */
function node(
  id: string,
  type: FlowNodeType,
  x: number,
  y: number,
  label: string,
  desc: string,
  assignee: string,
  condition = ""
): FlowNode {
  const item = createFlowNode(id, type, { x, y });
  item.data.label = label;
  item.data.desc = desc;
  item.data.assignee = assignee;
  item.data.condition = condition;
  return item;
}

/**
 * 自动布局：从「开始节点」出发做一次广度优先遍历，按层级自上而下排布
 * @param nodes 当前所有节点
 * @param edges 当前所有连线
 * @returns 重新计算过 position 的节点
 */
export function autoLayout(nodes: FlowNode[], edges: FlowEdge[]): FlowNode[] {
  if (!nodes.length) return nodes;

  const nodeMap = new Map(nodes.map(item => [item.id, item]));
  // 层级：key 为节点 id，value 为所在层（从 0 开始）
  const depthMap = new Map<string, number>();
  const start = nodes.find(item => item.data.nodeType === "start") || nodes[0];
  depthMap.set(start.id, 0);

  const queue = [start.id];
  while (queue.length) {
    const current = queue.shift() as string;
    const currentDepth = depthMap.get(current) as number;
    edges
      .filter(edge => edge.source === current && nodeMap.has(edge.target))
      .forEach(edge => {
        if (!depthMap.has(edge.target)) {
          depthMap.set(edge.target, currentDepth + 1);
          queue.push(edge.target);
        }
      });
  }

  // 没有连线的孤立节点统一放到最后一层
  const maxDepth = Math.max(...Array.from(depthMap.values()));
  const layers = new Map<number, FlowNode[]>();
  nodes.forEach(item => {
    const depth = depthMap.has(item.id) ? (depthMap.get(item.id) as number) : maxDepth + 1;
    const list = layers.get(depth) || [];
    list.push({ id: item.id, type: item.type, position: { x: 0, y: 0 }, data: item.data } as FlowNode);
    layers.set(depth, list);
  });

  const sortedDepths = Array.from(layers.keys()).sort((a, b) => a - b);
  sortedDepths.forEach(depth => {
    const list = layers.get(depth) as FlowNode[];
    const totalWidth = list.length * NODE_WIDTH + (list.length - 1) * SIBLING_GAP;
    const startX = 320 + NODE_WIDTH / 2 - totalWidth / 2;
    list.forEach((item, index) => {
      item.position = {
        x: Math.round(startX + index * (NODE_WIDTH + SIBLING_GAP)),
        y: Math.round(depth * (NODE_HEIGHT + LAYER_GAP))
      };
    });
  });

  return sortedDepths.flatMap(depth => layers.get(depth) as FlowNode[]);
}

/** 校验结果 */
export type ValidateResult = {
  valid: boolean;
  messages: string[];
};

/** 校验流程是否完整 */
export function validateFlow(nodes: FlowNode[], edges: FlowEdge[]): ValidateResult {
  const messages: string[] = [];
  if (!nodes.length) {
    return { valid: false, messages: ["流程为空，请先添加节点"] };
  }

  const starts = nodes.filter(item => item.data.nodeType === "start");
  const ends = nodes.filter(item => item.data.nodeType === "end");
  if (starts.length === 0) messages.push("缺少「开始」节点");
  if (starts.length > 1) messages.push(`存在 ${starts.length} 个「开始」节点，只能保留 1 个`);
  if (ends.length === 0) messages.push("缺少「结束」节点");

  nodes.forEach(item => {
    const outgoing = edges.filter(edge => edge.source === item.id);
    const incoming = edges.filter(edge => edge.target === item.id);

    if (item.data.nodeType !== "start" && incoming.length === 0) {
      messages.push(`节点「${item.data.label}」没有上游节点`);
    }
    if (item.data.nodeType !== "end" && outgoing.length === 0) {
      messages.push(`节点「${item.data.label}」没有下游节点`);
    }
    if (item.data.nodeType === "condition" && outgoing.length < 2) {
      messages.push(`条件节点「${item.data.label}」需要同时具备「是 / 否」两条分支`);
    }
  });

  return { valid: messages.length === 0, messages };
}
