type AjaxType = "GET" | "POST" | "PUT" | "DELETE";

declare const ActiveXObject: (type: string) => void;

interface IOptions {
  url: string;
  type?: AjaxType;
  data?: any;
  timeout?: number;
}

function dataToUrlString(json) {
  const newJson = { ...json };
  // 为请求添加一个随机数，以便追踪请求
  newJson.t = Math.random() + Date.now();
  return Object.keys(newJson)
    .map((key) => `${key}=${encodeURIComponent(newJson[key])}`)
    .join("&");
}

export function MAjax(
  options: IOptions = {
    url: "",
    type: "GET",
    data: {},
    timeout: 3000,
  }
) {
  return new Promise((resolve, reject) => {
    let opt = { ...options };
    if (!opt || !opt.url) {
      return reject("请传入url！");
    }

    let xhr;
    let timer = null;

    // 兼容性处理
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = function () {
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
    };

    switch (opt.type.toUpperCase()) {
      case "GET":
        const urlStr = dataToUrlString(opt.data);
        xhr.open("get", `${opt.url}?${urlStr}`);
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
      timer = setTimeout(() => {
        // 中断当前请求
        xhr.abort();
        reject("请求超时！");
      }, opt.timeout);
    }
  });
}

MAjax({
  type: "GET",
  url: "",
})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.error(err));
