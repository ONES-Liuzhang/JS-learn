// 给定一个字符串，逐个翻转字符串中的每个单词。
// 无空格字符构成一个单词。
// 输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。
// 如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。
// 1. 正则+Api
function reverseWord1(str) {
  return str.trim().replace(/\s+/g, " ").split(" ").reverse().join(" ");
}

console.log(reverseWord1("hello word!"));
console.log(reverseWord1(" hello  word!  "));

// 2.双端队列
// TODO ？
// 时间复杂度 O(s) s为字符串长度
// 空间复杂度 O(n) n为str里的单词数量
function reverseWord2(str) {
  let left = 0;
  let right = 0;
  let queue = [];
  while (left < str.length) {
    while (left < str.length && str.charAt(left) === " ") {
      left++;
      right = left;
    }
    while (right < str.length && str.charAt(right) !== " ") right++;
    if (str.charAt(left) !== "") {
      queue.unshift(str.substring(left, right));
    }
    left = right;
  }
  return queue.join(" ");
}

// console.log(reverseWord2("hello word!"));
console.log(reverseWord2(" hello  word!  "));
