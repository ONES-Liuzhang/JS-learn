interface ShopItem {
  id: string;
  title: string;
}

class Test {
  constructor(public id: string, public title: string) {
    console.log(title, id);
  }
}

let shopItem: ShopItem = { id: "1", title: "title222" };
// let t = new Test(shopItem.id, shopItem.title);

let x: [string, number];
x = ["0", 1];

// 自执行函数 -- @class
var Book = (function () {
  return function Book(id, title) {
    this.id = id;
    this.title = title;
    console.log(id);
    console.log(title);
  };
})();

var b = new Book("2", "3");
console.log(b);

// enum
enum Color {
  Red,
  Green,
}
// undefined and null is subtype of other types
let u: undefined = undefined;
let n: null = null;
let u1: any = undefined;
let u2: void = undefined;
let u3: string = undefined;

// type 和 interface的区别
interface iname {
  lastname: string;
}

//interface extends interface
interface fname extends iname {
  fullname: string;
}

//interface extends interface
interface ffname extends fname {
  ffullname: string;
}

// type extends interface
declare type name = iname & {
  firstname: string;
};

// type 和interface 的区别
// 基本类型别名 只有type可以
type Name = string;

// 联合声明
interface Dog {
  wong();
}
interface Cat {
  miao();
}
type Pet = Dog | Cat;
type PetList = [Dog, Cat]; // 具体定位每个位置的类型

// interface可以声明合并
interface User {
  name: string;
  sex: string;
}

interface User {
  id: string;
}

let user: User = {
  name: "name",
  sex: "female",
  id: "123",
};
