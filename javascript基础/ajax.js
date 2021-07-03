"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
exports.__esModule = true;
exports.MAjax = void 0;
function dataToUrlString(json) {
  var newJson = __assign({}, json);
  // 为请求添加一个随机数，以便追踪请求
  newJson.t = Math.random() + Date.now();
  return Object.keys(newJson)
    .map(function (key) {
      return key + "=" + encodeURIComponent(newJson[key]);
    })
    .join("&");
}
function MAjax(options) {
  if (options === void 0) {
    options = {
      url: "",
      type: "GET",
      data: {},
      timeout: 3000,
    };
  }
  return new Promise(function (resolve, reject) {
    var opt = __assign({}, options);
    if (!opt || !opt.url) {
      return reject("请传入url！");
    }
    var xhr;
    var timer = null;
    // 兼容性处理
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    switch (opt.type.toUpperCase()) {
      case "GET":
        var urlStr = dataToUrlString(opt.data);
        xhr.open("get", opt.url + "?" + urlStr);
        xhr.onreadystatechange = onreadystatechange;
        xhr.send(null);
        break;
      case "POST":
        xhr.open("post", opt.url);
        xhr.setRequestHeader(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );
        xhr.onreadystatechange = onreadystatechange;
        xhr.send(opt.data);
        break;
    }
    if (opt.timeout) {
      timer = setTimeout(function () {
        // 中断当前请求
        xhr.abort();
        reject("请求超时！");
      }, opt.timeout);
    }
    function onreadystatechange() {
      // 或者使用xhr.timeout = opt.timeout来设置时间 通过try/catch来捕获超时异常
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      if (xhr.readyState === 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          resolve(xhr.responseText);
        } else {
          reject("请求失败: " + xhr.status);
        }
      }
    }
  });
}
exports.MAjax = MAjax;
MAjax({
  type: "GET",
  url: "https://cn.bing.com/search?q=typescript+tsc&qs=n&form=QBRE&scope=web&sp=-1&pq=typescript+t&sc=8-12&sk=&cvid=6B12200E788140C1BBCF851B8626F79B",
})
  .then(function (res) {
    console.log(res);
  })
  ["catch"](function (err) {
    return console.error(err);
  });
