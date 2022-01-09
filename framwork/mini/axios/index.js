import Axios from "./core/Axios";

export default function axios() {}

axios.createInstance = function createAxiosInstance(baseConfig) {
  return new Axios(baseConfig);
};
