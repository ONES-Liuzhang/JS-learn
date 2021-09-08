export default {
  name: "RouterView",
  functional: true,
  render(_, { children, parent, data }) {
    // 标记router-view组件
    data.routerView = true;

    const h = parent.$createElement;
    // router.init 保证组件初次加载时 beforeCreated 记录当前route到实例对象中
    const route = parent.$route;

    let depth = 0;
    while (parent && parent._rooterRoot !== parent) {
      const vnodeData = parent.$vnode.data;
      if (vnodeData.routerView) {
        depth++;
      }
      parent = parent.$parent;
    }
    const matched = route.matched[depth];
    const component = matched && matched.components.default;

    if (!matched || !component) {
      return h();
    } else {
      return h(component, data, children);
    }
  },
};
