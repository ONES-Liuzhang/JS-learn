export default function contains(root: any, n: any) {
  let node = n
  while (node) {
    if (node === root) {
      return true
    }
    node = node.parentNode
  }

  return false
}
