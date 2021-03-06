// SRP - 通过解耦让每一个职责更加的独立
// 目标： 一个功能模块只做一件事
//
// sprint
// game store
class PUBGManager {
  openDialog() {
    // 弹框
    // 计算金额
    setPrice();
  }
}

const game = new PUBGManager();
game.openDialog(); // 弹框 < = > 计算金额 两个模块耦合


// 重构
// gameManager.js - 业务
class PUBGManager {
  constructor(command) {
    this.command = command;
  }
  openDialog(price) {
    // 计算金额
    this.command.setPrice(price);
  }
}

// optManager.js - 底层库
class PriceManager {
  setPrice(price) {
    // 配置金额……
  }
}

// main.js
const exe = new PriceManager();
const game = new PUBGManager(exe);
game.openDialog(15);
// game.setPrice(10); // 若需求需要直接调用可增加该模块
