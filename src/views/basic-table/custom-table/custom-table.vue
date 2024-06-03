<template>
  <div class="dc-page">
    <a-form ref="formRef" :model="formData.form" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }">
      <a-row :gutter="16">
        <a-col :span="6">
          <a-form-item field="serial" label="集合编号">
            <a-input v-model="formData.form.serial" placeholder="请输入集合编号" allow-clear />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item field="name" label="集合名称">
            <a-input v-model="formData.form.name" placeholder="请输入集合名称" allow-clear />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item field="content" label="内容载体">
            <a-input v-model="formData.form.content" placeholder="请输入内容载体" allow-clear />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item>
            <a-space>
              <a-button type="primary">
                <template #icon>
                  <icon-search />
                </template>
                <template #default>查询</template>
              </a-button>
              <a-button @click="$refs.formRef.resetFields()">
                <template #icon>
                  <icon-refresh />
                </template>
                <template #default>重置</template>
              </a-button>
              <a-button type="text" @click="formData.search = !formData.search">
                <template #icon>
                  <icon-up v-if="formData.search" />
                  <icon-down v-else />
                </template>
                <template #default>{{ formData.search ? "收起" : "展开" }}</template>
              </a-button>
            </a-space>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16" v-if="formData.search">
        <a-col :span="6">
          <a-form-item field="contentSize" label="内容量">
            <a-input v-model="formData.form.contentSize" placeholder="请输入内容量" allow-clear />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item field="status" label="集合状态">
            <a-select v-model="formData.form.status" placeholder="请选择集合状态" allow-clear>
              <a-option value="1">已上线</a-option>
              <a-option value="2">已下线</a-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item field="createTime" label="创建时间">
            <a-range-picker v-model="formData.form.createTime" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-divider :margin="0" />
    <a-row :gutter="16" style="margin: 16px 0">
      <a-col :span="12">
        <a-space size="medium">
          <a-button type="primary">
            <template #icon>
              <icon-plus />
            </template>
            新建
          </a-button>
          <a-upload action="/">
            <template #upload-button>
              <a-button> 批量导入 </a-button>
            </template>
          </a-upload>
        </a-space>
      </a-col>
      <a-col :span="12" style="display: flex; align-items: center; justify-content: end">
        <a-space size="medium">
          <a-button>
            <template #icon>
              <icon-download />
            </template>
            下载
          </a-button>
          <a-tooltip content="刷新">
            <div class="action-icon"><icon-refresh size="18" /></div>
          </a-tooltip>
          <a-dropdown @select="onDensity">
            <a-tooltip content="密度">
              <div class="action-icon"><icon-line-height size="18" /></div>
            </a-tooltip>
            <template #content>
              <a-doption v-for="item in densityType" :value="item.value" :key="item.value" :disabled="item.value === density">{{
                item.label
              }}</a-doption>
            </template>
          </a-dropdown>
          <a-tooltip content="列设置">
            <a-popover trigger="click" position="br" @popup-visible-change="popupVisibleChange">
              <div class="action-icon"><icon-settings size="18" /></div>
              <template #content>
                <div id="tableSetting">
                  <div v-for="(item, index) in columns" :key="item.dataIndex" class="setting">
                    <div class="setting-box-icon">
                      <icon-drag-arrow />
                    </div>
                    <div>
                      <a-checkbox v-model="item.checked" @change="onCheckbox($event, item, index)"> </a-checkbox>
                    </div>
                    <div class="title">
                      {{ item.title }}
                    </div>
                  </div>
                </div>
              </template>
            </a-popover>
          </a-tooltip>
        </a-space>
      </a-col>
    </a-row>
    <a-table
      row-key="key"
      column-resizable
      :size="density"
      :bordered="{
        cell: true
      }"
      :columns="columnsShow"
      :data="data"
      :row-selection="rowSelection"
      v-model:selectedKeys="selectedKeys"
      :pagination="pagination"
      @page-change="pageChange"
      @page-size-change="pageSizeChange"
    >
      <template #status="{ record }">
        <a-space>
          <a-badge status="success" text="已上线" v-if="record.status == 1" />
          <a-badge status="processing" text="已下线" v-else />
        </a-space>
      </template>
      <template #optional>
        <a-space>
          <a-button size="mini" type="text">查看</a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { deepClone } from "@/utils";
import Sortable from "sortablejs";
const formData = reactive({
  form: {
    serial: "",
    name: "",
    content: "",
    contentSize: "",
    status: null,
    createTime: null
  },
  search: false
});
const selectedKeys = ref([]);
const rowSelection = reactive({
  type: "checkbox",
  showCheckedAll: true,
  onlyCurrent: false
});

