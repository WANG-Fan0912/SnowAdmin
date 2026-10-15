import type { MockMethod } from "vite-plugin-mock";
import { resultSuccess } from "../_utils";

/** mock 请求参数：get 走 query，post 走 body */
interface MockRequest {
  query: Record<string, string>;
  body: Record<string, unknown>;
}

/* ─────────────────────────── 列表数据源 ─────────────────────────── */

/** 通用表格的姓名池，循环使用 */
const COMMON_NAMES = ["陈思源", "李婉娴", "王雨菲", "张晨曦", "赵梦琪", "刘昊然", "孙梦洁", "黄俊杰", "周雨萱", "韩雪儿"];
/** 通用表格的地址池，循环使用 */
const COMMON_ADDRESS = [
  "北京市朝阳区",
  "上海市浦东新区",
  "广州市天河区",
  "深圳市福田区",
  "成都市锦江区",
  "杭州市西湖区",
  "南京市鼓楼区",
  "重庆市渝中区",
  "武汉市江汉区",
  "西安市雁塔区"
];
/** 时间池，循环使用 */
const TIME_POOL = ["09:00:00", "15:30:00", "12:45:00", "11:20:00"];
/** 自定义表格的集合名池，循环使用 */
const CUSTOM_NAMES = [
  "WEIJEIWGSDG",
  "DHDWEH",
  "SHEHWAE",
  "WEHJUK",
  "EYTUJDGSD",
  "RTIFSDF",
  "OIKSHHFD",
  "QEUHRKO",
  "JSGSDRI",
  "AOUSTHREGG"
];
/** 自定义表格的内容载体，循环使用 */
const CUSTOM_CONTENT = ["图文", "视频", "音频"];
/** 自定义表格的内容量，与内容载体一一对应 */
const CUSTOM_SIZE = [3700, 2500, 2300];

/**
 * 通用表格的数据源（46 条，用于验证分页与查询过滤）
 * @param index 数据下标，从 0 开始
 */
const commonTableData = Array.from({ length: 46 }, (_, index) => ({
  key: String(index + 1),
  name: COMMON_NAMES[index % COMMON_NAMES.length],
  avatar: COMMON_NAMES[index % COMMON_NAMES.length].slice(0, 1),
  phone: `13${String(index + 1).padStart(9, "0")}`,
  email: `user${index + 1}@example.com`,
  address: COMMON_ADDRESS[index % COMMON_ADDRESS.length],
  status: index % 2 === 0 ? 1 : 0,
  createTime: `2024-05-${String(27 - (index % 27)).padStart(2, "0")} ${TIME_POOL[index % TIME_POOL.length]}`
}));

/**
 * 自定义表格的数据源（46 条，用于验证分页与查询过滤）
 * @param index 数据下标，从 0 开始
 */
const customTableData = Array.from({ length: 46 }, (_, index) => {
  const content = CUSTOM_CONTENT[index % CUSTOM_CONTENT.length];
  return {
    key: String(index + 1),
    serial: String(57 + index),
    name: CUSTOM_NAMES[index % CUSTOM_NAMES.length],
    content,
    searchType: content === "图文" ? "阅读量" : "播放量",
    contentSize: CUSTOM_SIZE[index % CUSTOM_SIZE.length],
    status: index % 2 === 0 ? 1 : 0,
    createTime: `2024-05-${String(27 - (index % 27)).padStart(2, "0")} ${TIME_POOL[index % TIME_POOL.length]}`
  };
});

/**
 * useTable 示例页的数据源。
 * 使用模块级可变数组，删除接口会真实移除元素，用于验证「删完最后一页自动回退页码」。
 */
const hookTableData = Array.from({ length: 46 }, (_, index) => ({
  key: String(index + 1),
  name: `示例用户 ${index + 1}`,
  phone: `13${String(index + 1).padStart(9, "0")}`,
  email: `user${index + 1}@example.com`,
  address: ["北京市朝阳区", "上海市浦东新区", "广州市天河区", "深圳市南山区"][index % 4],
  status: index % 3 === 0 ? 0 : 1,
  gender: index % 3,
  state: (index % 3) + 1,
  createTime: `2024-06-${String((index % 28) + 1).padStart(2, "0")} 10:00:00`
}));

