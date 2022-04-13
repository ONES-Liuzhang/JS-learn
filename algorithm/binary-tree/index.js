class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

export function createBinaryTree(arr) {
  if (!arr || arr.length === 0) return null;
  let len = arr.length;

  const root = new TreeNode(arr[0]);

  return root;
}
