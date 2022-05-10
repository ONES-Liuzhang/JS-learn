function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}
var buildTree = function (preorder, inorder) {
  return buildTreeCore(0, preorder.length, 0, inorder.length);

  function buildTreeCore(p1, p2, i1, i2) {
    if (p1 >= p2) return null;

    const rootVal = preorder[p1];
    const idx = inorder.indexOf(rootVal);
    const leftCount = idx - i1;
    const root = new TreeNode(rootVal);

    root.left = buildTreeCore(p1 + 1, p1 + leftCount + 1, i1, idx);
    root.right = buildTreeCore(p1 + leftCount + 1, p2, idx + 1, i2);

    return root;
  }
};

buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]);
