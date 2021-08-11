// 兼容浏览器的style前缀
export default function prefixStyle(prop = "") {
  const ucProp = prop.charAt(0).toUpperCase + prop.substr(1);
  const transformName = {
    webkit: `webkit${ucProp}`,
    Moz: `Moz${ucProp}`,
    O: `O${ucProp}`,
    ms: `ms${ucProp}`,
    standard: prop,
  };
  Object.keys(transformName).forEach((key) => {});
}
