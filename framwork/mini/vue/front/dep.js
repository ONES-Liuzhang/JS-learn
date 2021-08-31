// 处理依赖收集和派发更新的类
export default class Dep {
  constructor() {
    this.subs = [];
  }

  /** 收集watcher */
  addSub() {
    this.subs.push(Dep.target);
  }

  /** 通知所有watcher更新值 */
  notify() {
    this.subs.forEach((watcher) => {
      // TODO 要判断它是否为Watcher吗？
      watcher.update();
    });
  }
}
