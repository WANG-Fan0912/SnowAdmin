import { defineStore } from "pinia";

/**
 * 路由列表
 * @methods setRoutesList 设置路由数据
 * @methods setrouteNames 设置路由名称
 */
export const useRoutesListStore = defineStore("routeList", {
  state: (): any => ({
    routeTree: [], // 路由树
    routeList: [], // 路由数据
    routeNames: [] // 路由名称
  }),
  actions: {
    async setRouteTree(data: any) {
      this.routeTree = data;
    },
    async setRouteList(data: Array<string>) {
      this.routesList = data;
    },
    async setrouteNames(data: Array<string>) {
      this.routeNames = data;
    }
  },
  persist: {
    enabled: true
  }
});
