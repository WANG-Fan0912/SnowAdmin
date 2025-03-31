<template>
  <div class="snow-page">
    <div class="snow-inner">
      <a-space wrap>
        <a-input v-model="form.name" placeholder="请输入角色名称" allow-clear />
        <a-input v-model="form.code" placeholder="请输入角色标识" allow-clear />
        <a-select placeholder="角色状态" v-model="form.status" style="width: 120px" allow-clear>
          <a-option v-for="item in openState" :key="item.value" :value="item.value">{{ item.name }}</a-option>
        </a-select>
        <a-range-picker show-time format="YYYY-MM-DD HH:mm" allow-clear />
        <a-button type="primary" @click="search">
          <template #icon><icon-search /></template>
          <span>查询</span>
        </a-button>
        <a-button @click="reset">
          <template #icon><icon-refresh /></template>
          <span>重置</span>
        </a-button>
      </a-space>

      <a-row>
        <a-space wrap>
          <a-button type="primary" @click="onAdd">
            <template #icon><icon-plus /></template>
            <span>新增</span>
          </a-button>
          <a-button type="primary" status="danger" @click="onDelete">
            <template #icon><icon-delete /></template>
            <span>删除</span>
          </a-button>
        </a-space>
      </a-row>

      <a-table
        row-key="id"
        :data="roleList"
        :bordered="{ cell: true }"
        :loading="loading"
        :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
        :pagination="pagination"
        :row-selection="{ type: 'checkbox', showCheckedAll: true }"
        :selected-keys="selectedKeys"
        @select="select"
        @select-all="selectAll"
      >
        <template #columns>
          <a-table-column title="序号" :width="64">
            <template #cell="cell">{{ cell.rowIndex + 1 }}</template>
          </a-table-column>
          <a-table-column title="角色名称" data-index="name"></a-table-column>
          <a-table-column title="角色标识" data-index="key"></a-table-column>
          <a-table-column title="排序" data-index="sort" :width="100"></a-table-column>
          <a-table-column title="状态" :width="100" align="center">
            <template #cell="{ record }">
              <a-tag bordered size="small" color="arcoblue" v-if="record.status === 1">启用</a-tag>
              <a-tag bordered size="small" color="red" v-else>禁用</a-tag>
            </template>
          </a-table-column>
          <a-table-column title="描述" data-index="description" :ellipsis="true" :tooltip="true"></a-table-column>
          <a-table-column title="创建时间" data-index="createTime" :width="180"></a-table-column>
          <a-table-column title="操作" :width="280" align="center" :fixed="'right'">
            <template #cell="{ record }">
              <a-space>
                <a-button type="primary" size="mini">
                  <template #icon><icon-edit /></template>
                  <span>修改</span>
                </a-button>
                <a-popconfirm type="warning" content="确定删除该角色吗?">
                  <a-button type="primary" status="danger" size="mini">
                    <template #icon><icon-delete /></template>
                    <span>删除</span>
                  </a-button>
                </a-popconfirm>
                <a-dropdown trigger="hover">
                  <a-button type="primary" status="success" size="mini">
                    <template #icon><icon-double-right /></template>
                    <span>分配</span>
                  </a-button>
                  <template #content>
                    <a-doption>
                      <template #default>
                        <a-button type="primary" status="success" size="mini" @click="onPrivileges(record)">
                          <template #icon><icon-safe /></template>
                          <span>分配权限</span>
                        </a-button>
                      </template>
                    </a-doption>
                    <a-doption>
                      <template #default>
                        <a-button type="primary" size="mini" @click="onUsers(record)">
                          <template #icon><icon-user /></template>
                          <span>分配账户</span>
                        </a-button>
                      </template>
                    </a-doption>
                  </template>
                </a-dropdown>
              </a-space>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getRoleAPI } from "@/api/modules/system/index";
const openState = ref(dictFilter("status"));
const form = ref({
  name: "",
  code: "",
  status: null
});
const search = () => {
  console.log("搜索");
};
const reset = () => {
  console.log("重置");
};
const onAdd = () => {
  console.log("新增");
};
const onDelete = () => {
  console.log("删除");
};
const loading = ref(false);
const pagination = ref({
  pageSize: 10,
  showPageSize: true
});

const onPrivileges = (e: any) => {
  console.log("分配权限", e);
};
const onUsers = (e: any) => {
  console.log("分配账户", e);
};
const roleList = ref([]);
const getRole = async () => {
  let res = await getRoleAPI();
  roleList.value = res.data;
};
const selectedKeys = ref([]);
const select = (list: []) => {
  selectedKeys.value = list;
};
const selectAll = (state: boolean) => {
  selectedKeys.value = state ? (roleList.value.map((el: any) => el.id) as []) : [];
};

getRole();
</script>

<style lang="scss" scoped></style>
