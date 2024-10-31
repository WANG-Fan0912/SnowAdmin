import axios from "@/api";

export const mockTestAPI = (params: any) => {
  return axios({
    url: "/mock/test/success",
    method: "get",
    params
  });
};
