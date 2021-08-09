// 3. 组合继承
function Parent(name) {
  this.name = name;
}

Parent.prototype.getName = function () {
  console.log(this.name);
};

function Children(name) {
  Parent.call(this, name);
}
Children.prototype = new Parent();
Children.prototype.Constructor = Children;

// 解决了属性共享问题&传参问题&内存问题
// 缺点：
// 总是会调用两次父类的构造函数
// 1. 原型链继承的时候调用
// 2. 创建子类的时候调用
