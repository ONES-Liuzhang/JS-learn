import { isDef } from "../../util";

const hooks = ["create", "activate", "update", "remove", "destroy"];

export function createPatchFunction(backend) {
  let i, j;
  let cbs = {};
  const { nodeOps, modules } = backend;
  for (i = 0; i < hooks.length; ++i) {
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  // ... many code

  return function patch(oldVnode, vnode, hydrating, removeOnly) {};
}
