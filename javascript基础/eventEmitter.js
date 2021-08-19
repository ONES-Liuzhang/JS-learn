class EventEmitter {
  constructor() {
    this.tasks = Object.create(null);
  }
  on(event, cb) {
    let exiting = this.tasks[event];
    this.tasks[event] = exiting ? this.tasks.push(cb) : [cb];
  }
  once(event, cb) {
    const callback = (...args) => {
      this.off(event, callback);
      return cb(...args);
    };
    this.on(event, callback);
  }
  off(event, cb) {
    let exiting = this.tasks[event];
    if (!exiting) return;
    // 如果没有指定cb 移除所有event
    if (!cb) {
      this.tasks[event] = [];
    } else {
      let indx = exiting.indexOf(cb);
      indx > -1 && exiting.splice(indx, 1);
    }
  }
  emit(event, ...args) {
    this.tasks[event] && this.tasks[event].forEach((cb) => cb(...args));
  }
}

let emitter = new EventEmitter();

emitter.on("test", (name) => console.log("test " + name));

emitter.emit("test", "first");
emitter.emit("test", "second");
emitter.off("test");
emitter.emit("test", "third");

console.log("----------");
emitter.once("test once", (name) => console.log("once test " + name));

emitter.emit("test once", "first");
emitter.emit("test once", "second");
