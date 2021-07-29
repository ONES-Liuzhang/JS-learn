a = [1, 2, 3, [4, 5, 6]];

b = Array.prototype.concat.apply([], a);
console.log(b);

b = [].concat(a);
console.log(b);

b = [].concat(...a);
console.log(b);
