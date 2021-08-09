/**
 *
 * @param {*} children 数组
 * @param {*} func 回调
 * @param {*} context 上下文
 */
function mapChildren(children, func, context) {
  const result = [];

  mapInternal(children, result, func, context);

  return result;
}

function mapInternal(children, result, func, context) {
  // 保存引用
  const traverseContext = {
    result,
    func,
    context,
    count: 0,
  };
  traverseAllChildren(children, mapSingleChildren, traverseContext);
}

/**
 *
 * @param {*} child
 * @param {*} array 结果数组
 * @param {*} callback 回调函数
 * @return {number} 子节点的数量
 */
function traverseAllChildren(child, callback, traverseContext) {
  const childType = typeof child;
  if (!child) return 0;

  if (childType === "object" && Array.isArray(child)) {
    let subTreeCount = 0;
    for (let i = 0; i < child.length; i++) {
      subTreeCount += traverseAllChildren(child[i], callback, traverseContext);
    }
    return subTreeCount;
  } else {
    callback(child, traverseContext);
    return 1;
  }
}

/** 内部Callback*/
function mapSingleChildren(child, traverseContext) {
  const { func, context, result } = traverseContext;

  const x = func.call(context, child, traverseContext.count++);

  if (Array.isArray(x)) {
    mapInternal(x, result, (y) => y, context);
  } else {
    result.push(x);
  }
}

const result = mapChildren([1, 2, 3, [5, 6, [7, 8]]], (item) => [item]);
console.log(result);
