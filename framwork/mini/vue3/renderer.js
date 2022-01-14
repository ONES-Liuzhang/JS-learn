import { ShapeFlags } from "./share/shapeFlag";

/**
 * 开始渲染 vnode 到 container
 */
export function render(vnode, container) {
  const shapeFlag = vnode.shapeFlag

  switch (shapeFlag) {
    case shapeFlag & ShapeFlags.ELEMENT:
      processElement(vnode, container)
      break;
    case shapeFlag & ShapeFlags.COMPONENT:
      break;
  }
}
