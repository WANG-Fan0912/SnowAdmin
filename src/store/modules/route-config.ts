import { defineStore } from "pinia";
import router from "@/router/index";
import { getMenuAPI } from "@/api/modules/system/index";
import { moduleReplacement, linearArray } from "@/router/route-output";

/**
 * 路由列表
 * @methods setRouteNames 设置路由名称集合
 * @methods setTabs 添加tabs标签页
 * @methods setCurrentRoute 设置系统内的当前路由
 * @methods removeTabsList 删除tabs页的指定路由
 * @methods removeRouteName 删除缓存路由名，用于取消页面缓存，单个删除
 * @methods removeRouteNames 删除缓存路由名，用于取消页面缓存，批量删除
 * @methods initSetRouter 路由初始化
 */
export const routesConfigStore = () => {
  const routeTree = ref<any>([]); // 有访问权限的路由树
  const routeList = ref<any>([]); // 有访问权限的一维路由数组
  const cacheRoutes = ref<string[]>([]); // 所有可缓存路由的路由名
  const tabsList = ref<any>([]); // 标签页数据
  const currentRoute = ref<any>({}); // 当前路由

  /**
   * 设置可缓存路由的路由名
   * @param {string} name 路由名
   */
  function setRouteNames(name: string) {
    let state = cacheRoutes.value.some((item: string) => item === name);
    if (state) return;
    cacheRoutes.value.push(name);
  }

  /**
   * 添加tabs标签页
   * @param {object} data 当前tabs路由
   */
  function setTabs(data: Menu.MenuOptions) {
    // 当前路由在tags中是否存在，不存在则缓存
    let isExist = tabsList.value.some((item: Menu.MenuOptions) => item.name === data.name);
    if (isExist) return;
    tabsList.value.push(data);
  }
  /**
   * 设置系统内的当前路由数据
   * @param {object} data 当前路由
   */
  function setCurrentRoute(data: Menu.MenuOptions) {
    if (currentRoute.value.name && data.name === currentRoute.value.name) return;
    currentRoute.value = data;
  }
  /**
   * 删除tabs页的指定路由
   * @param {string} key 路由name
   */
  function removeTabsList(key: string) {
    const index = tabsList.value.findIndex((item: Menu.MenuOptions) => item.name === key);
    if (tabsList.value[index].meta.affix) return;
    if (index === -1) return;
    tabsList.value.splice(index, 1);
  }
  /**
   * 删除缓存路由名，用于取消页面缓存，单个删除
   * @param {string} key 路由名
   */
  function removeRouteName(key: string) {
    const index = cacheRoutes.value.findIndex((item: string) => item === key);
    if (index === -1) return;
    cacheRoutes.value.splice(index, 1);
  }
  /**
   * 删除缓存路由名，用于取消页面缓存，批量删除
   * @param {Array} list 路由名
   */
  function removeRouteNames(list: Array<string>) {
    cacheRoutes.value = cacheRoutes.value.filter((item: string) => !list.includes(item));
  }
  /**
   * 重置routeTree路由树
   */
  async function resetRoute() {
    routeTree.value = [];
  }
  /**
   * 路由初始化
   * 1、获取过滤角色权限后的树，后端做排序处理
   * 2、将模块设置为真实模块
   * 3、存储路由树，用于生成菜单
   * 4、根据树生成一维路由数组
   * 5、动态添加路由
   * 6、缓存一维路由
   */
  async function initSetRouter() {
    // 1、获取过滤角色权限后的树，后端做排序处理
    let { data } = await getMenuAPI();
    // 2、将模块设置为真实模块
    let tree = await moduleReplacement(data);
    // 3、存储路由树，用于生成菜单
    routeTree.value = tree;
    // 4、根据树生成一维路由数组
    tree = linearArray(tree);
    // 5、动态添加路由
    tree.forEach((route: any) => router.addRoute("layout", route));
    // 6、缓存一维路由
    routeList.value = tree;
  }

  return {
    routeTree,
    routeList,
    cacheRoutes,
    tabsList,
    currentRoute,
    setRouteNames,
    setTabs,
    setCurrentRoute,
    removeTabsList,
    removeRouteName,
    removeRouteNames,
    resetRoute,
    initSetRouter
  };
};

export const useRoutesConfigStore = defineStore("route-config", routesConfigStore);
