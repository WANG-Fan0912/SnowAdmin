/**
 * 列表页通用数据管理 hook（配合 Arco `a-table` 使用）
 *
 * 职责边界（刻意不做的事）：
 * - 不做查询表单状态管理：查询条件由调用方在 `listAPI` 闭包里注入
 * - 不做列定义生成、不做新增/编辑弹窗、不做排序/筛选/树形展开
 * - 不做与数据无关的外观配置（`fixed` / `scroll` / `bordered` / `size` 等留在组件里）
 *
 * @example
 * const { data, loading, pagination, search } = useTable<Item>({
 *   listAPI: p => getListAPI({ ...p, ...queryParams })
 * });
 */
import type { ComputedRef, Ref } from "vue";
import { Message, Modal } from "@arco-design/web-vue";

/* ─────────────────────────── 类型定义 ─────────────────────────── */

/** 行 key 类型，等价于 Arco 内部的 `BaseType`，但该类型未对外导出，此处自行声明 */
export type RowKey = string | number;

/**
 * `a-table` 的 `row-selection` 配置。
 * 项目把 `@arco-design/web-vue` 整体声明为无类型模块（见 `src/vite-env.d.ts`），
 * 无法 import 其 `TableRowSelection` 类型，这里只声明常用字段，其余字段透传即可。
 */
export interface RowSelectionConfig {
  /** 选择类型 */
  type?: "checkbox" | "radio";
  /** 是否显示表头全选框 */
  showCheckedAll?: boolean;
  /** 全选是否只作用于当前页 */
  onlyCurrent?: boolean;
  /** 选择列宽度 */
  width?: number;
  /** 选择列是否固定 */
  fixed?: boolean;
  /** 其他透传给 Arco 的配置 */
  [key: string]: unknown;
}

/**
 * 分页参数字段映射：把 hook 内部的 `current` / `pageSize` 重命名成后端字段名。
 * 只映射传入的字段，未配置的字段保持默认名。
 */
export interface PageParamsMap {
  /** 页码字段名，默认 `"current"` */
  current?: string;
  /** 每页条数字段名，默认 `"pageSize"` */
  pageSize?: string;
}

/**
 * 传给 `listAPI` 的分页参数，默认字段名与 Arco pagination 保持一致，便于直接展开。
 * 配置 `pageParamsMap` 后实际字段名为映射后的名字，见该选项的说明。
 */
export interface ListParams {
  /** 当前页码，从 1 开始 */
  current: number;
  /** 每页条数 */
  pageSize: number;
}

/** 从接口响应中解析出的标准化列表结果 */
export interface ListResult<T> {
  /** 当前页数据 */
  list: T[];
  /** 数据总条数 */
  total: number;
}

/** 删除二次确认所需的信息，交给自定义 confirm 处理器 */
export interface ConfirmPayload {
  /** 确认框标题 */
  title: string;
  /** 确认框正文 */
  content: string;
  /** 本次删除的条数，唯一真相来源 */
  count: number;
}

/** UI 反馈的可覆盖点，每一项传 `false` 表示关闭 */
export interface FeedbackOptions {
  /** 成功提示，默认 `Message.success` */
  success?: false | ((text: string) => void);
  /** 失败提示，默认 `Message.error` */
  error?: false | ((text: string) => void);
  /** 二次确认，默认 `Modal.confirm`；返回 `Promise<boolean>` 表示是否继续删除 */
  confirm?: false | ((payload: ConfirmPayload) => Promise<boolean>);
}

/** 直接绑定给 `a-table` 的 `:pagination`，翻页回调已内聚 */
export interface UseTablePagination {
  /** 当前页码 */
  current: number;
  /** 每页条数 */
  pageSize: number;
  /** 数据总条数 */
  total: number;
  /** 是否显示总数 */
  showTotal: boolean;
  /** 是否显示每页条数选择器 */
  showPageSize: boolean;
  /** 翻页回调，内部会改页码并重新取数 */
  onChange: (current: number) => void;
  /** 改每页条数回调，内部会回第 1 页并重新取数 */
  onPageSizeChange: (pageSize: number) => void;
}

/** 删除操作的完整参数 */
export interface DeleteParams {
  /** 要删除的 id 列表，数组长度即删除数量（唯一真相来源） */
  ids: RowKey[];
  /** 删除接口，接收 id 列表 */
  deleteAPI: (ids: RowKey[]) => Promise<unknown>;
  /** 确认框标题，默认「删除确认」 */
  title?: string;
  /** 确认框正文，字符串或按删除条数生成 */
  content?: string | ((count: number) => string);
  /** 是否弹出二次确认，默认 `true`；传 `false` 则直接删除 */
  confirm?: boolean;
  /** 成功提示文案，默认「删除成功」；传 `false` 不提示 */
  successText?: false | string;
  /** 删除成功且刷新完成后的额外回调 */
  onSuccess?: () => void;
}

