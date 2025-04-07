<template>
  <div class="snow-page">
    <div class="snow-inner">
      <a-space wrap>
        <a-input v-model="form.name" placeholder="请输入菜单名称" allow-clear />
        <a-select v-model="form.hide" placeholder="请选择显示状态" allow-clear style="width: 120px">
          <a-option v-for="item in openState" :key="item.value" :value="item.value">{{ item.name }}</a-option>
        </a-select>
        <a-select v-model="form.disable" placeholder="请选择启用状态" allow-clear style="width: 120px">
          <a-option v-for="item in openState" :key="item.value" :value="item.value">{{ item.name }}</a-option>
        </a-select>
        <a-button type="primary" @click="onSearch">
          <template #icon><icon-search /></template>
          <span>查询</span>
        </a-button>

        <a-button @click="onReset">
          <template #icon>
            <icon-refresh />
          </template>
          <template #default>重置</template>
        </a-button>
      </a-space>
      <a-row>
        <a-space wrap>
          <a-button type="primary" @click="onAdd">
            <template #icon><icon-plus /></template>
            <span>新增</span>
          </a-button>
          <a-button type="primary" status="success" @click="onExpand">
            <template #icon><icon-swap /></template>
            <span>折叠</span>
          </a-button>
        </a-space>
      </a-row>
      <a-table
        ref="tableRef"
        :data="tableTree"
        :loading="loading"
        row-key="name"
        :bordered="{ cell: true }"
        show-empty-tree
        :pagination="false"
        size="medium"
        :scroll="{ x: '150%', y: '100%' }"
      >
        <template #columns>
          <a-table-column title="菜单名称">
            <template #cell="{ record }">
              {{ $t(`menu.${record.meta.title}`) }}
            </template>
          </a-table-column>
          <a-table-column title="菜单类型" align="center" :width="100">
            <template #cell="{ record }">
              <a-tag v-if="record.meta.type == 1" bordered size="small" color="purple">目录</a-tag>
              <a-tag v-else-if="record.meta.type == 2" bordered size="small" color="green">菜单</a-tag>
              <a-tag v-else bordered size="small" color="gray">按钮</a-tag>
            </template>
          </a-table-column>
          <a-table-column title="图标" align="center" :width="100">
            <template #cell="{ record }">
              <MenuItemIcon :svg-icon="record.meta.svgIcon" :icon="record.meta.icon" />
            </template>
          </a-table-column>
          <a-table-column title="路由路径" data-index="path"></a-table-column>
          <a-table-column title="路由名称" data-index="name"></a-table-column>
          <a-table-column title="组件路径">
            <template #cell="{ record }">
              {{ record.redirect ? record.redirect : record.component }}
            </template>
          </a-table-column>
          <a-table-column title="权限标识" tooltip>
            <template #cell="{ record }">
              {{ record.meta.roles }}
            </template>
          </a-table-column>
          <a-table-column title="排序" align="center" :width="80">
            <template #cell="{ record }">
              {{ record.meta.sort }}
            </template>
          </a-table-column>
          <a-table-column title="是否隐藏" align="center" :width="100">
            <template #cell="{ record }">
              <a-space>
                <a-tag bordered size="small" color="arcoblue" v-if="record.meta.hide">是</a-tag>
                <a-tag bordered size="small" color="red" v-else>否</a-tag>
              </a-space>
            </template>
          </a-table-column>
          <a-table-column title="是否禁用" align="center" :width="100">
            <template #cell="{ record }">
              <a-space>
                <a-tag bordered size="small" color="arcoblue" v-if="record.meta.disable">是</a-tag>
                <a-tag bordered size="small" color="red" v-else>否</a-tag>
              </a-space>
            </template>
          </a-table-column>
          <a-table-column title="是否缓存" align="center" :width="100">
            <template #cell="{ record }">
              <a-space>
                <a-tag bordered size="small" color="arcoblue" v-if="record.meta.keepAlive">是</a-tag>
                <a-tag bordered size="small" color="red" v-else>否</a-tag>
              </a-space>
            </template>
          </a-table-column>
          <a-table-column title="是否外链" align="center" :width="100">
            <template #cell="{ record }">
              <a-space>
                <a-tag bordered size="small" color="arcoblue" v-if="record.meta.link">是</a-tag>
                <a-tag bordered size="small" color="red" v-else>否</a-tag>
              </a-space>
            </template>
          </a-table-column>
          <a-table-column title="操作" align="center" :width="250" :fixed="'right'">
            <template #cell="{ record }">
              <a-space>
                <a-button size="mini" type="primary" @click="onEdit(record)">
                  <template #icon><icon-edit /></template>
                  <span>修改</span>
                </a-button>
                <a-button size="mini" type="primary" status="success">
                  <template #icon><icon-plus /></template>
                  <span>新增</span>
                </a-button>
                <a-button size="mini" type="primary" status="danger">
                  <template #icon><icon-delete /></template>
                  <span>删除</span>
                </a-button>
              </a-space>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </div>

    <a-modal width="40%" v-model:visible="open" @close="afterClose" @ok="handleOk" @cancel="afterClose">
      <template #title> {{ title }} </template>
      <div>
        <a-form ref="formRef" auto-label-width :rules="rules" :model="addFrom">
          <a-form-item field="type" label="菜单类型" validate-trigger="blur">
            <a-radio-group type="button" v-model="addFrom.type">
              <a-radio v-for="item in menuType" :key="item.value" :value="item.value">{{ item.name }}</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item field="id" label="上级菜单" validate-trigger="blur">
            <a-tree-select
              v-model="addFrom.id"
              :data="menuTree"
              :field-names="{
                key: 'id',
                title: 'i18n',
                children: 'children'
              }"
              placeholder="请选择上级菜单"
            ></a-tree-select>
          </a-form-item>
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item field="svgIcon" label="自定义图标" validate-trigger="blur">
                <SelectIcon type="svg" v-model="addFrom.svgIcon" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item field="icon" label="菜单图标" validate-trigger="blur">
                <SelectIcon type="arco" v-model="addFrom.icon" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item field="name" label="菜单名称" validate-trigger="blur">
                <a-input v-model="addFrom.name" placeholder="请输入菜单名称" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item field="title" label="国际化Key" validate-trigger="blur">
                <a-input v-model="addFrom.title" placeholder="请输入国际化Key" allow-clear />
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item field="path" label="路由路径" validate-trigger="blur">
            <a-input v-model="addFrom.path" placeholder="请输入路由路径" allow-clear />
          </a-form-item>
          <a-form-item field="redirect" label="重定向路径" validate-trigger="blur">
            <a-input v-model="addFrom.redirect" placeholder="请输入重定向路径" allow-clear />
          </a-form-item>
          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item field="hide" label="显示状态" validate-trigger="blur">
                <a-switch type="round" v-model="addFrom.hide">
                  <template #checked> 显示 </template>
                  <template #unchecked> 隐藏 </template>
                </a-switch>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item field="disable" label="启用状态" validate-trigger="blur">
                <a-switch type="round" v-model="addFrom.disable">
                  <template #checked> 启用 </template>
                  <template #unchecked> 禁用 </template>
                </a-switch>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item field="keepAlive" label="是否缓存" validate-trigger="blur">
                <a-switch type="round" v-model="addFrom.keepAlive">
                  <template #checked> 是 </template>
                  <template #unchecked> 否 </template>
                </a-switch>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item field="affix" label="固定Tabs" validate-trigger="blur">
                <a-switch type="round" v-model="addFrom.affix">
                  <template #checked> 是 </template>
                  <template #unchecked> 否 </template>
                </a-switch>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item field="isLink" label="是否外链" validate-trigger="blur">
                <a-switch type="round" v-model="addFrom.isLink">
                  <template #checked> 是 </template>
                  <template #unchecked> 否 </template>
                </a-switch>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item field="iframe" label="内嵌外链窗口" validate-trigger="blur" :disabled="!addFrom.isLink">
                <a-switch type="round" v-model="addFrom.iframe">
                  <template #checked> 是 </template>
                  <template #unchecked> 否 </template>
                </a-switch>
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item field="link" label="外链路径" validate-trigger="blur" v-if="addFrom.isLink">
            <a-input v-model="addFrom.link" placeholder="请输入路由路径" allow-clear />
          </a-form-item>
          <a-form-item field="link" label="菜单排序" validate-trigger="blur">
            <a-input-number
              v-model="addFrom.sort"
              :step="1"
              :precision="0"
              :min="1"
              :max="9999"
              :style="{ width: '120px' }"
              placeholder="请输入"
              mode="button"
              class="input-demo"
            />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import MenuItemIcon from "@/layout/components/Menu/menu-item-icon.vue";
