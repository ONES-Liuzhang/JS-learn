import { extend } from "./utils";
import Axios from "./core/Axios";
import bind from "./helpers/bind";
import defaults from "./defaults";
import CancelToken from "./cancel/cancelToken";
import Cancel from "./cancel/cancel";

/**
 * 1. 直接 axios(config) 发起请求
 *
 * 2. axios.get() axios.post() 发起请求
 *
 * 3. axios.createInstance(baseConfig) 创建实例对象来发起请求
 */
function createInstance(defaultConfig) {
  const context = new Axios(defaultConfig);
  let instance = bind(Axios.prototype.request, context);

  extend(instance, Axios.prototype, context);

  extend(instance, context);

  return instance;
}

const axios = createInstance(defaults);

axios.create = function create(defaultConfig) {
  return createInstance(merge(axios.defaults, defaultConfig));
};

axios.Axios = Axios;

axios.CancelToken = CancelToken;
axios.Cancel = Cancel;

export default axios;
