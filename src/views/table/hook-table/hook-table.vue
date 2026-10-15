<template>
  <div class="snow-page">
    <div class="snow-inner">
      <!-- 查询表单：状态完全留在组件里，通过闭包注入 listAPI，hook 不感知查询条件 -->
      <a-form ref="formRef" auto-label-width :model="query">
        <a-row :gutter="16">
          <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8" :xxl="8">
            <a-form-item field="name" label="姓名">
              <a-input v-model="query.name" placeholder="请输入姓名" allow-clear />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8" :xxl="8">
            <a-form-item field="status" label="状态">
              <a-select v-model="query.status" placeholder="请选择状态" allow-clear>
                <a-option value="1">启用</a-option>
                <a-option value="0">停用</a-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="8" :xxl="8">
            <a-space class="search-btn">
              <a-button type="primary" @click="search">
                <template #icon>
                  <icon-search />
                </template>
                <template #default>查询</template>
              </a-button>
              <a-button @click="onReset">
                <template #icon>
                  <icon-refresh />
                </template>
                <template #default>重置</template>
              </a-button>
            </a-space>
          </a-col>
        </a-row>
      </a-form>
      <a-divider :margin="0" />
      <a-row :gutter="16" style="margin: 16px 0">
        <a-col :span="12">
          <a-space size="medium">
            <a-button status="danger" :disabled="selectedCount === 0" @click="onBatchDelete">
              批量删除（{{ selectedCount }}）
            </a-button>
            <a-button :disabled="selectedCount === 0" @click="onPrintSelected">查看选中行</a-button>
            <span class="total-text">共 {{ total }} 条</span>
          </a-space>
        </a-col>
        <a-col :span="12" style="display: flex; align-items: center; justify-content: end">
          <a-tooltip content="刷新">
            <div class="action-icon" @click="refresh"><icon-refresh size="18" /></div>
          </a-tooltip>
        </a-col>
      </a-row>
      <a-table
        row-key="key"
        size="small"
        :bordered="{ cell: true }"
        :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
        :loading="loading"
        :columns="columns"
        :data="data"
        :pagination="pagination"
        :row-selection="rowSelection"
        :selected-keys="selectedKeys"
        @select="select"
        @select-all="selectAll"
      >
        <template #gender="{ record }">
          {{ record.genderText }}
        </template>
        <template #status="{ record }">
          <a-tag size="small" :color="record.status === 1 ? 'green' : 'red'">{{ record.statusText }}</a-tag>
        </template>
        <template #state="{ record }">
          <a-tag size="small" :color="STATE_COLOR[record.state]">{{ record.stateText }}</a-tag>
        </template>
        <template #optional="{ record }">
          <a-space>
            <a-button size="mini" type="primary" status="danger" @click="onDeleteOne(record)">删除</a-button>
          </a-space>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { deleteHookTableAPI, getHookTableListAPI } from "@/api/modules/table/index";
import { useTable } from "@/hooks/useTable";
import { useLayoutModel } from "@/hooks/useLayoutModel";

const { tableFixed } = useLayoutModel();

/** 接口返回的原始行类型 */
interface HookTableItem {
  key: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  /** 账号状态：0 停用，1 启用 */
  status: 0 | 1;
  /** 性别：0 未知，1 男，2 女 */
  gender: 0 | 1 | 2;
  /** 审核状态：1 待审核，2 已通过，3 已驳回 */
  state: 1 | 2 | 3;
  createTime: string;
}

/** 渲染行类型：由 formatResult 补出多个展示字段，字段比原始类型多 */
interface HookTableRow extends HookTableItem {
  statusText: string;
  genderText: string;
  stateText: string;
}

/** 值 → 文案映射表，key 为原始字段名 */
const TEXT_MAP = {
  status: { 1: "启用", 0: "停用" },
  gender: { 1: "男", 2: "女", 0: "未知" },
  state: { 1: "待审核", 2: "已通过", 3: "已驳回" }
};

/** 审核状态对应的标签颜色 */
const STATE_COLOR: Record<number, string> = { 1: "orange", 2: "green", 3: "red" };

/** 取文案，取不到返回占位符 */
const pickText = (field: keyof typeof TEXT_MAP, value: number): string => {
  const map = TEXT_MAP[field] as Record<number, string>;
  return map[value] ?? "-";
};

/** 查询表单状态，只属于本组件 */
const query = reactive<{ name: string; status: string | undefined }>({
  name: "",
  status: undefined
});

const {
  data,
  loading,
  total,
  pagination,
  search,
  refresh,
  selectedKeys,
  selectedCount,
  rowSelection,
  select,
  selectAll,
  getSelectedData,
  deleteRow,
  deleteSelected
} = useTable<HookTableItem, HookTableRow>({
  // 查询参数在闭包里注入：每次取数读到的都是 query 的最新值，无需 watch
  listAPI: p => getHookTableListAPI({ ...p, ...query }),
  // 分页参数字段映射
  pageParamsMap: {
    current: "current",
    pageSize: "pageSize"
  },
  // 行唯一键字段名，用于取行 key，默认 `"id"`
  rowKey: "key",
  // 跨页保留选中：翻页不清空，且能取到不在当前页的选中行
  crossPageSelect: true,
  // 数据整形，例如补充展示字段；返回值类型即为表格行类型，支持多个数据format
  // 一次整形多个字段：值 → 文案
  formatResult: list =>
    list.map(item => ({
      ...item,
      statusText: pickText("status", item.status),
      genderText: pickText("gender", item.gender),
      stateText: pickText("state", item.state)
    })),
  onError: () => arcoMessage("error", "列表加载失败，请稍后重试")
});

const columns = [
  { title: "姓名", dataIndex: "name" },
  { title: "性别", dataIndex: "gender", slotName: "gender", align: "center" },
  { title: "手机号", dataIndex: "phone" },
  { title: "Email", dataIndex: "email" },
  { title: "居住地址", dataIndex: "address" },
  { title: "账号状态", dataIndex: "status", slotName: "status", align: "center" },
  { title: "审核状态", dataIndex: "state", slotName: "state", align: "center" },
  { title: "创建时间", dataIndex: "createTime" },
  { title: "操作", slotName: "optional", align: "center", fixed: tableFixed.value, width: "120" }
];

const formRef = ref();

/** 重置表单后回到第 1 页查询 */
const onReset = () => {
  formRef.value?.resetFields();
  void search();
};

/** 单条删除：ids 由行数据推导，走统一的删除流程 */
const onDeleteOne = (record: HookTableRow) => {
  void deleteRow(record, { deleteAPI: deleteHookTableAPI });
};

/** 批量删除：ids 由 selectedKeys 推导 */
const onBatchDelete = () => {
  void deleteSelected({ deleteAPI: deleteHookTableAPI, successText: `已删除 ${selectedCount.value} 条数据` });
};

/** 跨页选中的行数据 */
const onPrintSelected = () => {
  const names = getSelectedData()
    .map(row => row.name)
    .join("、");
  arcoMessage("info", names ? `已选中：${names}` : "暂无选中数据");
};
</script>

<style lang="scss" scoped>
.search-btn {
  margin-bottom: 20px;
}
.total-text {
  color: var(--color-text-3);
}
</style>
