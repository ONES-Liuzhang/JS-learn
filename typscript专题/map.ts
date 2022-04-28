function map<T, U>(arr: T[], fn: (t?: T, idx?: number) => U): U[] {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(fn(arr[i], i));
  }

  return result;
}
