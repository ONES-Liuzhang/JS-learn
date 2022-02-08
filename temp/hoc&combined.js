// hoc 高阶组件的形式是这样的
function Hoc(config) {
  return function ComponentWrapper(Component) {
    // xxxx 抽离出来的公共逻辑 最终返回一个组件
    return <Component />;
  };
}

// vue3 举例
function HocStore(config) {
  return function ComponentWrapper(Component) {
    const store = {
      type: config.storeType,
    };

    // vue3 有状态组件
    return {
      setup(props) {
        // xxxx 抽离出来的公共逻辑
        return <Component {...props} store={store} />;
      },
    };
  };
}

// 来个组件
const Comp = {
  setup() {
    return <div>组件内部</div>;
  },
};

const HocComponent = HocStore({ storeType: "storeType" })(Comp);

// combined api: 可以使用组合式 api 处理吗
// 分析：
