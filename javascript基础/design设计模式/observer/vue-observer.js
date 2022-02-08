// 观察者模式 vue双向绑定的实现
// 监听器
function observe(target) {
  if (!target || typeof target !== "object") return;
  Object.keys(target).forEach((key) => {
    defineReactive(target, key, target[key]);
  });
}

function defineReactive(obj, key, val) {
  // 递归监听，这里不需要加类型判断，observe里已经增加了判断，不是对象会直接return
  observe(val);
  let deps = new Dep();
  Object.defineProperty(obj, key, {
    // 可枚举
    enumerable: true,
    // 不允许修改该对象的属性描述符
    configurable: false,
    get() {
      if (Dep.target) {
        deps.addSub(Dep.target);
      }
      return val;
    },
    set(value) {
      // console.log(`属性${key}已经被监听, 值从${val}变为${value}`);
      if (val === value) return;
      val = value;
      // 订阅器发布消息给订阅者
      deps.notify();
    },
  });
}

// 发布者 (Vue官方文档中叫订阅器，实际干的是发布者的事)
// 对响应式对象，每个属性都有一个对应的发布者
class Dep {
  static target = null;
  constructor() {
    // 发布者建一个群
    this.deps = [];
  }
  // 添加订阅者 (把订阅者们拉进群，订阅者就是实际要做事的“人”，这个例子里是watcher实例)
  addSub(sub) {
    this.deps.push(sub);
  }
  // 通知所有订阅者 (发送群消息，通知需求更改)
  // vue里的update实际上会触发dom的更新操作（patch）
  notify() {
    for (let i = 0, j = this.deps.length; i < j; i++) {
      this.deps[i].update(); // 订阅者开始干活
    }
  }
}

// 订阅者（观察者）
class Watcher {
  constructor(vm) {
    this.vm = vm; // 绑定到vue实例，这个watcher要知道是属于哪个vue实例的(要知道得帮谁干活)
    Dep.target = this;
    // vue实例在执行更新操作的时候，会拿到在模板上使用的值，触发该值的get函数，添加wathcer
    // 可以理解为，只有在模板中被使用到的值，才会添加这个wather
    this.vm.updateComponent();
    Dep.target = null;
  }

  update() {
    console.log("watcher: 我被触发了！");
    // 这就是需要绑定vue实例的原因，要调用对应vue实例的更新方法
    this.vm.updateComponent();
  }
}

// 一个超级简化的Vue类
class VueClass {
  constructor(options) {
    this.data = options.data;
  }
  updateComponent() {
    // vue组件内部更新的时候会调用render函数，而render函数内部会拿到vm实例中的data，触发get函数
    render();
    // ...其他（DOM操作相关的其他操作）
  }
}

// 假如是这样的模板
{
  /* <template>
    <div>
        {{msg}}
    </div>
</template> */
}
let vm = new VueClass({
  data: {
    msg: "Hello World",
    other: "other data",
  },
});

// 超级简化的渲染函数
function render() {
  let msg = vm.data.msg;
  console.log(`开始渲染：发现属性 msg，值为${msg}，渲染他！`);
}

// 监听
observe(vm.data);

// 把wathcer添加到vm 并进行第一次渲染
new Watcher(vm);

// 绑定数据改变
// 改变msg（会重新触发render）
vm.data.msg = Math.random();

vm.data.other = "啊哈！";
