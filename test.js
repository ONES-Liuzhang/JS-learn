var minArray = function (numbers) {
  if (numbers.length < 2) return numbers[0];
  return binarySearch(0, numbers.length - 1);

  function binarySearch(l, r) {
    let mid = Math.floor((l + r) / 2);
    // 终止条件
    if (mid === l) {
      if (numbers[mid] > numbers[r]) return numbers[r];
      else return numbers[0];
    }

    if (numbers[mid] > numbers[r]) {
      return binarySearch(mid, r);
    } else if (numbers[mid] < numbers[r]) {
      return binarySearch(l, mid);
    }

    while (r--) {
      if (numbers[mid] > numbers[r]) return binarySearch(mid, r);
      if (mid === r) return binarySearch(l, mid);
    }
  }
};

minArray([1, 3, 5]);
