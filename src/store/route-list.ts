import { defineStore } from "pinia";

/**
 * 路由列表
 * @methods setRouteTree  设置路由树
 * @methods setRoutesList 设置路由一维数据
 * @methods setRouteNames 设置路由名称集合
 */
export const useRoutesListStore = defineStore("routeList", {
  state: (): any => ({
    routeTree: [], // 路由树
    routeList: [], // 路由数据-一维
    routeNames: [], // 路由名称
    tagsList: [] // 标签页数据
  }),
  actions: {
    setRouteTree(data: any) {
      this.routeTree = data;
    },
    setRouteList(data: any) {
      this.routeList = data;
    },
    setRouteNames(data: Array<string>) {
      this.routeNames = data;
    },
    setTagsList(data: Menu.MenuOptions) {
      let isExist = this.tagsList.some((item: Menu.MenuOptions) => item.name === data.name);
      if (!isExist) {
        this.tagsList.push(data);
      }
    }
  }
});
