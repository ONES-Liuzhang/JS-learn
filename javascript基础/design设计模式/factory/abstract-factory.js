// 抽象工厂类
class Car {
  constructor() {
    this.type = "car";
  }

  getPrice() {
    return new Error("Abstract method");
  }

  getSpeed() {
    return new Error("Abstract method");
  }
}

/**
 * VehicleFactory
 * @param {*} subType
 * @param {*} superType
 */
function VehicleFactory(subType, superType) {
  if (typeof VehicleFactory[superType] === "function") {
    const fn = function () {};
    fn.prototype = new VehicleFactory[superType]();
    subType.constructor = subType;
    subType.prototype = new fn();
  }
}

VehicleFactory.Car = Car;

const BMW = function (space, speed) {
  this.space = space;
  this.speed = speed;
};

VehicleFactory(BMW, "Car");

const bmw = new BMW();

bmw.getPrice();
