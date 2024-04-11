import { dynamicRoutes } from "@/router/route";
import pinia from "@/store/index";
import { storeToRefs } from "pinia";
import { useUserInfoStore } from "@/store/user-info";
// import { useRoutesListStore } from "@/store/route-list";

export function initSetRouter() {
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
  const store = useUserInfoStore(pinia);
  const { account } = storeToRefs(store);
  return account.value.roles.some((item: string) => roles.includes(item));
};
