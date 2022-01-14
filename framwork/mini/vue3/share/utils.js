import { isPlainObject } from "../../../../utils";

export function isVNode(vnode) {
  return vnode && isPlainObject(vnode) && vnode.__v_VNode === true;
}
