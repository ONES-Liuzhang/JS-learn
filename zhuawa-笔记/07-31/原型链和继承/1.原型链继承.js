// 1. 原型链继承
function Parent() {
  this.name = [];
}

Parent.prototype.getName = function () {
  console.log(this.name);
};

function Children() {}

// Children.prototype.__proto__ = Parent.prototype 构造了原型链
Children.prototype = new Parent();
Children.prototype.Constructor = Children;

let child1 = new Children();
let child2 = new Children();
child1.getName();
child2.name.push("b");
child1.getName();
// 缺点
// 1.无法传参
// 2.子类共用了父类的属性，如果属性是引用类型，一旦子类改变了该属性，所有实例都会受到影响
