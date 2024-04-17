import pinia from "@/store/index";
import router from "@/router/index.ts";
import { dynamicRoutes } from "@/router/route";
import { storeToRefs } from "pinia";
import { useUserInfoStore } from "@/store/user-info";
import { useRoutesListStore } from "@/store/route-list";
import { deepClone, arrayFlattened } from "@/utils/index";

/**
 * 初始化
 * 1、过滤有权限的路由树并存入store，用于菜单生成
 * 2、根据路由树生成一维数组
 * 3、设置完整的路由，顶层路由 + 一维路由数组，addRoute动态添加路由，KeepAlive支持二级路由缓存
 * 4、将一维数组和路由name存入store，用于后续路由匹配和缓存
 */
export async function initSetRouter() {
  const store = useRoutesListStore(pinia);
  // 根据角色权限过滤树
  let filteredTree = filterByRole(dynamicRoutes[0].children);
  await store.setRouteTree(filteredTree);
  // 根据树生成一维路由数组
  const flattenedArray = linearArray(filteredTree);
  // 设置完整的路由，二维路由，顶层路由 + 二级的一维路由
  const twoStoryTree = dynamicRoutes.map(item => {
    if (flattenedArray.length > 0) item.redirect = flattenedArray[0].path;
    item.children = flattenedArray;
    return item;
  });
  // 动态添加路由
  twoStoryTree.forEach((route: any) => router.addRoute(route));
  // 根据一维路由设置缓存name
  setCacheName(flattenedArray);
}

/**
 * 将一维路由数组和路由name存入store
 * @param {array} flattenedArray 一维路由数组
 */
export function setCacheName(flattenedArray: any) {
  const store = useRoutesListStore(pinia);
  const cacheName = flattenedArray.map((item: any) => item.name);
  store.setRouteNames(cacheName); // 缓存路由name
  store.setRouteList(flattenedArray); // 缓存路由
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
 * @param {array} nodes 根据角色权限过滤原始路由树
 * @returns 返回有权限的树
 */
export const filterByRole = (nodes: any) => {
  return nodes.filter((item: any) => {
    if (item.meta && item.meta.roles) {
      if (!roleBase(item.meta.roles)) return false;
    }
    if (item.children) item.children = filterByRole(item.children);
    return true;
  });
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