/* ─────────────────────────── 工具函数 ─────────────────────────── */

/**
 * 字段值是否命中关键字，关键字为空表示不过滤
 * @param value 字段值
 * @param keyword 查询关键字，已去除首尾空格
 */
const matchKeyword = (value: unknown, keyword: string): boolean => {
  return keyword === "" || String(value).includes(keyword);
};

/**
 * 按分页参数切片，页码与每页条数缺失时兜底 1 / 10
 * @param list 过滤后的完整列表
 * @param query 请求 query
 */
const sliceByPage = <T>(list: T[], query: Record<string, string>): T[] => {
  const current = Number(query.current ?? 1);
  const pageSize = Number(query.pageSize ?? 10);
  const start = (current - 1) * pageSize;
  return list.slice(start, start + pageSize);
};

/** 取 query 中的字符串参数并去除首尾空格，缺省为空字符串 */
const pickQuery = (query: Record<string, string>, key: string): string => String(query[key] ?? "").trim();

export default [
  {
    url: "/mock/common-table/list",
    method: "get",
    timeout: 500,
    response: ({ query }: MockRequest) => {
      const name = pickQuery(query, "name");
      const phone = pickQuery(query, "phone");
      const email = pickQuery(query, "email");
      const address = pickQuery(query, "address");
      const status = pickQuery(query, "status");
      const filtered = commonTableData.filter(
        item =>
          matchKeyword(item.name, name) &&
          matchKeyword(item.phone, phone) &&
          matchKeyword(item.email, email) &&
          matchKeyword(item.address, address) &&
          (status === "" || String(item.status) === status)
      );
      return resultSuccess({ list: sliceByPage(filtered, query), total: filtered.length });
    }
  },
  {
    url: "/mock/custom-table/list",
    method: "get",
    timeout: 500,
    response: ({ query }: MockRequest) => {
      const serial = pickQuery(query, "serial");
      const name = pickQuery(query, "name");
      const content = pickQuery(query, "content");
      const contentSize = pickQuery(query, "contentSize");
      const status = pickQuery(query, "status");
      const startTime = pickQuery(query, "startTime");
      const endTime = pickQuery(query, "endTime");
      // 数据里的创建时间带时分秒，范围查询只比较日期部分
      const day = (createTime: string): string => createTime.slice(0, 10);
      const filtered = customTableData.filter(
        item =>
          matchKeyword(item.serial, serial) &&
          matchKeyword(item.name, name) &&
          matchKeyword(item.content, content) &&
          matchKeyword(item.contentSize, contentSize) &&
          (status === "" || String(item.status) === status) &&
          (startTime === "" || day(item.createTime) >= startTime) &&
          (endTime === "" || day(item.createTime) <= endTime)
      );
      return resultSuccess({ list: sliceByPage(filtered, query), total: filtered.length });
    }
  },
  {
    url: "/mock/hook-table/list",
    method: "get",
    timeout: 300,
    response: ({ query }: MockRequest) => {
      // 兼容两种字段名：默认 current/pageSize，配置 pageParamsMap 后为 pageNum/size
      const current = Number(query.current ?? query.pageNum ?? 1);
      const pageSize = Number(query.pageSize ?? query.size ?? 10);
      const name = String(query.name ?? "").trim();
      const status = String(query.status ?? "");
      const filtered = hookTableData.filter(item => {
        const matchName = name === "" || item.name.includes(name);
        const matchStatus = status === "" || String(item.status) === status;
        return matchName && matchStatus;
      });
      const start = (current - 1) * pageSize;
      return resultSuccess({
        list: filtered.slice(start, start + pageSize),
        total: filtered.length
      });
    }
  },
  {
    url: "/mock/hook-table/delete",
    method: "post",
    timeout: 300,
    response: ({ body }: MockRequest) => {
      const ids = ((body.ids ?? []) as Array<string | number>).map(String);
      for (let i = hookTableData.length - 1; i >= 0; i--) {
        if (ids.includes(hookTableData[i].key)) hookTableData.splice(i, 1);
      }
      return resultSuccess({ deleted: ids.length });
    }
  }
] as MockMethod[];
