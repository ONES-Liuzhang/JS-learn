import settle from "../core/settle";
import buildFullPath from "../core/buildFullPath";
import buildURL from "../helpers/buildURL";

/**
 * 浏览器
 *
 * 使用 XMLHttpRequest
 *
 * config: {
 *    baseURL: "string",
 *    headers: Object,
 *    data: Object,
 *    method: 'get' | 'post',
 *    url: 'string',
 *    timeout: number,  // ms
 *    timeoutErrorMessage: String, // 请求超时的错误信息
 *    params: Object,   // 请求参数，get请求有用，会拼接到url后
 *    cancelToken: // 中止请求
 *    responseType: String, // 响应类型
 *
 *    validateStatus: Function, // 验证response状态的函数
 *    paramsSerializer: Function, // 用户自定序列化函数
 *    setRequestHeader: Function, // 自定的设置 header 函数
 *
 *    withCredentials: Boolean, // 是否携带cookie
 *    xsrfCookieName: String,   // 跨站请求伪造相关
 * }
 *
 * XMLHttpRequest 对象
 * request: {
 *    onabort: null
 *    onerror: null
 *    onload: null
 *    onloadend: null
 *    onloadstart: null
 *    onprogress: null
 *    onreadystatechange: null
 *    ontimeout: null
 *
 *    readyState: 0
 *    response: ""
 *    responseText: ""
 *    responseType: ""
 *    responseURL: ""
 *    responseXML: null
 *    status: 0
 *    statusText: ""
 *    timeout: 0
 * }
 *
 * 被格式化的响应对象
 * response: {
 *    headers,    // 响应头
 *    data,       // 响应体
 *    status,     // 响应状态
 *    statusText, // 状态文字
 *    config,     // 用户配置
 *    request,
 * }
 *
 *
 * 取消请求
 *
 * class CancelToken {
 *    constructor() {
 *      this.promise = new Promise((resolve) => {
 *          this.resolve = resolve
 *       })
 *    }
 * }
 *
 * const cancelToken = new CancelToken()
 *
 * config.cancelToken = cancelToken
 *
 * 终止请求
 * cancelToken.resolve()
 *
 * 1. 返回值是一个 Promise
 */
export default function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    const requestData = config.data;
    const requestHeaders = config.headers;

    const request = new XMLHttpRequest();

    // 设置 headers
    forEach(requestHeaders, function setRequestHeader(header, name) {
      const setRequestHeader =
        config.setRequestHeader || request.setRequestHeader;
      setRequestHeader(name, header);
    });

    const fullPath = buildFullPath(config.baseURL, config.url);

    request.open(
      config.method.toUpperCase(),
      buildURL(fullPath, config.params, config.paramsSerializer),
      true
    );

    // 设置请求超时时间 ms
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function HandleLoad() {
      // request complate?
      if (!request || request.readyState !== 4) {
        return;
      }

      // 1. 请求如果出错则 request.responseURL 会为 undefined，请求会被 onerror 事件处理
      // 2. 如果请求是 file 协议，大部分浏览器会返回 status = 0 来表示请求成功
      if (
        request.status === 0 &&
        !(request.responseURL && request.responseURL.indexOf("file:") > -1)
      ) {
        return;
      }

      const responseHeader = request.getAllResponseHeaders();
      const responseData =
        !config.responseType || config.responseType === "text"
          ? request.responseText
          : request.response;
      const response = {
        headers: responseHeader,
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        config: config,
        request: request,
      };

      settle(resolve, reject, response);

      request = null;
    };

    // Handle browser request cancellation
    // 请求中断（非手动中断）
    request.onabort = function HandleAbort() {
      reject("abort");

      request = null;
    };

    // Handle low level network error
    // 低优先级网络错误
    request.onerror = function HandleError() {
      reject("Network error");

      request = null;
    };

    // Handle timeout
    request.ontimeout = function HandleTimeout() {
      let timeoutErrorMessage = "timeout of " + config.timeout + "ms exceeded";
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }

      reject(timeoutErrorMessage);

      request = null;
    };

    // 请求中断
    if (config.cancelToken) {
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) return;

        request.abort();
        reject(cancel);

        request = null;
      });
    }

    // 红宝书 P712 send() 必须接受一个参数，如果不需要请求体，则必须传 null
    if (requestData === undefined) {
      requestData = null;
    }

    // 发送请求体
    request.send(requestData);
  });
}
