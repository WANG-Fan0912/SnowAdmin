import { defineStore } from "pinia";

/**
 * 路由列表
 * @methods setRouteTree  设置路由树
 * @methods setRoutesList 设置路由一维数据
 * @methods setRouteNames 设置路由名称集合
 */
export const useRoutesListStore = defineStore("routeList", {
  state: (): any => ({
    routeTree: [], // 有访问权限的路由树
    routeList: [], // 有访问权限的一维路由数组
    routeNames: [], // 有访问权限的路由名称
    tabsList: [], // 标签页数据
    currentRoute: {} // 当前路由
  }),
  actions: {
    setRouteTree(data: Menu.MenuOptions) {
      this.routeTree = data;
    },
    /**
     * 设置有访问权限的一维路由数组
     * @param {Array} data 一维路由数组
     */
    setRouteList(data: any) {
      this.routeList = data;
    },
    /**
     * 设置所有可缓存路由的路由名
     * @param {Array} data 路由名数组
     */
    setRouteNames(data: Array<string>) {
      this.routeNames = data;
    },
    /**
     * 添加tabs标签页
     * @param {object} data 当前tabs路由
     */
    setTabs(data: Menu.MenuOptions) {
      // 当前路由在tags中是否存在，不存在则缓存
      let isExist = this.tabsList.some((item: Menu.MenuOptions) => item.name === data.name);
      if (isExist) return;
      this.tabsList.push(data);
    },
    /**
     * 设置系统内的当前路由数据
     * @param {object} data 当前路由
     */
    setCurrentRoute(data: Menu.MenuOptions) {
      if (this.currentRoute.name && data.name === this.currentRoute.name) return;
      this.currentRoute = data;
    },
    /**
     * 删除tabs页的指定路由
     * @param {string} key 路由name
     */
    removeTabsList(key: string) {
      const index = this.tabsList.findIndex((item: Menu.MenuOptions) => item.name === key);
      if (index === -1) return;
      this.tabsList.splice(index, 1);
    }
  }
});
