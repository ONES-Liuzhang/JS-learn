// 测试一下 浏览器的 script 标签加载文件是属于宏任务吗
// 是的
function loadScript(url) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    // img 标签加载 是宏任务！
    const img = document.createElement("img");
    img.src = url;
    document.body.appendChild(img);
    img.onload = function () {
      document.body.removeChild(img);
      resolve(`图片加载完毕!用时 - ${Date.now - startTime} ms`);
    };
  });
}

function handleResolve(res) {
  console.log(res);
}

const p1 = Promise.resolve("p1").then((res) => res);
const p2 = Promise.resolve("p2").then((res) => res);
const p3 = Promise.resolve("p3").then((res) => res);
const p4 = Promise.resolve("p4").then((res) => res);

const p5 = loadScript(
  "https://img95.699pic.com/photo/50046/5562.jpg_wh300.jpg"
);

let isStart = false;
let promises = [];
let startTime = Date.now();

function reroute() {
  if (isStart) {
    return performAppChanges();
  } else {
    return loadApp();
  }
}

function registerApp(app) {
  promises.push(app);

  reroute();
}

function start() {
  isStart = true;

  reroute();
}

function performAppChanges() {
  return Promise.resolve().then(() => {
    return Promise.all([p1]).then(() => {
      console.log(
        `performAppChanges complate! 当前时间 ${Date.now() - startTime}`
      );
      startTime = Date.now();
    });
  });
}

function loadApp() {
  return Promise.resolve().then(() => {
    return Promise.all(promises).then(() => {
      console.log(`load app complate! 当前时间 ${Date.now() - startTime}`);
      startTime = Date.now();
    });
  });
}

registerApp(p1);
registerApp(p2);
registerApp(p3);
registerApp(p4);
registerApp(p4);
registerApp(p4);
start();
