import axios from "axios";
import { useRouter } from "vue-router";
const router = useRouter();
// 创建axios实例
const service = axios.create({
  baseURL: "https://mock.apifox.com/m1/4457302-4103374-default",
  timeout: 5000
});
// 请求拦截器
service.interceptors.request.use(
  function (config: any) {
    // 发送请求之前做什么
    // 获取token鉴权
    console.log("token?", localStorage.getItem("user-info"));
    let userInfo: any = {};
    if (localStorage.getItem("user-info")) {
      userInfo = JSON.parse(localStorage.getItem("user-info") as string);
    }
    if (userInfo.token) {
      // 有token，在请求头中携带token
      config.headers.Authorization = userInfo.token;
    } else {
      // 如果没有token，则不允许发送请求，并且跳转至登录页要求登录，获取对应的token
      if (config.url !== "/login") {
        router.push("/login");
        Promise.reject("未登录");
      }
    }
    return config;
  },
  function (error: any) {
    // 请求错误
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  function (response: any) {
    return response.data;
  },
  function (error: any) {
    console.log("响应拦截", error, router);
    console.log("身份信息过期");
    localStorage.removeItem("user-info");
    router.push("/login");
    return Promise.reject(error);
  }
);
export default service;
