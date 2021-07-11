// 使用装饰器计算函数执行时间
export function measure(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const oldVal = descriptor.value;

  descriptor.value = async function () {
    let start = Date.now();
    let result = await oldVal.apply(this, arguments);
    console.log(`${propertyKey}执行耗时${Date.now() - start}`);
    return result;
  };
}

const cacheMap = new Map();
export function enableCache(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  let oldVal = descriptor.value;

  if (typeof oldVal !== "function")
    return console.error("这是一个函数装饰器！");

  descriptor.value = async function (...args) {
    const key = propertyKey + JSON.stringify(args);

    if (!cacheMap[key]) {
      cacheMap[key] = Promise.resolve(oldVal.apply(this, args)).catch((_) => {
        cacheMap[key] = null;
      });
    }
  };
}
