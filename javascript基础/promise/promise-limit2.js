// 1.构建一个队列
class PromiseQueue {
  constructor(limit) {
    this.limit = limit;
    this.count = 0;
    this.queue = [];
  }

  add(fn) {
    this.queue.push(fn);
    this.run();
  }

  run() {
    if (this.count < this.limit && this.queue.length > 0) {
      const fn = this.queue.shift();
      this.count++;
      fn().finally(() => {
        this.completeOne();
      });
    }
  }

  completeOne() {
    this.count--;
    this.run();
  }
}

let queue = new PromiseQueue(3);

// 测试
const list = [
  {
    info: "list1",
    timeout: 1000,
  },
  {
    info: "list2",
    timeout: 800,
  },
  {
    info: "list3",
    timeout: 1200,
  },
  {
    info: "list4",
    timeout: 3000,
  },
  {
    info: "list5",
    timeout: 2000,
  },
  {
    info: "list6",
    timeout: 1000,
  },
  {
    info: "list7",
    timeout: 1000,
  },
];

function handler(obj) {
  return () =>
    new Promise((resolve) => {
      console.log(obj.info, "-- start！");
      setTimeout(() => {
        resolve(obj);
      }, obj.timeout);
    }).then((res) => {
      console.log(res.info, "  ok!");
    });
}

list.forEach((l) => {
  queue.add(handler(l));
});
