// 3. 组合继承
function Parent(name) {
  this.name = name;
}

Parent.prototype.getName = function () {
  console.log(this.name);
};

function Children(id) {
  Parent.apply(this, Array.prototype.slice.call(arguments, 1));
  this.id = id;
}
// Children.prototype = new Parent();
// 或者
// Children.prototype = Object.create(Parent.prototype)
// 或者
// Object.setPrototypeOf(Children.prototype, Parent.prototype);
// Children.prototype.Constructor = Children;

// 或者
function inherit(C, P) {
  function _() {
    this.constructor = C;
  }
  _.prototype = P.prototype;
  C.prototype = new _();
}

inherit(Children, Parent);

let c1 = new Children(1, "22");
let c2 = new Children(1, "33");
let c3 = new Children(1, "44");

console.log(c1);
console.log(c2);
console.log(c3);
console.log(c1.prototype === c3.prototype);
console.log(c1 instanceof Children);
console.log(c1 instanceof Parent);

// 解决了属性共享问题&传参问题&内存问题