import { getMenuListAPI } from "@/api/modules/system/index";
import useGlobalProperties from "@/hooks/useGlobalProperties";

const proxy = useGlobalProperties();
const openState = ref(dictFilter("status"));
const form = ref({
  name: "",
  hide: "",
  disable: ""
});

const onReset = () => {
  form.value = { name: "", hide: "", disable: "" };
};

const onEdit = (row: Menu.MenuOptions) => {
  console.log("修改", row);
};
// 新增
const open = ref(false);
const rules = {
  userName: [
    {
      required: true,
      message: "请输入用户名称"
    }
  ],
  nickName: [
    {
      required: true,
      message: "请输入昵称"
    }
  ],
  sex: [
    {
      required: true,
      message: "请选择性别"
    }
  ],
  deptId: [
    {
      required: true,
      message: "请选择所属部门"
    }
  ],
  roles: [
    {
      required: true,
      message: "请选择角色"
    }
  ],
  status: [
    {
      required: true,
      message: "请选择状态"
    }
  ]
};
const menuType = ref([
  { name: "目录", value: 1 },
  { name: "菜单", value: 2 },
  { name: "按钮", value: 3 }
]);
const addFrom = ref<any>({
  type: 1,
  id: "",
  svgIcon: "",
  icon: "",
  name: "",
  title: "",
  path: "",
  redirect: "",
  hide: false,
  disable: false,
  keepAlive: true,
  affix: false,
  isLink: false,
  link: "",
  iframe: false,
  sort: 1
});
const formType = ref(0); // 0新增 1修改
const title = ref("");
const formRef = ref();
const onAdd = () => {
  title.value = "新增菜单";
  formType.value = 0;
  open.value = true;
};
const handleOk = async () => {
  let state = await formRef.value.validate();
  if (state) return (open.value = true); // 校验不通过
  arcoMessage("success", "模拟提交成功");
};
// 关闭对话框动画结束后触发
const afterClose = () => {
  formRef.value.resetFields();
  addFrom.value = {
    type: 1,
    id: "",
    svgIcon: "",
    icon: "",
    name: "",
    title: "",
    path: "",
    redirect: "",
    hide: false,
    disable: false,
    keepAlive: true,
    affix: false,
    isLink: false,
    link: "",
    iframe: false,
    sort: 1
  };
};

