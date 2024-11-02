import pinia from "@/store/index";
import { storeToRefs } from "pinia";
import { useRoutesConfigStore } from "@/store/modules/route-config";
import { useThemeConfig } from "@/store/modules/theme-config";
import { deepClone, arrayFlattened } from "@/utils/index";
import { useRoutingMethod } from "@/hooks/useRoutingMethod";
import Layout from "@/layout/index.vue";

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
 * 统一处理所有的路由跳转：当前路由高亮、tabs栏数据
 * 处理项目内跳转，存入当前跳转路由和tabs标签栏数据
 * menu和tabs以及手动刷新浏览器等功能只需要跳转即可，缓存和高亮的逻辑这边负责
 * @param {object} name 需要跳转的路由
 */
export const currentlyRoute = (name: string) => {
  const themeStore = useThemeConfig();
  const { isTabs } = storeToRefs(themeStore);
  const store = useRoutesConfigStore(pinia);
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

/**
 * 模块替换，深层递归，对所有的路由中符合条件的模块进行转换
 * @param {array} tree 过滤角色权限后的树
 */
export const moduleReplacement = (tree: any) => {
  if (tree?.length == 0) return [];
  tree.map((item: any) => {
    // 模块匹配以及转换
    moduleMatch(item);
    if (item?.children?.length > 0) {
      item.children = moduleReplacement(item.children);
    }
  });
  return tree;
};

/**
 * 模块匹配
 * 1、导入 views 目录及其子目录下的所有 .vue 文件。
 * 2、匹配顶层layout，替换真实模块，layout为应用的基础结构
 * 3、匹配views下的所有文件路径，将模块转换为按需引入的真实模块
 * 4、未匹配上，不做处理
 */
// 匹配views里面所有的.vue文件
const modules = import.meta.glob("@/views/**/*.vue");
export const moduleMatch = (item: any) => {
  // 若是layout，则直接给予顶层layout
  if (item.component === "layout") {
    // 布局组件是应用的基础结构，在应用启动时就需要被加载，因此不需要按需引入
    return (item.component = Layout);
  }
  // 其它情况下，匹配每个views文件夹下的文件路径
  for (const key in modules) {
    const dir = key.split("views/")[1].replace(".vue", "");
    // 若匹配上，则替换真实模块
    if (item.component === dir) {
      // 按需引入modules
      // 将模块的导入操作和实际使用操作解耦，使得我们可以在需要的时候才执行导入操作
      item.component = () => modules[key]();
    }
  }
};
