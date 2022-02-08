/**
 * 根据后端返回的数组生成树结构
 *
 * const arr = [
 *  { id: 1, title: '', pid: 0 },
 *  { id: 2, title: '', pid: 1 },
 *  { id: 3, title: '', pid: 1 },
 *  { id: 4, title: '', pid: 2 },
 *  { id: 5, title: '', pid: 3 },
 *  { id: 6, title: '', pid: 4 },
 * ]
 *
 */
function generateTree(arr) {
  const result = [];
  const map = { ["0"]: { children: result } };

  for (let i = 0; i < arr.length; i++) {
    const id = arr[i].id;
    const pid = arr[i].pid;

    if (!map[id]) {
      map[id] = {
        children: [],
      };
    }

    map[id] = {
      ...arr[i],
      children: map[id].children,
    };

    if (map[pid]) {
      map[pid].children.push(map[id]);
    } else {
      map[pid] = {
        children: [map[id]],
      };
    }
  }

  return result;
}

const arr = [
  { id: 1, title: "", pid: 0 },
  { id: 2, title: "", pid: 1 },
  { id: 3, title: "", pid: 1 },
  { id: 4, title: "", pid: 2 },
  { id: 5, title: "", pid: 3 },
  { id: 6, title: "", pid: 4 },
];

console.log(generateTree(arr));
