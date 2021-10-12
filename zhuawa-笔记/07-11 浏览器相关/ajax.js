function ajax(options) {
  if (options === void 0) {
    options = {
      method: "GET",
      url: "",
      params: {},
      timeout: 3000,
    };
  }
  return new Promise(function (resolve, reject) {
    var xhr;
    var timer;
    // 兼容性考虑
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    var method = options.method;
    var queryStr = dataToStr(options.params);
    if (method.toUpperCase() === "GET") {
      var urlStr =
        options.url + (options.url.indexOf("?") > -1 ? "&" : "?") + queryStr;
      xhr.open("GET", urlStr);
      onReadyStateChange();
      // 如果不需要请求体，必须传递null，因为在某些浏览器中这个参数是必须的 [红皮书 P712]
      xhr.send(null);
    } else if (method.toUpperCase() === "POST") {
      xhr.open("POST", options.url);
      onReadyStateChange();
      xhr.setRequestHeader("Content-Type", "application/x-www-formurlencoded");
      xhr.send(options.params);
    }
    // 如果设置了超时
    // 利用Promise状态不可逆的特性加上setTimeout实现超时
    if (options.timeout) {
      timer = setTimeout(function () {
        xhr.abort();
        reject();
      }, options.timeout);
    }
    function onReadyStateChange() {
      xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
          // 直接return，这里不能写reject，因为请求还在继续
          return;
        }
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          resolve(xhr.responseText);
        } else {
          reject(xhr.status);
        }
      };
    }
  });
}
function dataToStr(params) {
  if (!params) return "";
  return Object.keys(params)
    .map(function (key) {
      return decodeURIComponent(key) + "=" + decodeURIComponent(params[key]);
    })
    .join("&");
}
