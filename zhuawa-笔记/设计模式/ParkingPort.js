/**
 * 某停车场， 分三层，每层100车位，每个车位都能监控到车辆的驶入和离开
 *
 * 车辆进入前，显示每层的空余车位数量
 * 车辆进入时，摄像头可识别车牌号和时间 - 注册车辆
 * 车辆离开时，出口显示器显示车牌号和停留时长
 *
 *
 */

const isPlainObject = (obj) =>
  Object.prototype.toString.call(obj) === "[object Object]";
const isArray = (arr) => Array.isArray(arr);

class PortManager {
  constructor() {
    this.portPlugins = new Set();
    this.port = null;
  }
  use(plugin) {
    const { insert } = plugin;
    if (!insert || typeof insert !== "function") {
      throw new TypeError("参数类型错误！");
    }

    this.portPlugins.add(plugin);
  }

  // 创建停车场实例
  getPortInstance() {
    if (this.port) {
      return this.port;
    }
    const port = new Port();
    this.portPlugins.forEach((plugin) => {
      // 插件挂载到 port 上
      plugin.insert(port);
    });
    this.port = port;
    return port;
  }
}

// 停车场
// 1.有摄像头 2.有显示器 3.有多层 4.储存所有进入的车辆信息
class Port {
  constructor() {
    this.floorList = [];
    this.carList = [];
  }

  // 注册车辆信息
  carRegister(car) {
    if (!car) return;
    this.carList.push(car);
  }

  // 注册层信息
  addFloor(floor) {
    if (!floor) return;
    floor.id = `Floor${this.floorList.length}`;
    this.floorList.push(floor);
  }
}

// 车辆信息
// 1.车牌号 2.进入停车场时间 3.离开停车场时间 4.进入车位时间 5.离开车位时间
class Car {
  constructor(licence) {
    this.licence = licence;
    this.visitTime = null;
    this.leaveTime = null;
    this.place = null;
    this.enterPlaceTime = null;
    this.leavePlaceTime = null;
  }

  visit() {
    this.visitTime = Date.now();
  }

  leave() {
    this.leaveTime = Date.now();
  }

  enterPlace(place) {
    this.enterPlaceTime = Date.now();
    this.place = place;
  }

  leavePlace() {
    this.leavePlaceTime = Date.now();
    this.place = null;
  }
}

// 显示器
class Screen {
  constructor() {
    this.port = null;
  }

  // 挂载到停车场
  insert(port) {
    if (port.screen) throw Error(`停车场已经注册了显示器了！`);
    this.port = port;
    port.screen = this;
  }

  // 显示停车场每层的剩余车位数量
  show() {
    if (!port) {
      throw new Error(`显示器还未挂载到停车场`);
    } else if (!this.port.floorList) {
      throw new Error(`停车场还没有注册层信息`);
    }

    const restPlace = [];
    // 获取停车场各个层的空闲车位
    this.port.floorList.forEach((floor) => {
      restPlace.push({
        floorId: floor.id,
        restPlace: floor.restPlace,
        restNum: floor.restPlace.length,
      });
    });
    // 显示到屏幕上
    console.log("剩余车位数量：", restPlace);
  }
}

// 摄像头
class Camera {
  constructor() {
    this.port = null;
  }

  // 挂载到停车场
  insert(port) {
    if (port.camera) throw Error(`停车场已经注册了摄像头了！`);
    this.port = port;
    port.camera = this;
  }

  // 拍摄、注册车辆信息，是个回调操作，设备识别车辆信息后调用回调函数，打开道闸，记录车辆信息
  shot(licence) {
    if (!port) {
      throw new Error(`显示器还未挂载到停车场`);
    }
    const car = new Car(licence);
    car.visit();
    this.port.carRegister(car);
  }
}

// 层
// 属于某个停车场，并且包含很多车位
class Floor {
  constructor() {
    this.id = null;
    this.placeList = [];
    this.port = null;
    this.placeId = 0;
  }

  insert(port) {
    this.port = port;
    this.port.addFloor(this);
  }

  // 获取剩余车位
  get restPlace() {
    return this.placeList.filter((place) => place.inUse === false);
  }

  // 为每一层添加车位
  addPlace(place) {
    if (!place) {
      console.log("未指定车位，新增一个");
      const place = new Place();
      this._addPlace(place);
    } else if (isPlainObject(place) && place instanceof Place) {
      this._addPlace(place);
    } else if (isArray(place)) {
      place.forEach((p) => this.addPlace(p));
    }
  }

  _addPlace(place) {
    place.floor = this;
    place.id = `Place${this.placeId++}`;
    this.placeList.push(place);
  }

  addCar(place, licence) {
    const carList = this.port.carList;
    const car = carList.find((c) => licence === c.licence);
    place.car = car;
    car.enterPlace(place);
  }
}

// 车位
// 车位有两个标识：1.层 2.位置
class Place {
  constructor() {
    this.id = null;
    this.floor = null;
    this.inUse = false;
    this.licence = null;
    this.car = null;
  }

  // 观测到车辆进入，设备会调用这个接口
  enter(licence) {
    this.inUse = true;
    this.licence = licence;
    this.floor.addCar(this, licence);
    console.log(`车辆${licence}进入车位${this.id}`);
  }

  // 观测到车辆离开，设备会调用这个接口
  leave() {
    this.inUse = false;
    this.car.leavePlace();
    this.licence = null;
    this.car = null;
    console.log(`车辆${this.licence}离开车位${this.id}`);
  }
}