/** 派生删除动作的参数：ids 由上下文推导，不需要调用方传 */
export type DeleteActionParams = Omit<DeleteParams, "ids">;

/**
 * useTable 的配置项
 * @typeParam T 接口返回的原始数据行类型
 * @typeParam U 渲染用的行类型，可由 `formatResult` 增改字段，默认等于 T
 */
export interface UseTableOptions<T, U = T> {
  /**
   * 取数接口，接收分页参数。
   * 查询条件由调用方在闭包里注入：`listAPI: p => getListAPI({ ...p, ...queryParams })`
   */
  listAPI: (params: ListParams) => Promise<unknown>;
  /**
   * 把接口响应解析成 `{ list, total }`。
   * 默认实现兼容两种结构：`res.data` 是数组（total 取长度）或 `{ records | list | rows, total }`
   */
  parseResponse?: (res: unknown) => ListResult<T>;
  /** 数据整形，例如补充展示字段；返回值类型即为表格行类型 U */
  formatResult?: (list: T[]) => U[];
  /** 是否在 setup 阶段立即取数，默认 `true` */
  immediate?: boolean;
  /** 取数成功回调，参数为整形后的当前页数据与总数 */
  onSuccess?: (list: U[], total: number) => void;
  /**
   * 取数失败回调。hook 不会吞掉错误也不会向外 rethrow，
   * 只写入 `error` 并回调这里，是否提示由调用方决定
   */
  onError?: (error: unknown) => void;
  /** 行唯一键字段名，用于取行 key，默认 `"id"` */
  rowKey?: string;
  /** 自定义取行 key，优先级高于 `rowKey` */
  getRowKey?: (row: T | U) => RowKey;
  /** 初始每页条数，默认 `10` */
  pageSize?: number;
  /**
   * 分页参数字段映射，用于后端字段名不是 `current` / `pageSize` 的场景，默认不映射。
   * 例：`{ current: "pageNum", pageSize: "size" }` 时 `listAPI` 收到 `{ pageNum: 1, size: 10 }`。
   * 注意：映射后入参不再包含原字段名，请不要访问 `params.current`，直接展开 `{ ...params }` 使用。
   */
  pageParamsMap?: PageParamsMap;
  /** 是否显示总数，默认 `true` */
  showTotal?: boolean;
  /** 是否显示每页条数选择器，默认 `true` */
  showPageSize?: boolean;
  /** 是否跨页保留选中，默认 `false`。为 true 时额外缓存已选中行数据 */
  crossPageSelect?: boolean;
  /** 透传给 `a-table` 的 `row-selection`，默认 `{ type: "checkbox", showCheckedAll: true }` */
  rowSelection?: RowSelectionConfig;
  /**
   * UI 反馈配置：传 `false` 完全静默（单测友好），
   * 也可只覆盖 `success` / `error` / `confirm` 中的某一项
   */
  feedback?: false | FeedbackOptions;
}

/**
 * useTable 的返回值
 * @typeParam U 渲染用的行类型
 */
export interface UseTableReturn<U> {
  /** 当前页数据（已过 `formatResult`），直接绑定 `:data` */
  data: Ref<U[]>;
  /** 是否正在取数，直接绑定 `:loading` */
  loading: Readonly<Ref<boolean>>;
  /** 最近一次取数错误，成功时置为 `null` */
  error: Readonly<Ref<unknown>>;
  /** 数据总条数，与 `pagination.total` 同源 */
  total: Readonly<Ref<number>>;

  /** 分页配置整体对象，模板 `:pagination="pagination"` 一行绑定 */
  pagination: ComputedRef<UseTablePagination>;

  /** 回到第 1 页取数，并清空选中项（对应「查询」按钮） */
  search: () => Promise<void>;
  /** 保持当前页重新取数（对应「刷新」按钮、删除后、新增/编辑后） */
  refresh: () => Promise<void>;

