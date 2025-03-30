import type { MockMethod } from "vite-plugin-mock";
import { resultSuccess } from "../_utils";
import { dictData } from "../_data/system_data";

// post请求body,get请求query
export default [
  {
    url: "/mock/system/getDict",
    method: "get",
    timeout: 300,
    response: () => {
      return resultSuccess(dictData);
    }
  }
] as MockMethod[];
