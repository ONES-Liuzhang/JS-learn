const test = new Promise((resolve) => {
  setTimeout(() => resolve(111), 1000);
}).then((res) => console.log("case4-1", test));

setTimeout(() => console.log("case4-2", test), 1000);
