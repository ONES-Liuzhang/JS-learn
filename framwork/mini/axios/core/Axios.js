import { mergeOptions, forEach, merge } from "../utils";
import dispatchRequest from "./dispatchRequest";

function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: [],
    response: [],
  };
}

/**
 * 参数重载
 *
 * request(config)
 * request(url, config)
 */
Axios.prototype.request = function (config) {
  // 1.参数处理
  if (typeof config === "string") {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeOptions(this.defaults, config);

  // TODO：直接发起请求 拦截器
  return dispatchRequest(config);
};

forEach(
  ["delete", "get", "head", "options"],
  function foreachMethodNoData(method) {
    Axios.prototype[method] = function (url, config) {
      this.request(
        merge(config || {}, {
          method: method,
          url: url,
        })
      );
    };
  }
);

forEach(["post", "patch", "put"], function foreachMethodWithData(method) {
  Axios.prototype[method] = function (url, data, config) {
    this.request(
      merge(config || {}, {
        method: method,
        url: url,
        data: data,
      })
    );
  };
});
