// 删除二叉搜索树的某一项
function deleteFromBST(tree, val) {
  if (!tree) return null;

  if (tree.val < val) {
    tree.right = deleteFromBST(tree.right, val);
  } else if (tree.val > val) {
    tree.left = deleteFromBST(tree.left, val);
  } else {
    if (!tree.left && !tree.right) {
      return null;
    } else if (!tree.left && tree.right) {
      let min = findMin(tree.right);
      tree.val = min;
      tree.right = deleteFromBST(tree.right, min);
    } else {
      let max = findMax(tree.left);
      tree.val = max;
      tree.left = deleteFromBST(tree.left, max);
    }
  }
  return tree;

  function findMin(tree) {
    while (tree.left) {
      tree = tree.left;
    }
    return tree.val;
  }
  function findMax(tree) {
    while (tree.right) {
      tree = tree.right;
    }
    return tree.val;
  }
}
