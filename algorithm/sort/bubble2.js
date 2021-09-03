function bubbleSort(arr) {
  let flag = true;
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        flag = false;
      }
    }
    if (flag) return;
  }
}

a = [0, 3, 1, 2];

bubbleSort(a);

console.log(a);
