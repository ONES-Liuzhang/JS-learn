import { createPatchFunction } from "../../core/vdom/patch";
import * as nodeOps from "./node-ops";

// nodeOps 定义DOM操作
// modules 定义了一系列钩子函数
export const patch: Function = createPatchFunction({ nodeOps, modules });
