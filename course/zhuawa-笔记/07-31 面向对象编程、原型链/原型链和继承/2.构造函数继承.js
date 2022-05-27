// 2. 构造函数继承
function Parent(name) {
  this.name = name;
  this.getName = function () {
    console.log(this.name);
  };
}

function Children(id) {
  Parent.apply(this, Array.prototype.slice.call(arguments, 1));
  this.id = id;
}

let child = new Children(2, "childName");

console.log(child);
// 解决了属性共享问题&传参问题
// 缺点：
// 内存问题，构造函数的方法没有存在原型链，每次创建的实例都有不同的方法，不被共享
