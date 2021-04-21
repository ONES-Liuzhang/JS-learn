// ts中的继承 extends
let _uid = 0;
class Animal {
  private _uid;
  constructor(public name) {
    _uid++;
    this._uid = _uid;
    console.log(`首次被创建，大家好，我是${this._uid}号： ${this.name}!`);
  }
  run() {
    console.log(`${this.name} 正在奔跑`);
  }
}

class Cat extends Animal {
  constructor(public name, private color) {
    super(name);
  }
  speak() {
    console.log(`${this.color}的猫说话了，我的名字是${this.name} ，喵喵喵！`);
  }
}

let cat = new Cat("tiger", "黑色");
cat.run();
cat.speak();
