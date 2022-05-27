const refValue = ref(0); // 包装基本值为一个类，14~29行

effect(fuction fn() { // 命名为 fn ，便于追踪下文
  console.log(refValue.value) // 触发 refValue 的 getter 转到 20行
});

/*这里模拟一个用户的动作*/ refValue.value++  // 触发 refValue 的 setter 转到 26 行

/****************** 上面为研发者写的代码，按照顺序执行 ******************/
// 两行代码背后的逻辑：
{
  let activeEffect;
  
  function ref(init) {
    class RefImpl {
      constructor(init) {
        this._value = init
      }
      get value() {
        trackRefValue(this); // 32~35 行依赖收集
        return this._value;
      }
      
      set value(newVal) {
        this._value = newVal;
        triggerRefValue(this); // 38~41 行执行之前收集的依赖
      }
    }
    return new RefImpl(init)
  }
  function trackRefValue(refValue) {
    if (!refValue.dep) {
      refValue.dep = new Set()
    }
    refValue.dep.add(activeEffect) // activeEffect 的值在 46 行首次得到，其中包含 fn，至此，初始化直到 mounted 阶段完成，请回到第7行
  }
  
  function triggerRefValue(refValue) {
    // 最终 refValue.dep 内引用了 fn
    // effect 链路 activeEffect -> run -> fn，所以这儿等于又调用了 fn，响应完毕
    [...refValue.dep].forEach(effect => effect.run())
  }

  function effect(fn) {
    // activeEffect.run 内调用了 fn;
    activeEffect = new ReactiveEffect(fn) // ReactiveEffect 见源码，这里简单用 activeEffect 指代，真实的场景在实例内部发生

    fn();// fn 执行，转到第 4 行
  }
}

// 极简实现
class ReactiveEffect {
  constructor(fn) {
    this.fn = fn
  }
  run(){
    this.fn()
  }
}