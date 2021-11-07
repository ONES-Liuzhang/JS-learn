// 二叉搜索树的插入
function insertIntoBST(tree, val) {
  if (!tree) {
    return new Node(val);
  }

  if (tree.val < val) {
    tree.right = insert(tree.right, val);
  } else {
    tree.left = insert(tree.left, val);
  }

  return tree;
}

function Node(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}
