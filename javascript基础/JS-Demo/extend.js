// 继承相关 vue的extends函数
function Child() {}

Child.$options = {
  name: "Child",
};
Child.super = Father;
Child.superOptions = Father.$options;

function Father() {}
Father.$options = {
  name: "Father",
};

Father.prototype.test = function test() {
  console.log("test");
};

Object.setPrototypeOf(Child.prototype, Father.prototype);

const cachedSuperOptions = Child.superOptions;
const superOptions = Father.$options;

console.log(cachedSuperOptions);
console.log(superOptions);

function extend(to, _from) {
  for (const key in _from) {
    to[key] = _from[key];
  }
}

const sharedPropertyDefinition = {
  enumerable: true,
  configable: true,
  get: Object.create(Function),
  set: Object.create(Function),
};

function proxy(target, sourceKey, key) {
  sharedPropertyDefinition.get = () => {
    return this[sourceKey][key];
  };
  sharedPropertyDefinition.set = (val) => {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

const Vue = (function () {
  return function Vue(options) {};
})();

function proxyTest1() {
  //   this.data = {
  //     key1: "",
  //     key2: "",
  //   };
}
// options=>传入的props 做代理
proxyTest1.options = {
  props: {
    p1: "",
    p2: "",
  },
  data: {
    d1: "",
    d2: "",
  },
};
// proxyTest1.prototype._props.key    => 代理到  proxyTest1.prototype.key
Object.keys(proxyTest1.options.data).forEach((key) => {
  proxy(proxyTest1.prototype, "$data", key);
});

var p = new proxyTest1();

class Father {
  constructor(name) {
    this.name = name;
  }
  say() {
    console.log("我是" + name);
  }
}

// ex6的exends
var Father = (function Father() {
  return function (name) {};
})();
