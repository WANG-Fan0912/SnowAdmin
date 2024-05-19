import axios from "@/api";

// 第三板指标
export const getTargetAPI = () => axios.get("/notice-list");