const pagination = ref({ showPageSize: true, showTotal: true, current: 1, pageSize: 10, total: 10 });
const pageChange = (page: number) => {
  pagination.value.current = page;
};
const pageSizeChange = (pageSize: number) => {
  pagination.value.pageSize = pageSize;
};
const columnsShow = ref([]);
const columns = ref([
  {
    title: "集合编号",
    dataIndex: "serial",
    checked: true
  },
  {
    title: "集合名称",
    dataIndex: "name",
    checked: true
  },
  {
    title: "内容载体",
    dataIndex: "content",
    checked: true
  },
  {
    title: "筛选方式",
    dataIndex: "searchType",
    checked: true
  },
  {
    title: "内容量",
    dataIndex: "contentSize",
    checked: true
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    checked: true
  },
  {
    title: "状态",
    dataIndex: "status",
    slotName: "status",
    align: "center",
    checked: true
  },
  {
    title: "操作",
    slotName: "optional",
    align: "center",
    checked: true
  }
]);
// 将columns深拷贝一份，两份分别用于弹窗展示和列表展示
// 原因：弹窗展示时可以勾选是否渲染，如果弹窗和列表共用一个数据，会导致数据勾选取消后无法复原
const deepColumns = () => {
  columnsShow.value = deepClone(columns.value);
};
deepColumns();
const data = reactive([
  {
    key: "1",
    serial: "57",
    name: "陈思源",
    content: "图文",
    searchType: "阅读量",
    contentSize: 3700,
    status: 1,
    createTime: "2024-05-27 09:00:00"
  },
  {
    key: "2",
    serial: "58",
    name: "李婉娴",
    content: "图文",
    searchType: "阅读量",
    contentSize: 3700,
    status: 0,
    createTime: "2024-05-26 15:30:00"
  },
  {
    key: "3",
    serial: "59",
    name: "王雨菲",
    content: "视频",
    searchType: "播放量",
    contentSize: 2500,
    status: 1,
    createTime: "2024-05-25 12:45:00"
  },
  {
    key: "4",
    serial: "60",
    name: "张晨曦",
    content: "视频",
    searchType: "播放量",
    contentSize: 2500,
    status: 0,
    createTime: "2024-05-24 11:20:00"
  },
  {
    key: "5",
    serial: "61",
    name: "赵梦琪",
    content: "音频",
    searchType: "播放量",
    contentSize: 2500,
    status: 1,
    createTime: "2024-05-23 14:10:00"
  },
  {
    key: "6",
    serial: "62",
    name: "刘昊然",
    content: "图文",
    searchType: "阅读量",
    contentSize: 3700,
    status: 0,
    createTime: "2024-05-22 10:05:00"
  },
  {
    key: "7",
    serial: "63",
    name: "孙梦洁",
    content: "图文",
    searchType: "阅读量",
    contentSize: 3700,
    status: 1,
    createTime: "2024-05-21 08:45:00"
  },
  {
    key: "8",
    serial: "64",
    name: "黄俊杰",
    content: "视频",
    searchType: "播放量",
    contentSize: 2500,
    status: 0,
    createTime: "2024-05-20 16:30:00"
  },
  {
    key: "9",
    serial: "65",
    name: "周雨萱",
    content: "视频",
    searchType: "播放量",
    contentSize: 2300,
    status: 1,
    createTime: "2024-05-19 09:20:00"
  },
  {
    key: "10",
    serial: "66",
    name: "韩雪儿",
    content: "音频",
    searchType: "播放量",
    contentSize: 2300,
    status: 0,
    createTime: "2024-05-18 13:55:00"
  }
]);

const densityType = ref([
  {
    value: "mini",
    label: "迷你"
  },
  {
    value: "small",
    label: "偏小"
  },
  {
    value: "medium",
    label: "中等"
  },
  {
    value: "large",
    label: "偏大"
  }
]);
// 密度
const density = ref("small");
const onDensity = (e: string) => {
  density.value = e;
};

// 排序
const onCheckbox = (checked: any, row: any, index: any) => {
  if (!checked) {
    columnsShow.value = columnsShow.value.filter((item: any) => item.dataIndex != row.dataIndex);
  } else {
    columnsShow.value.splice(index, 0, row);
  }
};
// 气泡窗打开
const popupVisibleChange = (visible: boolean) => {
  if (visible) {
    nextTick(() => {
      // 获取dom
      const el = document.getElementById("tableSetting") as HTMLElement;
      new Sortable(el, {
        onEnd(e: any) {
          // 移动结束后，获得新旧下标，这里不会实际更改原始值
          const { oldIndex, newIndex } = e;
          console.log("移动",columns.value, columnsShow.value);
          // 根据新旧下标更改原始值，更改弹窗columns和列表columns
          exchangeArray(columns.value, oldIndex, newIndex);
          exchangeArray(columnsShow.value, oldIndex, newIndex);
        }
      });
    });
  }
};

// 位置替换
const exchangeArray = (columns: Array<any>, oldIndex: number, newIndex: number) => {
  // 保存要交换的元素
  let temp = columns[newIndex];

  // 将newIndex处的元素移动到oldIndex处
  columns[newIndex] = columns[oldIndex];

  // 将保存的元素移动到newIndex处
  columns[oldIndex] = temp;
};
</script>

<style lang="scss" scoped>
.setting {
  width: 200px;
  display: flex;
  align-items: center;
  .setting-box-icon {
    margin-right: 4px;
    cursor: move;
  }
  .title {
    margin-left: $margin-text;
  }
}
</style>
