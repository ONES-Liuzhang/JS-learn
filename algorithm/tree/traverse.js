// 二叉树各种前、中、后遍历方式 迭代法
function TreeNode(val) {
  this.left = null;
  this.right = null;
  this.val = val;
}

let tn1 = new TreeNode(1);
let tn2 = new TreeNode(2);
let tn3 = new TreeNode(3);
let tn4 = new TreeNode(4);

// [1, null, 2, 3, 4]
tn1.right = tn2;
tn2.left = tn3;
tn2.right = tn4;

// 中序遍历
var inorderTraversal = function (root) {
  if (!root) return [];
  const stack = [];
  const result = [];
  let node = root;
  while (node || stack.length) {
    // 找到最左侧的子叶子节点 init
    while (node) {
      stack.push(node);
      node = node.left;
    }
    node = stack.pop();

    result.push(node.val);

    // 找右节点
    node = node.right;
  }
  return result;
};

inorderTraversal(tn1);

// 前序遍历 中 -> 左 -> 右
var preTraversal = function (root) {
  if (!root) return [];

  const stack = [root];
  const result = [];

  while (stack.length) {
    let node = stack.pop();
    result.push(node.val);

    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }

  return result;
};

console.log(preTraversal(tn1));

/** 后序遍历 左 -> 右 -> 中 */
var backTraversal = function (root) {
  if (!root) return [];

  const stack = [root];
  const result = [];

  while (stack.length) {
    let node = stack.pop();
    result.unshift(node.val);

    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }

  return result;
};

console.log(backTraversal(tn1));
