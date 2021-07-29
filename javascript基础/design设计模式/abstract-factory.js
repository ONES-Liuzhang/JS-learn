// 抽象工厂（每一个抽象工厂对应其生产的产品，称为产品族）
class MobilePhoneFactory {
	createOs() {
		throw new Error("不允许直接调用");
	}

	createHardWare() {
		throw new Error("不允许直接调用");
	}
}

// 具体工厂：继承自抽象工厂
class IPhoneFactory extends MobilePhoneFactory {
	createOs() {
		return new AppleOS();
	}

	createHardWare() {
		return new AppleOSHardware();
	}
}

// 抽象产品（抽象类，它不能被用于生成具体实例）
class OS {
	controlHardware() {
		throw new Error("抽象产品方法不允许直接调用！");
	}
}

class HardWare {
	operateByOrder() {
		throw new Error("抽象产品方法不允许直接调用！");
	}
}

// 具体产品（用于生成产品族里的一个具体的产品所依赖的更细粒度的产品）
class Apple extends OS {
	controlHardware() {
		console.log("以AppleOS的方式操作硬件");
	}
}

class AppleOSHardware extends HardWare {
	operateByOrder() {
		console.log("用AppleOS的方式去运转");
	}
}

let myPhone = new IPhoneFactory();

let os = myPhone.createOs();

let hardware = myPhone.createHardWare();

os.controlHardware();

hardware.operateByOrder();
