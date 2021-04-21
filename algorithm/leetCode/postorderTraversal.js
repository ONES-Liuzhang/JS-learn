// 后序遍历
var postorderTraversal = function (root) {
  let result = [];
  traverse(root, result);
  return result;

  function traverse(node, arr) {
    if (!node) return;
    // 前序
    traverse(node.left, arr);
    // 中序
    traverse(node.right, arr);
    // 后序
    node.val && arr.push(node.val);
  }
};

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}
let left = new TreeNode(2);
let right = new TreeNode(3);
let binaryTree = new TreeNode(1, left, right);

console.log(postorderTraversal(binaryTree));
