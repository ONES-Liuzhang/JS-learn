function fn(name) {
  this.a = name;
}

let obj = new fn();

console.log(obj);

function newObj() {
  let obj = {};
  // 拿到参数
  const FactoryConstructor = [].shift.call(arguments);
  // 原型对象的连接 或者
  // obj.__proto__ = FactoryConstructor.prototype;
  Object.setPrototypeOf(obj, FactoryConstructor.prototype);
  let result = FactoryConstructor.apply(obj, arguments);

  if (!result || typeof result !== "object") return obj;
  else return result;
}

let obj2 = new newObj(fn, "llzzz");

console.log(obj2);

console.log(obj2 instanceof fn);
