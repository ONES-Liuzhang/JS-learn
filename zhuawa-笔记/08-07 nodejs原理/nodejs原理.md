## ArrayBuffer 和 TypedBuffer

## Buffer

## Stream

### 可读流 Readable

### 可写流 Writable

- 上游通过 write 方法写入数据到流中
- 在\_write 中，当数据写入成功，需要调用 next 来告诉流处理下一个数据
- 上游必须调用 end 来结束可写流
- 监听 finish 事件监听到可写流的结束

### 可读可写流 Duplex

### Transform

## 数据类型

shell

可读流 push(data) data: String | Buffer， 消耗 data 的时候，都是 Buffer 类型

可写流 write(data) data: String | Buffer， \_write(data) data 是 Buffer 类型

## Event

1. 实现一个 EventBus

2. setTimeout 和 setImmediate 的区别

3. nodejs 中的微任务
4. process.nextTick() 的回调
5. Promise.then() 的回调

执行顺序 process.nextTick > Promise.then()
