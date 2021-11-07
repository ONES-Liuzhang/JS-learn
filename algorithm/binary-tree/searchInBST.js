// 查
function search(tree, val) {
  if (!tree) return false;

  const currVal = tree.value;
  if (currVal === val) {
    return true;
  } else if (currVal < val) {
    return search(tree.right, val);
  } else {
    return search(tree.left, val);
  }
}
