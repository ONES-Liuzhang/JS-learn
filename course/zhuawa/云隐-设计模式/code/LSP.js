// 里氏替换原则LSP(the Lxxxx substitution principle)
// 子类能够覆盖父类
// 父类能够出现的地方子类就能出现
//
// sprint 1
class Game {
  start() {
    // 开机逻辑
  }
  shutdown() {
    // 关机
  }
  play() {
    // 游戏
  }
}

const game = new Game();
game.play();

// sprint 2
class MobileGame extends Game {
  tombStone() {
    // tombStone
  }
  play() {
    // 移动端游戏
  }
}
const mobile = new MobileGame();
mobile.play();

// 重构
class Game {
  start() {
    // 开机逻辑
    console.log('start');
  }
  shutdown() {
    // 关机
    console.log('shutdown');
  }
}

class MobileGame extends Game {
  tombStone() {
    console.log('tombStone');
  }
  play() {
    console.log('playMobileGame');
  }
}

class PC extends Game {
  speed() {
    console.log('speed');
  }
  play() {
    console.log('playPCGAME');
  }
}