  /** 选中行 key 列表，可写；支持 `:selected-keys` 单向绑定或 `v-model:selectedKeys` */
  selectedKeys: Ref<RowKey[]>;
  /** 选中数量，常用于批量按钮的 `disabled` */
  selectedCount: ComputedRef<number>;
  /** 传给 `a-table` 的 `row-selection` 配置 */
  rowSelection: ComputedRef<RowSelectionConfig>;
  /** `@select` 处理器 */
  select: (rowKeys: RowKey[]) => void;
  /** `@select-all` 处理器 */
  selectAll: (checked: boolean) => void;
  /** 清空选中 */
  clearSelection: () => void;
  /** 取选中行的数据；跨页模式下也能返回不在当前页的行 */
  getSelectedData: () => U[];

  /** 删除主流程：确认 → 调接口 → 提示 → 修正页码 → 刷新；返回是否删除成功 */
  deleteRows: (params: DeleteParams) => Promise<boolean>;
  /** 单条删除：从行数据或行 key 推导出长度为 1 的 ids */
  deleteRow: (row: U | RowKey, params: DeleteActionParams) => Promise<boolean>;
  /** 批量删除：从 `selectedKeys` 推导 ids；为空时直接返回 `false` */
  deleteSelected: (params: DeleteActionParams) => Promise<boolean>;
}

/* ─────────────────────────── 默认实现 ─────────────────────────── */

/** 默认确认框标题 */
const DEFAULT_CONFIRM_TITLE = "删除确认";
/** 默认确认框正文 */
const DEFAULT_CONFIRM_CONTENT = (count: number): string => `确定删除选中的 ${count} 条数据吗？删除后不可恢复。`;
/** 默认成功提示 */
const DEFAULT_SUCCESS_TEXT = "删除成功";
/** 默认失败提示 */
const DEFAULT_ERROR_TEXT = "删除失败，请稍后重试";

/** 默认成功提示：Arco Message */
const defaultSuccess = (text: string): void => {
  Message.success(text);
};

/** 默认失败提示：Arco Message */
const defaultError = (text: string): void => {
  Message.error(text);
};

/** 默认二次确认：Arco Modal.confirm，取消与关闭都视为放弃 */
const defaultConfirm = (payload: ConfirmPayload): Promise<boolean> =>
  new Promise<boolean>(resolve => {
    let settled = false;
    const done = (result: boolean): void => {
      if (settled) return;
      settled = true;
      resolve(result);
    };
    Modal.confirm({
      title: payload.title,
      content: payload.content,
      okText: "确定",
      cancelText: "取消",
      onOk: () => done(true),
      onCancel: () => done(false),
      onClose: () => done(false)
    });
  });

/**
 * 默认的响应解析：兼容「res.data 是数组」与「res.data 是分页对象」两种结构。
 * 分页对象依次尝试 `records` / `list` / `rows` 三个常见字段名。
 */
const defaultParseResponse = <T>(res: unknown): ListResult<T> => {
  const body = (res as { data?: unknown } | null | undefined)?.data ?? res;
  if (Array.isArray(body)) {
    return { list: body as T[], total: body.length };
  }
  const record = (body ?? {}) as Record<string, unknown>;
  const list = (record.records ?? record.list ?? record.rows ?? []) as T[];
  const total = typeof record.total === "number" ? record.total : list.length;
  return { list, total };
};

/* ─────────────────────────── 主体实现 ─────────────────────────── */

/**
 * 列表页通用数据管理
 * @param options 配置项，见 {@link UseTableOptions}
 * @returns 表格数据与操作方法，见 {@link UseTableReturn}
 */
