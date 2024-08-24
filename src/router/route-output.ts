import pinia from "@/store/index";
import router from "@/router/index.ts";
import { RouteRecordRaw } from "vue-router";
import { dynamicRoutes } from "@/router/route";
import { storeToRefs } from "pinia";
import { useUserInfoStore } from "@/store/modules/user-info";
import { useRoutesListStore } from "@/store/modules/route-list";
import { useThemeConfig } from "@/store/modules/theme-config";
import { deepClone, arrayFlattened } from "@/utils/index";
import { useRoutingMethod } from "@/hooks/useRoutingMethod";
import { loadingPage } from "@/utils/loading-page";

/**
 * 初始化
 * 1、过滤有权限的路由树并存入store，用于菜单生成
 * 2、根据路由树生成一维数组
 * 3、设置完整的路由，顶层路由 + 一维路由数组，addRoute动态添加路由，KeepAlive支持二级路由缓存
 */
export async function initSetRouter() {
  // 初始化路由，渲染loading
  loadingPage.start();
  const store = useRoutesListStore(pinia);
  // 根据角色权限过滤树并将其排序
  const originTree: RouteRecordRaw[] = deepClone(dynamicRoutes);
  let filteredTree = treeSort(filterByRole(originTree[0].children));
  await store.setRouteTree(filteredTree);
  // 根据树生成一维路由数组
  const flattenedArray = linearArray(filteredTree);
  // 设置完整的路由，二维路由：顶层路由 + 二级的一维路由
  const addBeforeTree = originTree.map(item => {
    if (flattenedArray.length > 0) item.redirect = flattenedArray[0].path;
    item.children = flattenedArray;
    return item;
  });
  // 动态添加路由
  addBeforeTree.forEach((route: RouteRecordRaw) => router.addRoute(route));
  // 设置一维路由
  setRouting(flattenedArray);
}

/**
 * 设置有访问权限的一维路由数组
 * @param {array} flattenedArray 一维路由数组
 */
export function setRouting(flattenedArray: any) {
  const store = useRoutesListStore(pinia);
  store.setRouteList(flattenedArray); // 缓存一维路由
}

/**
 * 路由树转一维数组
 * @param {array} tree 路由树
 * @returns 一维路由数组
 */
export function linearArray(tree: any) {
  const nodes: any = deepClone(tree);
  return arrayFlattened(nodes, "children");
}

/**
 * 过滤路由树，返回有权限的树
 * 1、先过滤停用的菜单，该菜单是不可访问的，直接去掉
 * 2、根据角色权限过滤原始路由树
 * @param {array} tree 根据角色权限过滤原始路由树
 * @returns 返回有权限的树
 */
export const filterByRole = (tree: any) => {
  return tree.filter((item: any) => {
    // 过滤角色权限
    if (item?.meta?.roles) {
      if (!roleBase(item.meta.roles)) return false;
    }
    // 过滤是否禁用
    if (item?.meta?.disable) return false;
    if (item.children) item.children = filterByRole(item.children);
    return true;
  });
};

/**
 * 路由树递归排序
 * 1、先给当前层排序
 * 2、若当前层有children则递归排序
 * @param {array} tree 根据角色权限过滤后的路由树
 * @returns 返回排序之后的树
 */
export const treeSort = (tree: Menu.MenuOptions[]) => {
  if (!tree || tree.length == 0) return [];
  tree.sort((a: Menu.MenuOptions, b: Menu.MenuOptions) => {
    // a和b都是undefined则相等
    if (a.meta.sort != 0 && !a.meta.sort && b.meta.sort != 0 && !b.meta.sort) {
      return 0;
    }
    // a是undefined则a被排在b之后
    if (a.meta.sort != 0 && !a.meta.sort) return 1;
    // b是undefined则b被排在a之后
    if (b.meta.sort != 0 && !b.meta.sort) return -1;
    return a.meta.sort - b.meta.sort;
  });

  // 深层递归
  let sortAfter = tree.map((item: any) => {
    if (item?.children?.length > 0) {
      item.children = treeSort(item.children);
    }
    return item;
  });
  return sortAfter;
};

/**
 * 校验该角色是否有路由权限
 * @param {array} roles 路由的角色权限
 * @returns 是否有权限 true是 false否
 */
export const roleBase = (roles: Array<string>) => {
  const store = useUserInfoStore(pinia);
  const { account } = storeToRefs(store);
  return account.value.roles.some((item: string) => roles.includes(item));
};

/**
 * 统一处理所有的路由跳转：当前路由高亮、tabs栏数据
 * 处理项目内跳转，存入当前跳转路由和tabs标签栏数据
 * menu和tabs以及手动刷新浏览器等功能只需要跳转即可，缓存和高亮的逻辑这边负责
 * @param {object} name 需要跳转的路由
 */
export const currentlyRoute = (name: string) => {
  const themeStore = useThemeConfig();
  const { isTabs } = storeToRefs(themeStore);
  const store = useRoutesListStore(pinia);
  const { tabsList, routeList } = storeToRefs(store);
  // tabs无数据则默认添加首页
  if (tabsList.value.length == 0 && routeList.value.length != 0) {
    store.setTabs(routeList.value[0]);
  }
  // 跳转路由是有权限的，缓存跳转路由
  const { findLinearArray } = useRoutingMethod();
  const find = findLinearArray(name);
  if (find === undefined) return;
  // 存入当前路由-高亮
  store.setCurrentRoute(find);

  // 如果是外链路由则不做后续任何缓存操作，条件: 有外链 && 非内嵌
  if (find.meta.link && !find.meta.iframe) return;

  // 存入tabs栏数据，条件：开启tabs
  if (isTabs.value) store.setTabs(find);
  // 不缓存路由 || 不渲染tabs ，符合任意条件则不缓存路由
  if (!find.meta.keepAlive || !isTabs.value) return;
  store.setRouteNames(find.name); // 缓存路由name
};
