import type { MockMethod } from "vite-plugin-mock";
import { deepClone, filterByRole, buildTreeOptimized, treeSort, resultSuccess } from "../_utils";
import systemMenu from "../_data/system_menu";

/**
 * 初始化
 * 后端接口需要做的事情：
 * 1、根据token判断角色
 * 2、过滤扁平路由，根据角色过滤权限和非禁用的节点
 * 3、将扁平路由转换为树结构
 * 3、路由树排序
 * 4、返回路由树
 *
 * 前端调用接口拿到路由数据后：
 * 1、将模块设置为真实模块
 * 2、存储路由树，用于生成菜单
 * 3、根据树生成一维路由数组
 * 4、动态添加路由
 * 5、缓存一维路由
 */

// post请求body,get请求query
export default [
  {
    url: "/mock/menu/getMenuList",
    method: "get",
    timeout: 300,
    response: ({ headers }: any) => {
      let token = headers.authorization;
      // 这里模拟两个角色，admin、common
      let userRoles = token === "Admin-Token" ? ["admin"] : ["common"];
      const originTree: any = deepClone(systemMenu);
      // 1. 过滤扁平路由，根据角色返回有权限且非禁用的节点
      const survivalTree = filterByRole(originTree, userRoles);
      // 2. 将扁平路由转换为树结构
      // 2. 给路由树排序
      // 3. 返回路由树
      return resultSuccess(treeSort(buildTreeOptimized(survivalTree)));
    }
  }
] as MockMethod[];
