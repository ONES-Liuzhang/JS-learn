# node.js 事件循环模型

## 什么是事件循环

事件循环使 Node.js 可以通过将操作**转移到系统内核中**来执行非阻塞 I/O 操作（尽管 JavaScript 是单线程的）。

由于大多数现代内核都是多线程的，因此它们可以处理在后台执行的多个操作。 当这些操作之一完成时，内核会告诉 Node.js，以便可以将适当的回调添加到轮询队列中以最终执行。

我是这么理解的：  
比如文件读取时 `fs.readFile('xxx.txt', cb)`，Nodejs 是单线程的，为了保证读取操作不会阻塞进程，于是它将读取文件的操作交给系统内核（多线程）去处理，当系统内核处理完之后，会通知 Nodejs 将`cb`加入到轮询队列，进入 Nodejs 的事件循环进行处理。

Node.js 启动时，它将初始化事件循环，处理提供的输入脚本（主脚本）,执行输入脚本时，下面这些操作的回调函数都会被放入到事件循环中以一定的规则执行，这种处理各个回调函数的规则就是我们需要学习的**事件循环**：

1. 调用异步 API
   比如 `fs.readFile('xx.txt', cb)`

2. 使用计时器

   - setTimeout
   - setImmidiate

3. 使用 process.nextTick

```
   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
```

1.每个阶段都有一个 FIFO 队列来储存回调  
2.每个阶段都有自己特定的处理逻辑，比如 poll 阶段在某些情况下会阻塞  
3.阶段结束条件：清空 FIFO 队列 或者 执行回调数量达到设置的最大值  
4.阶段结束后，事件循环移至下一个阶段，依此类推

## 各阶段概览

1. timers：此阶段执行由 setTimeout 和 setInterval 设置的回调。
2. pending callbacks：执行推迟到下一个循环迭代的 I/O 回调。
3. idle, prepare, ：仅在内部使用。
4. poll：取出新完成的 I/O 事件；执行与 I/O 相关的回调（除了关闭回调，计时器调度的回调和 setImmediate 之外，几乎所有这些回调） 适当时，node 将在此处阻塞。
5. check：在这里调用 setImmediate 回调。
6. close callbacks：一些关闭回调，例如 socket.on('close', ...)。

在每次事件循环运行之间，Node.js 会检查它是否正在等待任何异步 I/O 或 timers，如果没有，则将其干净地关闭。

## 各阶段详细解析

### timers 计时器阶段

计时器可以在回调后面指定时间阈值，但这不是我们希望其执行的确切时间。 计时器回调将在经过指定的时间后尽早运行。 但是，操作系统调度或其他回调的运行可能会延迟它们。-- 执行的实际时间不确定

```js
const fs = require("fs");

function someAsyncOperation(callback) {
  // Assume this takes 95ms to complete
  fs.readFile("/path/to/file", callback);
}

const timeoutScheduled = Date.now();

setTimeout(() => {
  const delay = Date.now() - timeoutScheduled;

  console.log(`${delay}ms have passed since I was scheduled`);
}, 100);

// do someAsyncOperation which takes 95 ms to complete
someAsyncOperation(() => {
  const startCallback = Date.now();

  // do something that will take 10ms...
  while (Date.now() - startCallback < 10) {
    // do nothing
  }
});
```

当事件循环进入 poll 阶段时，它有一个空队列（fs.readFile 尚未完成），因此它将等待直到达到最快的计时器 timer 阈值为止。
等待 95 ms 过去时，fs.readFile 完成读取文件，并将需要 10ms 完成的其回调添加到轮询 (poll) 队列并执行。
回调完成后，队列中不再有回调，此时事件循环已达到最早计时器 (timer) 的阈值 (100ms)，然后返回到计时器 (timer) 阶段以执行计时器的回调。
在此示例中，您将看到计划的计时器与执行的回调之间的总延迟为 105ms。

### pending callbacks 阶段

此阶段执行某些系统操作的回调，例如 TCP 错误。 平时无需关注

### 轮询 poll 阶段（重要）

轮询阶段具有两个主要功能：

1. 计算应该为 I/O 阻塞和轮询的时间
2. 处理轮询队列 (poll queue) 中的事件

事件循环进入轮询（poll）阶段时：

1. 轮询队列不为空，则同步执行轮询阶段的回调队列，直到清空（或者达到系统硬限制，Nodejs 内存限制？）
2. 轮询队列为空时  
   2.1 如果调用了 setImmediate，则 poll 阶段结束，进入 check 阶段，执行被 setImmediate 调度的脚本  
   2.2 如果没有调用 setImmediate，则 poll 会阻塞
3. 当轮询队列为空时，会检查哪些计时器 timer 已经到时间，如果一个或多个计时器准备就绪，则事件循环会将计时器回调加入到 timer queue 队列，并会返回 timer 阶段执行这些计时器的回调。

如果在 poll 阶段清空队列的过程中，timer 计时器刚好到期，那也要等到 poll queue 队列清空后才会去 timer 阶段执行这些回调，即计时器回调加入 timer queue 后不一定马上执行，所以 setTimeout 和 setInterval 的执行的时间并不准确。

### 检查阶段 check

check 阶段对应的是被 setImmediate 调度的函数

1.如果 check 队列为空，那么轮询阶段在清空队列后会处于阻塞状态

