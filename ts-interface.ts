interface ISquareConfig {
  color?: string;
  width?: number;
  [key: string]: any;
}

function createSquare(config: ISquareConfig) {}

createSquare({ cll: "123", width: 200 });

// 函数类型 可以定义函数内的参数和返回类型
interface iFunc {
  (tag: string, data?: any, children?: boolean | undefined | null): any;
}
let func: iFunc = function () {};

// 字符串索引签名会确保所有属性与其返回值类型相匹配
interface NumberDictionary {
  [index: string]: number; // 索引字符串类型
  length: number;
  name: string; // ERROR:: 这么写是错误的 正确写法：name:number
}

// 指定索引签名为只读
interface IReadOnlyNumberArray {
  readonly [index: number]: number;
}

let roNumberArr: IReadOnlyNumberArray = [1, 2];
roNumberArr[0] = 3; // ERROR:: 索引签名是只读的

// 会检测类的公共属性 而不会检查私有属性
// implement
interface IClockInterface {
  currentTime: Date;
  setTime(date: Date): void;
}

// implement一个interface的时候 只有 instance side会被检查到
class Clock implements IClockInterface {
  currentTime: Date;
  setTime() {}
  constructor(h: number, priv: number /**私有属性 */) {}
}

// 类的静态部分 static side 和实例部分 instance side的区别
// defined a constractor
// 使用implements 只会检查instance side部分
// 如果想要实现两部分的类型检查 需要定义两个interface
// 可以创建一个工厂函数，在工厂函数传参时对class做类型检查
interface IClockConstractor {
  new (hour: number, minute: number): IClockInterface2; // static side 静态部分， 对应class的构造函数中的参数
}

interface IClockInterface2 {
  tick(): void;
}

function createClock(
  ctor: IClockConstractor,
  h: number,
  m: number
): IClockInterface2 {
  return new ctor(h, m); // 这里返回一个IClockInterface
}

class DialogClock implements IClockInterface2 {
  constructor(h: number, m: number) {}
  tick() {}
}

createClock(DialogClock, 10, 10);

//extending Interfaces
interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}

interface Square extends Shape, PenStroke {
  sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;

// Hybrid Types 混合类型 内部包含function 和object
interface ICounter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): ICounter {
  let counter = function (start: number) {
    return start + "";
  } as ICounter;
  counter.interval = 123;
  counter.reset = function () {};
  return counter;
}

// Interfaces expending classes
// Interface 只会包含class中的元素，如果class implements了其他interface，extending不会向上传递
class Control {
  private state: any;
  protected someFn() {}
}

interface ISelectableInterface extends Control {
  selected(): void;
}

class Button extends Control implements ISelectableInterface {
  selected() {}
}

// ERROR::Image2不是Control的子类 无法实现这个interface 因为Control内部包含了私有(受保护)属性
class Image2 implements ISelectableInterface {
  state: any;
  someFn() {}
  selected() {}
}