const onSearch = () => getMenu();
const loading = ref(false);
const tableRef = ref();
const tableTree = ref([]);
const getMenu = async () => {
  try {
    loading.value = true;
    let { data } = await getMenuListAPI();
    translation(data);
    menuTree.value = filterTree(data);
    tableTree.value = data;
    console.log("数据", data, menuTree.value);
  } finally {
    loading.value = false;
  }
};

const expand = ref(false);
const onExpand = () => {
  expand.value = !expand.value;
  tableRef.value.expandAll(expand.value);
};

// 语言转化
const translation = (tree: any) => {
  tree.forEach((item: any) => {
    if (item.children) translation(item.children);
    if (item.meta.title) {
      item.i18n = proxy.$t(`menu.${item.meta.title}`);
    }
  });
};

// 过滤掉按钮菜单-type:3为按钮菜单-用于下拉选择
const menuTree = ref([]);
function filterTree(nodes: any) {
  // 过滤当前层级的节点，排除 type 为 3 的节点
  return nodes
    .filter((node: any) => node.meta.type !== 3)
    .map((node: any) => {
      // 创建新节点以避免修改原数据
      const newNode = { ...node };
      // 递归处理子节点
      if (newNode.children) {
        const filteredChildren = filterTree(newNode.children);
        if (filteredChildren.length > 0) {
          newNode.children = filteredChildren;
        } else {
          // 若子节点全被过滤，删除 children 属性
          delete newNode.children;
        }
      }
      return newNode;
    });
}

getMenu();
</script>

<style lang="scss" scoped></style>
