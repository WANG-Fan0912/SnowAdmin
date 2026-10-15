import pinia from "@/store/index";
import { useUserInfoStore } from "@/store/modules/user-info";
import { getRoutersAPI } from "@/api/modules/system/index";
import { frontendRoutes } from "@/router/frontend-routes";
import { buildRouteTree } from "@/router/route-tools";

/**
 * 路由数据源
 * ------------------------------------------------------------------
 * 无论数据从哪来，最终都返回"已过滤权限、已成树、已排序"的同一份结构，
 * 下游（route-config 的 moduleReplacement / addRoute / routeTree）完全不需要关心来源。
 *
 * 三种来源由环境变量 VITE_ROUTE_SOURCE 控制：
 * 1、mock   ：走 src/mock 的本地 mock 接口（/mock/menu/getRouters），未配置 VITE_ROUTE_SOURCE 且 VITE_APP_OPEN_MOCK = true 时默认
 * 2、front  ：走前端路由文件 src/router/frontend-routes.ts，无需任何后端接口，
 *             角色过滤、扁平转树、排序全部在前端完成，未配置 VITE_ROUTE_SOURCE 且未开 mock 时默认
 * 3、server ：走真实后端接口 /api/menu/getRouters，由后端完成同样三件事
 *
 * 开发者日常只维护 src/router/frontend-routes.ts 这一个文件即可。
 */

/** 路由数据源类型 */
export type RouteSourceType = "mock" | "front" | "server";

const OPEN_MOCK = import.meta.env.VITE_APP_OPEN_MOCK === "true";
const CONFIG_SOURCE = (import.meta.env.VITE_ROUTE_SOURCE || "") as RouteSourceType | "";

/**
 * 当前生效的数据源
 * 未显式配置 VITE_ROUTE_SOURCE 时，按是否开启 mock 推导：开 mock → mock，否则 → front（保证关掉 mock 也能正常跑）
 */
export const routeSource: RouteSourceType = CONFIG_SOURCE || (OPEN_MOCK ? "mock" : "front");

if (!CONFIG_SOURCE) {
  console.warn(
    `[route-source] 未配置 VITE_ROUTE_SOURCE，已按 VITE_APP_OPEN_MOCK 推导为 "${routeSource}"；` +
      `可在 .env 中显式配置 mock | front | server`
  );
}

/**
 * 获取当前账号的角色
 * front 模式下由前端自己做权限过滤，角色取自登录接口返回的 roles
 * 兜底：未拿到角色时按 admin 放行，避免登录接口尚未就绪时整站无菜单
 * @returns 角色数组
 */
function getUserRoles(): string[] {
  const { account } = useUserInfoStore(pinia);
  const roles = account?.roles;
  if (!roles || roles.length === 0) {
    console.warn(
      "[route-source] 未获取到账号角色（account.roles 为空），front 模式已按 admin 放行全部菜单；" +
        "接入真实登录接口后请返回 roles 字段"
    );
    return ["admin"];
  }
  return roles;
}

/**
 * 获取路由树
 * @returns 已过滤权限、已成树、已排序的路由树
 */
export async function getRoutersTree(): Promise<Menu.MenuOptions[]> {
  // 前端路由文件：本地完成 过滤 → 建树 → 排序
  if (routeSource === "front") {
    return buildRouteTree(frontendRoutes as unknown as Menu.MenuOptions[], getUserRoles());
  }
  // mock 接口 or 真实后端接口：这两步由"服务端"完成
  const { data } = await getRoutersAPI();
  return data;
}
