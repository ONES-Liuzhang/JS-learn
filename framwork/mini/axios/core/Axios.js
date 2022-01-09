import { mergeOptions } from "../utils";

function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: [],
    response: [],
  };
}

Axios.prototype.request = function (config) {
  // 1.参数处理
  if (typeof config === "string") {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeOptions(this.defaults, config);

  const chain = [];
};