export const useTable = <T, U = T>(options: UseTableOptions<T, U>): UseTableReturn<U> => {
  const {
    listAPI,
    parseResponse = defaultParseResponse<T>,
    formatResult,
    immediate = true,
    onSuccess,
    onError,
    rowKey = "id",
    getRowKey,
    pageSize = 10,
    pageParamsMap = {},
    showTotal = true,
    showPageSize = true,
    crossPageSelect = false,
    rowSelection = { type: "checkbox", showCheckedAll: true },
    feedback
  } = options;

  /* ── 状态 ── */

  // 泛型数组在 ref 里会被 UnwrapRef 拆开，这里统一断言回 U[]，保证模板里拿到的行类型正确
  const data = ref([]) as Ref<U[]>;
  const loading = ref(false);
  const error = ref<unknown>(null);
  const total = ref(0);
  const current = ref(1);
  const pageSizeRef = ref(pageSize);
  const selectedKeys = ref<RowKey[]>([]);
  /** 跨页模式下缓存已选中行，保证 getSelectedData 能取到不在当前页的数据 */
  const selectedRowsCache = new Map<RowKey, U>();
  /** 取数请求序号，用于丢弃先发后到的过期响应 */
  let requestSeq = 0;

  /** 清空选中（跨页模式下同时清空行缓存） */
  const clearSelection = (): void => {
    selectedKeys.value = [];
    selectedRowsCache.clear();
  };

  /* ── 取数 ── */

  /** 取行 key：`getRowKey` 优先，否则按 `rowKey` 字段取值 */
  const resolveRowKey = (row: T | U): RowKey => {
    if (getRowKey) return getRowKey(row);
    return (row as unknown as Record<string, unknown>)[rowKey] as RowKey;
  };

  /**
   * 维护选中态不变量：
   * - 非跨页：selectedKeys 必须是当前页 key 的子集，数据变化后自动剔除失效 key
   * - 跨页：selectedKeys 保持全量，仅把当前页中已选中的行写入缓存
   */
  const syncSelection = (): void => {
    if (crossPageSelect) {
      const keySet = new Set(selectedKeys.value);
      data.value.forEach(row => {
        const key = resolveRowKey(row);
        if (keySet.has(key)) selectedRowsCache.set(key, row);
      });
      return;
    }
    const pageKeys = new Set(data.value.map(row => resolveRowKey(row)));
    const next = selectedKeys.value.filter(key => pageKeys.has(key));
    if (next.length !== selectedKeys.value.length) selectedKeys.value = next;
  };

  /**
   * 组装传给 listAPI 的分页参数，按 pageParamsMap 重命名。
   * 字段名在运行时才确定，无法静态推导，这里统一断言为 ListParams。
   */
  const buildListParams = (): ListParams => {
    const currentKey = pageParamsMap.current ?? "current";
    const sizeKey = pageParamsMap.pageSize ?? "pageSize";
    return { [currentKey]: current.value, [sizeKey]: pageSizeRef.value } as unknown as ListParams;
  };

  /** 发起取数请求，带竞态保护：过期响应不写数据、不改 loading */
  const fetchData = async (): Promise<void> => {
    const seq = ++requestSeq;
    loading.value = true;
    try {
      const res = await listAPI(buildListParams());
      if (seq !== requestSeq) return;
      const { list, total: totalCount } = parseResponse(res);
      const rows = formatResult ? formatResult(list) : (list as unknown as U[]);
      data.value = rows;
      total.value = totalCount;
      error.value = null;
      syncSelection();
      onSuccess?.(rows, totalCount);
    } catch (e) {
      if (seq !== requestSeq) return;
      error.value = e;
      onError?.(e);
    } finally {
      if (seq === requestSeq) loading.value = false;
    }
  };

  /* ── 分页与搜索 ── */

  /** 跳页：非跨页模式下清空选中，避免选中项停留在视野外 */
  const goPage = (page: number): void => {
    current.value = page;
    if (!crossPageSelect) clearSelection();
    void fetchData();
  };

  /** 改每页条数：回到第 1 页 */
  const changePageSize = (size: number): void => {
    pageSizeRef.value = size;
    current.value = 1;
    if (!crossPageSelect) clearSelection();
    void fetchData();
  };

  /** 回到第 1 页取数并清空选中，对应「查询」按钮 */
  const search = async (): Promise<void> => {
    current.value = 1;
    clearSelection();
    await fetchData();
  };

  /** 保持当前页重新取数，对应「刷新」按钮 */
  const refresh = async (): Promise<void> => {
    await fetchData();
  };

  /* ── 多选 ── */

  /** `@select` 处理器 */
  const select = (rowKeys: RowKey[]): void => {
    if (crossPageSelect) {
      const next = new Set(rowKeys);
      selectedKeys.value.forEach(key => {
        if (!next.has(key)) selectedRowsCache.delete(key);
      });
      data.value.forEach(row => {
        const key = resolveRowKey(row);
        if (next.has(key)) selectedRowsCache.set(key, row);
      });
    }
    selectedKeys.value = [...rowKeys];
  };

  /** `@select-all` 处理器 */
  const selectAll = (checked: boolean): void => {
    const pageKeys = data.value.map(row => resolveRowKey(row));
    if (!checked) {
      if (crossPageSelect) {
        const removed = new Set(pageKeys);
        removed.forEach(key => selectedRowsCache.delete(key));
        selectedKeys.value = selectedKeys.value.filter(key => !removed.has(key));
      } else {
        clearSelection();
      }
      return;
    }
    if (crossPageSelect) {
      data.value.forEach(row => selectedRowsCache.set(resolveRowKey(row), row));
      selectedKeys.value = [...new Set([...selectedKeys.value, ...pageKeys])];
    } else {
      selectedKeys.value = pageKeys;
    }
  };

  /** 取选中行的数据：当前页优先，跨页模式下补充缓存行 */
  const getSelectedData = (): U[] => {
    const pageRows = new Map<RowKey, U>();
    data.value.forEach(row => pageRows.set(resolveRowKey(row), row));
    return selectedKeys.value
      .map(key => pageRows.get(key) ?? selectedRowsCache.get(key))
      .filter((row): row is U => row !== undefined);
  };

  /* ── 反馈（可关闭 / 可覆盖）── */

  const feedbackOptions: FeedbackOptions | false = feedback ?? {};

  const notifySuccess = (text: string): void => {
    if (feedbackOptions === false) return;
    const handler = feedbackOptions.success ?? defaultSuccess;
    if (handler !== false) handler(text);
  };

  const notifyError = (text: string): void => {
    if (feedbackOptions === false) return;
    const handler = feedbackOptions.error ?? defaultError;
    if (handler !== false) handler(text);
  };

  /** 二次确认：`feedback` 为 false 或 `confirm: false` 时直接放行 */
  const requestConfirm = (payload: ConfirmPayload): Promise<boolean> => {
    if (feedbackOptions === false) return Promise.resolve(true);
    const handler = feedbackOptions.confirm ?? defaultConfirm;
    if (handler === false) return Promise.resolve(true);
    return handler(payload);
  };

  /* ── 删除 ── */

  /** 删除后维护选中态：移除已删 id，非跨页模式下等价于清空 */
  const removeSelected = (ids: RowKey[]): void => {
    const removed = new Set(ids);
    removed.forEach(key => selectedRowsCache.delete(key));
    selectedKeys.value = selectedKeys.value.filter(key => !removed.has(key));
  };

  /** 删除后修正页码：总页数变少时不能停在空页上 */
  const fixPageAfterDelete = (count: number): void => {
    const remain = Math.max(0, total.value - count);
    const lastPage = Math.max(1, Math.ceil(remain / pageSizeRef.value));
    if (current.value > lastPage) current.value = lastPage;
  };

  /** 删除主流程：确认 → 调接口 → 提示 → 修正页码 → 刷新 */
  const deleteRows = async (params: DeleteParams): Promise<boolean> => {
    const {
      ids,
      deleteAPI,
      title = DEFAULT_CONFIRM_TITLE,
      content = DEFAULT_CONFIRM_CONTENT,
      confirm = true,
      successText = DEFAULT_SUCCESS_TEXT,
      onSuccess: onDeleted
    } = params;
    const count = ids.length;
    if (count === 0) return false;

    if (confirm) {
      const confirmed = await requestConfirm({
        title,
        content: typeof content === "string" ? content : content(count),
        count
      });
      if (!confirmed) return false;
    }

    try {
      await deleteAPI(ids);
      if (successText !== false) notifySuccess(successText);
      removeSelected(ids);
      fixPageAfterDelete(count);
      await fetchData();
      onDeleted?.();
      return true;
    } catch (e) {
      notifyError(e instanceof Error ? e.message : DEFAULT_ERROR_TEXT);
      return false;
    }
  };

  /** 单条删除：从行数据或行 key 推导 ids */
  const deleteRow = (row: U | RowKey, params: DeleteActionParams): Promise<boolean> => {
    const id = typeof row === "string" || typeof row === "number" ? row : resolveRowKey(row as U);
    return deleteRows({ ...params, ids: [id] });
  };

  /** 批量删除：从 selectedKeys 推导 ids */
  const deleteSelected = (params: DeleteActionParams): Promise<boolean> => {
    if (selectedKeys.value.length === 0) return Promise.resolve(false);
    return deleteRows({ ...params, ids: [...selectedKeys.value] });
  };

  /* ── 派生与出口 ── */

  const pagination = computed<UseTablePagination>(() => ({
    current: current.value,
    pageSize: pageSizeRef.value,
    total: total.value,
    showTotal,
    showPageSize,
    onChange: goPage,
    onPageSizeChange: changePageSize
  }));

  const selectedCount = computed<number>(() => selectedKeys.value.length);

  if (immediate) void fetchData();

  return {
    data,
    loading,
    error,
    total,
    pagination,
    search,
    refresh,
    selectedKeys,
    selectedCount,
    rowSelection: computed<RowSelectionConfig>(() => rowSelection),
    select,
    selectAll,
    clearSelection,
    getSelectedData,
    deleteRows,
    deleteRow,
    deleteSelected
  };
};
