class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (this.events[event]) {
      this.events[event].push(callback);
    } else {
      this.events[event] = [callback];
    }
    return this;
  }

  emit(event, ...args) {
    const cbs = this.events[event];
    for (let i = 0; i < cbs.length; i++) {
      cbs[i].apply(this, args);
    }
    return this;
  }

  once(event, callback) {
    const func = (...args) => {
      this.off(event, func);
      callback.apply(this, args);
    };
    this.on(event, func);
    return this;
  }

  off(event, callback) {
    const events = this.events[event];
    if (!events) return this;
    this.events[event] = events.filter((e) => e !== callback);
  }
}

const ev = new MyEventEmitter();

ev.on("data", (data) => {
  console.log(data);
}).on("data", (data) => {
  console.log("2" + data);
});

ev.once("onceEvent", (data) => {
  console.log("once " + data);
});

ev.emit("data", "aa");
ev.emit("onceEvent", "bb");
ev.emit("onceEvent", "bb");
ev.emit("onceEvent", "bb");
