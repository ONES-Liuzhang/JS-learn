const baseSize = 14;
const html = document.documentElement;

let htmlFontSize = baseSize;

!(function () {
  function onResize() {
    const htmlWidth = html.clientWidth;
    htmlFontSize = (htmlWidth / 1440) * 14;
    htmlFontSize = Math.max(Math.min(htmlFontSize, 14), 18);
    html.style.fontSize = htmlFontSize + "px";
  }

  if (window) {
    onResize();
    window.addEventListener("resize", onResize);
  }
})();

// 14px -> 1rem
// 会跟着屏幕缩放等比例适配
export function toRem(px) {
  return `${px / baseSize}rem`;
}

// 14px -> ?rem
// 对应的rem会改变，但是最终的逻辑像素不会变
// 无论设备大小如何改变，字体大小都不会改变
export function toCurrentRem(px) {
  return `${px / htmlFontSize}rem`;
}
