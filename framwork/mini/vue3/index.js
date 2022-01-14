import { isArray } from "core-js/core/array";
import { isPlainObject, isString } from "../../../utils";
import { ShapeFlags } from "./share/shapeFlag";
import { isVNode } from "./share/utils";

let uid = 0;

/**
 * 创建一个上下文
 */
function createAppContext() {
  return {
    app: null,
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null), // ？ 为啥
  };
}

/**
 * 创建一个 app
 *
 * createApp(App).mount()
 */
export function createApp(rootComponent, rootProps) {
  const context = createAppContext();
  const installedPlugin = new Set();

  const app = {
    _uid: uid++,
    _context: context,

    /** api */
    use(plugin, ...options) {
      if (installedPlugin.has(plugin)) {
        console.warn("重复注册 ", plugin);
      } else {
        plugin.install(app, ...options);
      }
      return app;
    },
    mixin(mixin) {
      context.mixins.push(mixin);
      return app;
    },
    component(name, component) {
      const components = context.components;
      if (components[name]) {
        console.warn("componrnt 重复注册 ", name);
      } else {
        components[name] = component;
      }
      return app;
    },
    directive(directive) {},
    provide() {},
    extend(options) {},

    mount(rootContainer) {
      const el =
        typeof rootContainer === "string"
          ? document.querySelector(rootContainer)
          : rootContainer;

      // vnode 入口
      const vnode = createVNode(rootComponent, rootProps);

      vnode.appContext = context;

      render(vnode, el);

      app._container = el;
    },
  };

  return app;
}

function createVNode(type, props, children) {
  const shapeFlag = isString(type)
    ? ShapeFlags.ELEMENT
    : isFunction(type)
    ? ShapeFlags.FUNCTIONAL_COMPONENT
    : isPlainObject(type)
    ? ShapeFlags.STATEFUL_COMPONENT
    : 0;

  const vnode = {
    __v_VNode: true,
    type,
    props,
    shapeFlag: shapeFlag,
    component: component,
    children: null,
  };

  normalizeChildren(vnode, children);

  return vnode;
}

/**
 * 格式化 children
 *
 * <Parent>
 *    哈哈哈哈
 *    <div></div>
 *    <Children></Children>
 * </Parent>
 *
 *       👇
 *
 * h(Parent, [
 *    "哈哈哈哈"
 *    h("div"),
 *    h(Children)
 * ])
 *
 * TODO 打平 children
 */
function normalizeChildren(vnode, children) {
  if (!children) return;
  children.forEach((child) => {
    if (isString(child)) {
      child = createTextNode(child);
    } else if (isArray(children)) {
    }
  });
}