2.如果 check 队列不为空，那么轮询阶段在清空队列后会进入 check 队列，同步执行 check queue 中的回调

setImmediate 实际上是一个特殊的计时器，它在事件循环的单独阶段运行。 它使用 libuv API，该 API 计划在轮询阶段完成后执行回调。

### close callbacks 阶段

如果套接字或句柄突然关闭（例如 socket.destroy），则在此阶段将发出 'close' 事件。 否则它将通过 process.nextTick 发出。

## setImmediate 和 setTimeout 的区别

setImmediate 和 setTimeout 相似，但是根据调用时间的不同，它们的行为也不同。

- setImmediate 设计为在当前轮询 poll 阶段完成后执行脚本。
- setTimeout 计划在以毫秒为单位的最小阈值过去之后运行脚本。

Tips: 计时器的执行顺序将根据调用它们的上下文而有所不同。 如果两者都是主模块中调用的，则时序将受到进程性能的限制.

来看两个例子：

1. 在主模块中执行

   两者的执行顺序是不固定的, 可能 timeout 在前, 也可能 immediate 在前

   ```js
   setTimeout(() => {
     console.log("timeout");
   }, 0);

   setImmediate(() => {
     console.log("immediate");
   });
   ```

2. 在同一个 I/O 回调里执行

   setImmediate 总是先执行

   ```js
   const fs = require("fs");

   fs.readFile(__filename, () => {
     setTimeout(() => {
       console.log("timeout");
     }, 0);
     setImmediate(() => {
       console.log("immediate");
     });
   });
   ```

### 问题

#### 问题一：为什么在外部 (比如主代码部分 mainline) 这两者的执行顺序不确定呢？

解答：  
主代码执行完后开始事件循环，此时是第一次循环，第一阶段从 timer 开始，由于计时器的**不确定性**，虽然延迟设置了 0ms，但可能会延迟加入队列，一旦延迟，就会错过了第一次加入队列的时机，因为不确定，所以有两种情况：

1.如果 timer 回调已经被加入到队列中，则清空 timer queue，然后再去清空 check queue，**此时 setTimeout 的回调先执行**

2.如果 timer 回调还没有被加入到队列中，此时 timer queue 为空，事件循环依次进入下一阶段，在 poll 阶段发现 check queue 不为空，直接进入 check 阶段执行回调，而此时 timer 已经被添加到队列，check 阶段结束后再回到 timer 阶段执行 setTimeout 的回调，**此时 setImmediate 的回调先执行**

#### 问题二：在 I/O 回调中调用 setImmediate 和 setTimeout 为什么顺序就确定了呢？

解答：  
I/O 回调的执行时机是在 poll 阶段，poll -> check -> timer，所以 check 阶段的 setImmediate 回调必然先执行

## process.nextTick

process.nextTick 从技术上讲不是事件循环的一部分。 相反，无论事件循环的当前阶段如何，都将在当前操作完成之后处理 nextTickQueue

### process.nextTick 和 setImmediate 的区别

- process.nextTick 在同一阶段立即触发
- setImmediate fires on the following iteration or 'tick' of the event loop (在事件循环接下来的阶段迭代中执行 - check 阶段)。

通俗点来说，就是我们常常认为的 process.nextTick 是一个微任务，而 setImmediate 是宏任务

### nextTick 在事件循环中的位置

```
           ┌───────────────────────────┐
        ┌─>│           timers          │
        │  └─────────────┬─────────────┘
        │           nextTickQueue
        │  ┌─────────────┴─────────────┐
        │  │     pending callbacks     │
        │  └─────────────┬─────────────┘
        │           nextTickQueue
        │  ┌─────────────┴─────────────┐
        |  |     idle, prepare         │
        |  └─────────────┬─────────────┘
  nextTickQueue     nextTickQueue
        |  ┌─────────────┴─────────────┐
        |  │           poll            │
        │  └─────────────┬─────────────┘
        │           nextTickQueue
        │  ┌─────────────┴─────────────┐
        │  │           check           │
        │  └─────────────┬─────────────┘
        │           nextTickQueue
        │  ┌─────────────┴─────────────┐
        └──┤       close callbacks     │
           └───────────────────────────┘
```

## Microtasks 微任务

在 Node 领域，微任务是来自以下对象的回调：

1. process.nextTick()
2. then()

在主线结束后以及事件循环的每个阶段之后，立即运行微任务回调。

resolved 的 promise.then 回调像微处理一样执行，就像 process.nextTick 一样。 虽然，如果两者都在同一个微任务队列中，则将首先执行 process.nextTick 的回调。

**优先级 process.nextTick > promise.then**

### 看代码输出顺序

```js
async function async1() {
  console.log("async1 start"); // 2
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2"); // 3
}
console.log("script start"); // 1

// 开启事件循环
setTimeout(function () {
  console.log("setTimeout0");
  setTimeout(function () {
    console.log("setTimeout1");
  }, 0);
  setImmediate(() => console.log("setImmediate"));
}, 0);

process.nextTick(() => console.log("nextTick"));
async1();
new Promise(function (resolve) {
  console.log("promise1"); // 4
  resolve();
  console.log("promise2"); // 5
}).then(function () {
  console.log("promise3");
});

process.nextTick(() => console.log("nextTick2"));

console.log("script end"); // 6
```
