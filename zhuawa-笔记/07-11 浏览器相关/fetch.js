// fetch返回一个Promise
// response.text()
// response.json() 获取服务器返回的数据 可以通过以下方式打平数据
fetch("./ajax.js")
  .then((response) => response.text())
  .then((data) => console.log(data));

fetch("./source.json")
  .then((response) => response.json())
  .then((data) => console.log(data));

// 请求状态码 status 无论状态是多少都不会reject
// 可以根据response.status === 200 以及 response.statusText === ok来判断
// 状态文本 statusText
fetch("./ajax.js")
  .then((response) => {
    if (response.statusText === "ok") {
      // 请求成功
    } else {
      // 请求失败
    }
  })
  .catch((e) => {
    // 服务器未响应导致浏览器超时、违反CORS、无网络或者其他浏览器/网络问题才有可能导致Promise被拒绝
    console.log(e);
  });

// Cookie
// credentials
// same-origin(同源时发送cookie，默认)  omit(不发送cookie) include(无论是同源还是跨域都携带cookie)
fetch("./ajax", {
  method: "GET",
  credentials: "same-origin",
});

// 中断请求
let controller = new AbortController();

fetch("./ajax", {
  signal: controller.signal,
})
  .then((response) => response.json())
  .then((data) => console.log(data));

controller.abort();
