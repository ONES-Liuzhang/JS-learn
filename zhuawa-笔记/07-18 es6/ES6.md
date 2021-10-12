# 0718 ES6 规范

## const

1. 块级作用域
   ES5 语法只有函数作用域

```js
if (sth) {
  var a = 1;
  const b = 2;
}

console.log(a); // 1
console.log(b); // ReferenceError
```

2. const 禁止重复声明赋值（报错的情况有哪些）
   Const 可以定义一个常量，禁止重复声明赋值
   报错：

- 重新赋值 TypeError: Assignment to constant variable.
- 重新声明 SyntaxError: Identifier 'value' has already been declared.
- 未声明先使用 ReferenceError: Cannot access 'c' before initialization. 禁止访问
- 声明时未赋值 SyntaxError: Missing initializer in const declaration

```js
// ES6中的常量
const value = '1'

// ES5中 如何定义一个常量
Object.defineProperty(window, 'STATIC_VALUE', {
	value: '123',
	writable: false
})

// *改变ES6和ES5的常量，会报错吗？*

// ES5 *重新赋值 不会报错 *重新声明 也不会报错
STATIC_VALUE = '2'
var STATIC_VALUE = '2'
console.log(STATIC_VALUE) // '123' 值不会被改变

// ES6 *重新赋值 报错！！！TypeError: Assignment to constant variable.
value = '2'
console.log(value) // '1' 值不会被改变
// ES6 *重新声明 报错！！！SyntaxError: Identifier 'value' has already been declared.
const value = '2'

const value2 // SyntaxError: Missing initializer in const declaration
```

3. const 不会变量提升

```js
console.log(a); // undefined var会变量提升
var a = 1;

console.log(b); // ReferenceError 会报错
const b = 1;
```

4. window 拒绝
   const 定义的变量不会挂载到 window 上

```js
var a = 1;
console.log(window.a); // 1

const b = 2;
console.log(window.b); // undefined
```

5. dead zone 暂时性死区
   - 需要块级作用域
   - 如果没有声明就使用了 就会出现 dead zone

```js
if (sth) {
  console.log(b); // ReferenceError: Cannot access 'b' before initialization
  const b = 1;
}
```

6. Const 声明的常量是不是完全无法修改？
   答案：否

- 如果 const 声明的是基础数据类型(string, number, undefined, null, boolean)，则无法被改变
- 如果声明的是引用数据类型(object, array)，是可以修改它内部属性的，因为修改属性时并没有改变其值(指针)

```js
// 引用类型的内部属性无法被常量化
const obj = {
  a: "1",
  b: "2",
};

obj.a = "a";
obj.b = "b";
```

\*如果想让对象变得不可修改，要怎么做？

```js
Object.freeze(obj);

// *冻结之后再修改内部属性值，会生效吗？ 会报错吗？
// 不会生效，不会报错， 如果想要报错，自己手动遍历属性
obj.a = "a";
console.log(obj.a); // '1'
```

\*如果对象是一个复合对象，freeze 会生效吗.
不会，freeze 只会冻结一层(浅冻结)
深冻结(递归实现)：

```js
// 原生freeze 改变内部属性时 不会报错
function deepFreeze(obj = {}) {
  Object.freeze(obj);
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object") {
      deepFreeze(obj[key]);
    }
  });
}

// 手写freeze函数 可添加报错信息
function deepFreeze2(obj = {}) {
  const keys = Object.keys(obj);
  keys.forEach((key) => {
    freeze(obj, key, obj[key]);
  });
}

function freeze(obj, key, value) {
  if (typeof obj[key] === "object") {
    deepFreeze2(obj[key]);
  }
  Object.defineProperty(obj, key, {
    get() {
      return value;
    },
    set() {
      console.error(`不允许修改${key}`);
    },
  });
}
```

## let

和 const 的区别是 它声明的是一个变量，而不是常量

## 箭头函数

### this 指向 需要注意的场景

1. DOM 事件绑定

```js
const el = document.createElement("button");
el.addEventListener("hover", function () {
  this.style.width = "100%";
});

// 箭头函数没有自己的this
el.addEventListener("hover", () => {
  console.log(this); // window
  this.style.width = "100%";
});
```

2. 对象方法

```js
const obj = {
  height: 50,
  width: 100,
  getHeight: function () {
    return this.height;
  },
  getWidth: () => this.width,
};

obj.getHeight(); // 50
obj.getWidth(); // undefined
```

### 没有 arguments

```js
const test = function () {
  return [].reduce.call(arguments, (pre, cur) => pre + cur, 0);
};

// 没有arguments属性
const test2 = () => {
  return [].reduce.call(arguments, (pre, cur) => pre + cur, 0);
};
```

### 不能当构造函数，不能创建原型方法

```js
// ES5中的构造函数
function Father() {
  this.height = 180;
}

Father.prototype.getHeight = function () {
  return this.height;
};

// ES6 不能这么写
const Father = () => {
  this.height = 180;
};

new Father(); // TypeError: Father is not a constructor

Father.prototype.getHeight = () => {
  // 会报错，因为Father.prototype === undefined
  return this.height;
};
```

## class

### 构造函数

```js
// ES5
function Animal() {
  // 成员变量
  this.name = "pig";
}
// 原型方法
Animal.prototype.run = function () {
  console.log("run !");
};

// ES6
class Animal {
  constructor() {
    this.name = "pig";
  }
  run() {
    console.log("run !");
  }
}
```

### ES5 实现 ES6 中 class

一个自执行函数

```js
const Animal = (function () {
  function Animal() {
    this.name = "pig";
  }
  return Animal;
})();
```

### 继承

```js
// ES5中的继承
function Animal(name) {
  // 成员变量
  this.name = name;
}
// 原型方法
Animal.prototype.run = function () {
  console.log("run !");
};

function Pig(name) {
  Animal.call(this, name);
  this.weight = 200;
}
Pig.prototype = Object.create(Animal.prototype);
// or
Object.setPrototypeOf(Pig.prototype, Animal.prototype);

Pig.prototype.say = function () {
  console.log("hengheng !");
};

Pig.prototype.constructor = Pig;

// ES6中的继承
class Animal {
  constructor(name) {
    this.name = name;
  }
  run() {
    console.log("run !");
  }
}

class Pig extends Animal {
  constructor(name, weight) {
    super(name);
    this.weight = weight;
  }
  say() {
    console.log("hengheng !");
  }
}

new Pig("aa", 222);
```

### 如何声明只读成员变量 get/set

```js
class Animal {
  constructor(name) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
}

const animal = new Animal("ss");
animal.name = 222; // 无法改变 不会报错
```

### js 中怎么创建私有属性

1. 闭包

```js
class Animal {
  constructor(name) {
    this._name = name;
    let _weight = 200;
    // 在constructor中定义一个局部变量，内部通过闭包暴露该变量
    this.getWeight = () => _weight;
  }
  get name() {
    return this._name;
  }
}
```

2. ES6 中的 # 号

```js
class Animal {
	#weight = 200
	constructor(name) {
		this._name = name
	}
	get name() {
		return this._name
	}
	get weight() {
		return #weight
	}
}
```

### 静态方法

```js
class Animal {
  constructor(name) {
    this._name = name;
  }
  static call() {}
}
```
