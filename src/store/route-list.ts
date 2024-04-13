import { defineStore } from "pinia";

/**
 * 路由列表
 * @methods setRouteTree  设置路由树
 * @methods setRoutesList 设置路由一维数据
 * @methods setrouteNames 设置路由名称集合
 */
export const useRoutesListStore = defineStore("routeList", {
  state: (): any => ({
    routeTree: [], // 路由树
    routeList: [], // 路由数据
    routeNames: [] // 路由名称
  }),
  actions: {
    setRouteTree(data: any) {
      this.routeTree = data;
    },
    setRouteList(data: any) {
      this.routeList = data;
    },
    setrouteNames(data: Array<string>) {
      this.routeNames = data;
    }
  }
});
