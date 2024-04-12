import { dynamicRoutes } from "@/router/route";
import pinia from "@/store/index";
import router from "@/router/index.ts";
import { storeToRefs } from "pinia";
import { useUserInfoStore } from "@/store/user-info";
import { useRoutesListStore } from "@/store/route-list";

/**
 * 1、过滤有权限的路由树，缓存，addRoutes添加路由
 * 2、通过有权限的路由树生成路由name数组，缓存
 */
export async function initSetRouter() {
  const store = useRoutesListStore(pinia);
  const { routeTree, routeNames } = storeToRefs(store);
  // 根据角色权限过滤树
  let filteredTree = filterByRole(dynamicRoutes[0].children);
  console.log("一维", filteredTree);
  await store.setRouteTree(filteredTree);
  console.log("一维?", routeTree.value);
  // 根据树生成一维路由数组
  const flattenedArray = linearArray(filteredTree);
  console.log("二维?", flattenedArray);
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
  // console.log("一维数组", filteredTree, routeTree.value, routeNames.value); // 缓存需要修改，路由树这里没有数据
}

// 设置缓存name
export function setCacheName(flattenedArray: any) {
  const store = useRoutesListStore(pinia);
  const cacheName = flattenedArray.map((item: any) => item.name);
  store.setrouteNames(cacheName);
}

// 路由转一维数组
export function linearArray(tree: any) {
  const result = [];
  while (tree.length) {
    const next = tree.pop();
    if (Array.isArray(next.children)) {
      tree.push(...next.children);
    }
    result.push(next);
  }
  return result.reverse();
}

// 过滤路由树，返回有权限的树
export const filterByRole = (nodes: any) => {
  return nodes.filter((item: any) => {
    if (item.meta && item.meta.roles) {
      if (!roleBase(item.meta.roles)) return false;
    }
    if (item.children) item.children = filterByRole(item.children);
    return true;
  });
};

// 校验角色权限
export const roleBase = (roles: Array<string>) => {
  const store = useUserInfoStore(pinia);
  const { account } = storeToRefs(store);
  return account.value.roles.some((item: string) => roles.includes(item));
};
