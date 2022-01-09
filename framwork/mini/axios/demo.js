import axios from "./index";

// 配置公共属性
const defaultConfig = {
  baseURL: "/",
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
};

const request = axios.createInstance(defaultConfig);

export default request;
