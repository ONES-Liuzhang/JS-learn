/**
 * 20个任务并行
 *
 * 队列中最多一次只能执行10个任务
 */
class Parallel {
  constructor(tasks = [], limit = 10) {
    this.limit = limit;
    this.pool = [];
    this.count = 0;

    tasks.forEach((task) => {
      this.add(task);
    });
  }

  add(task) {
    this.count++;
    this.pool.push(task);
    this.run();
  }

  run() {
    if (this.count < this.limit && this.pool.length > 0) {
      const task = this.pool.shift();
      task().finally(() => {
        this.count--;
        this.run();
      });
    }
  }
}
