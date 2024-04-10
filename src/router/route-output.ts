import { dynamicRoutes } from "@/router/route";
export function initSetRouter() {
  console.log("路由数据处理");
  // 过滤后的结果
  let filteredData = filterByRole(dynamicRoutes[0].children);
  console.log("路由处理完", filteredData);
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
  let userRoles = ["admin"];
  return userRoles.some(el => roles.includes(el));
};
