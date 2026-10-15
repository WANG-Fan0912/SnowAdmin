import axios from "@/api";

// 获取列表数据
export const getCommonTableListAPI = () => {
  return axios({
    url: "/mock/common-table/list",
    method: "get"
  });
};

// 获取列表数据
export const getCustomTableListAPI = () => {
  return axios({
    url: "/mock/custom-table/list",
    method: "get"
  });
};

// 获取列表数据（useTable 示例页，支持分页与查询参数）
export const getHookTableListAPI = (params: Record<string, unknown>) => {
  return axios({
    url: "/mock/hook-table/list",
    method: "get",
    params
  });
};

// 删除数据（useTable 示例页，接收 id 列表）
export const deleteHookTableAPI = (ids: Array<string | number>) => {
  return axios({
    url: "/mock/hook-table/delete",
    method: "post",
    data: { ids }
  });
};
