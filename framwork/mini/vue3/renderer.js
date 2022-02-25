/**
 * 创建虚拟节点
 *
 * VNode 描述 DOM
 *
 * 1.标签
 * 2.属性
 * 3.事件
 * 4.嵌套关系
 *
 * 声明式写法：
 * <div class="cls" onClick="handleClick">Hello World</div>
 *
 * {
 *    tag: "div",
 *    props: {
 *       class: ['cls', 'cls2']，
 *       style: {
 *          display: 'flex',
 *          color: 'red'
 *       },
 *       onClick: handleClick,
 *    },
 *    children: ["Hello World"]
 * }
 */
/** 渲染器 */
export function renderer(vnode, container) {
  if (typeof vnode.tag === "string") {
    mountElement(vnode, container);
  } else if (typeof vnode.tag === "object") {
    mountComponent(vnode, container);
  }
}

function mountElement(vnode, container) {
  const el = document.createElement(vnode.tag);
  const props = vnode.props;

  if (props && typeof props === "object") {
    Object.keys(props).forEach((key) => {
      if (key === "class") {
        // 处理 class，假定是个数组
        const classList = el.classList;
        classList.add.apply(classList, props[key]);
      } else if (key === "style") {
        // 处理 style，假定是个对象
        const style = props[key];
        for (const [key, val] of Object.entries(style)) {
          el.setAttribute(key, val);
        }
      } else if (/^on[A-Z]+/.test(key)) {
        // 处理事件
        const eventName = key.substring(2).toLowerCase();
        el.addEventListener(eventName, props[key]);
      } else {
        // 其他属性
        el.setAttribute(key, props[key]);
      }
    });
  }

  if (vnode.children) {
    if (typeof vnode.children === "string") {
      el.appendChild(document.createTextNode(vnode.children));
    } else if (Array.isArray(vnode.children)) {
      vnode.children.forEach((c) => {
        renderer(c, el);
      });
    }
  }

  container.appendChild(el);

  vnode.el = el;
  return el;
}

/**
 * tag 是个对象时，也就是有状态组件
 *
 * 这个对象存在 render 函数，执行后会返回一个 vnode 对象
 */
function mountComponent(vnode, container) {
  if (!vnode.render) return null;

  renderer(vnode.render(), container);
}
