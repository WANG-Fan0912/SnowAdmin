<template>
  <div class="container-page">
    <a-row :gutter="16" class="bottom-gap">
      <a-col :span="6">
        <a-space>
          <a-button type="primary">
            <template #icon>
              <icon-plus />
            </template>
            <template #default>新增</template>
          </a-button>
          <a-button type="primary" status="danger">
            <template #icon>
              <icon-delete />
            </template>
            <template #default>删除</template>
          </a-button>
          <a-button>
            <template #icon>
              <icon-download />
            </template>
            <template #default>导出</template>
          </a-button>
        </a-space>
      </a-col>

      <a-col :span="6" :offset="12">
        <a-form :model="form" :style="{ width: '100%' }" auto-label-width>
          <a-form-item field="name">
            <a-space>
              <a-input v-model="form.name" placeholder="请输入搜索关键词" />
              <a-button type="primary" status="success">
                <template #icon>
                  <icon-search />
                </template>
                <template #default>搜索</template>
              </a-button>
            </a-space>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>

    <a-table
      row-key="key"
      size="small"
      :bordered="{
        cell: true
      }"
      :data="data"
      :row-selection="rowSelection"
      v-model:selectedKeys="selectedKeys"
      :pagination="pagination"
      @page-change="pageChange"
      @page-size-change="pageSizeChange"
    >
      <template #columns>
        <a-table-column title="序号" :width="68">
          <template #cell="cell">{{ cell.rowIndex + 1 }}</template>
        </a-table-column>
        <a-table-column title="渠道来源" data-index="source">
          <template #cell="{ record }">
            <a-space>
              <SvgIcon :name="record.sourceSvg" />
              <span>{{ record.source }}</span>
            </a-space>
          </template>
        </a-table-column>
        <a-table-column title="源类型" data-index="sourceType"></a-table-column>
        <a-table-column title="组流量共享" data-index="flow">
          <template #cell="{ record }">
            <a-badge status="processing" :text="record.flow" v-if="record.percent >= 60" />
            <a-badge status="warning" :text="record.flow" v-else-if="record.percent < 60 && record.percent >= 50" />
            <a-badge status="danger" :text="record.flow" v-else />
          </template>
        </a-table-column>
        <a-table-column title="数据比例" data-index="percent" width="200">
          <template #cell="{ record }">
            <a-progress v-if="record.percent >= 60" :percent="record.percent / 100" />
            <a-progress
              v-else-if="record.percent < 60 && record.percent >= 50"
              status="warning"
              :percent="record.percent / 100"
            />
            <a-progress v-else status="danger" :percent="record.percent / 100" />
          </template>
        </a-table-column>
        <a-table-column title="状态" data-index="status" align="center">
          <template #cell="{ record }">
            <a-space>
              <a-tag size="small" color="green" v-if="record.status == 1">启用</a-tag>
              <a-tag size="small" color="red" v-else>停用</a-tag>
            </a-space>
          </template>
        </a-table-column>
        <a-table-column title="操作" width="200">
          <template #cell="cell">
            <a-space>
              <a-button size="mini" type="primary">详情</a-button>
              <a-button size="mini">修改</a-button>
              <a-popconfirm content="确定删除这条数据吗?" type="warning">
                <a-button size="mini" type="primary" status="danger">删除</a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </a-table-column>
      </template>
      <!-- <template #cell="{ record }">
        <a-space>
          <span>{{ JSON.stringify(record) }}</span>
        </a-space>
      </template>
      <template #source="{ record }">
        <a-space>
          <SvgIcon :name="record.sourceSvg" />
          <span>{{ record.source }}</span>
        </a-space>
      </template>
      <template #flow="{ record }">
        <a-statistic :value="record.flow" show-group-separator :value-style="{ fontSize: '15px' }"> </a-statistic>
      </template>
      <template #percent="{ record }">
        <a-progress v-if="record.percent >= 60" :percent="record.percent / 100" />
        <a-progress v-else-if="record.percent < 60 && record.percent >= 50" status="warning" :percent="record.percent / 100" />
        <a-progress v-else status="danger" :percent="record.percent / 100" />
      </template>
      <template #status="{ record }">
        <a-space>
          <a-tag size="small" color="green" v-if="record.status == 1">启用</a-tag>
          <a-tag size="small" color="red" v-else>停用</a-tag>
        </a-space>
      </template>
      <template #optional>
        <a-space>
          <a-button size="mini" type="primary">详情</a-button>
          <a-button size="mini">修改</a-button>
          <a-popconfirm content="确定删除这条数据吗?" type="warning">
            <a-button size="mini" type="primary" status="danger">删除</a-button>
          </a-popconfirm>
        </a-space>
      </template> -->
    </a-table>
  </div>
</template>

<script setup lang="ts">
const form = ref({
  name: ""
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
const data = reactive([
  {
    key: "1",
    source: "bilibili",
    sourceSvg: "bilibili",
    sourceType: "分享",
    flow: 5015,
    percent: "75",
    status: 1,
    createTime: "2024-05-27 09:00:00"
  },
  {
    key: "2",
    source: "微信",
    sourceSvg: "wechat",
    sourceType: "分享",
    flow: 3217,
    percent: "60",
    status: 0,
    createTime: "2024-05-26 15:30:00"
  },
  {
    key: "3",
    source: "QQ音乐",
    sourceSvg: "QQ音乐",
    sourceType: "搜索",
    flow: 1343,
    percent: "55",
    status: 1,
    createTime: "2024-05-25 12:45:00"
  },
  {
    key: "4",
    source: "百度",
    sourceSvg: "百度",
    sourceType: "搜索",
    flow: 1235,
    percent: "20",
    status: 0,
    createTime: "2024-05-24 11:20:00"
  },
  {
    key: "5",
    source: "优酷",
    sourceSvg: "优酷",
    sourceType: "首页推荐",
    flow: 3456,
    percent: "20",
    status: 1,
    createTime: "2024-05-23 14:10:00"
  },
  {
    key: "6",
    source: "网易云音乐",
    sourceSvg: "网易云音乐",
    sourceType: "每日一推",
    flow: 5873,
    percent: "30",
    status: 0,
    createTime: "2024-05-22 10:05:00"
  },
  {
    key: "7",
    source: "抖音",
    sourceSvg: "抖音",
    sourceType: "自然",
    flow: 5465,
    percent: "86",
    status: 1,
    createTime: "2024-05-21 08:45:00"
  },
  {
    key: "8",
    source: "西瓜视频",
    sourceSvg: "西瓜视频",
    sourceType: "搜索",
    flow: 4642,
    percent: "45",
    status: 0,
    createTime: "2024-05-20 16:30:00"
  },
  {
    key: "9",
    source: "微博",
    sourceSvg: "微博",
    sourceType: "搜索",
    flow: 2375,
    percent: "60",
    status: 1,
    createTime: "2024-05-19 09:20:00"
  },
  {
    key: "10",
    source: "豆瓣",
    sourceSvg: "豆瓣网",
    sourceType: "搜索",
    flow: 2465,
    percent: "40",
    status: 0,
    createTime: "2024-05-18 13:55:00"
  }
]);
</script>

<style lang="scss" scoped>
.container-page {
  box-sizing: border-box;
  padding: $padding;
}

.bottom-gap {
  margin-bottom: $padding;
}

:deep(.arco-form-item) {
  margin-bottom: 0;
}
</style>
