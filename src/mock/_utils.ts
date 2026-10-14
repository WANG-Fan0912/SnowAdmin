import Mock from "mockjs";

/** 返回成功数据 */
export const resultSuccess = (data: unknown) => {
  return Mock.mock({
    code: 200,
    data,
    message: "请求成功",
    success: true
  });
};

/** 返回失败数据 */
export const resultError = (data: unknown, message: string, code = 500) => {
  return Mock.mock({
    code,
    data,
    message,
    success: false
  });
};

/**
 * 深拷贝
 * 项目共用工具见 src/utils/index，此处仅做透出，mock 内部保持相对引用
 */
export { deepClone } from "../utils/index";

/**
 * 说明：路由树的通用处理工具（treeSort / filterByDisable / roleBase / buildTreeOptimized）
 * 已迁移到 src/router/route-tools.ts，mock 与前端数据源共用同一套逻辑，此处不再重复实现
 */
