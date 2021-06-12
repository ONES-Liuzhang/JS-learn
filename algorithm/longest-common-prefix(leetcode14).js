// 最长公共前缀
// 1.循环对比
// 时间复杂度: O(n) n为所有字符串总长度
// 空间复杂度: O(1) 使用了常量个变量
function lcPrefix1(strs) {
  if (!strs || strs.length === 0) return null;
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    let j = 0;
    while (j < prefix.length && j < strs[i].length) {
      if (prefix.charAt(j) === strs[i].charAt(j)) {
        j++;
      } else {
        break;
      }
    }
    prefix = prefix.substring(0, j);
    if (prefix === "") break;
  }
  console.log(prefix);
  return prefix;
}

lcPrefix1(["flow", "fl", "flaaa"]);
lcPrefix1(["a", "fl", "sw"]);

// 2.分而治之
// TODO 复杂度分析？
// 时间复杂度 O(s)，s 是所有字符串中字符数量的总和
// 空间复杂度 O(m*logn)，n是数组的长度，m为字符串数组中最长字符的长度
function lcPrefix2(strs) {
  // 边界条件
  if (!strs || strs.length === 0) return null;
  if (strs.length === 1) return strs[0];

  let mid = Math.floor(strs.length / 2);
  // 左闭右开区间
  let left = strs.slice(0, mid);
  let right = strs.slice(mid, strs.length);
  return lcPrefixTwo(lcPrefix2(left), lcPrefix2(right));
}

function lcPrefixTwo(left, right) {
  let j = 0;
  let prefix = "";
  while (j < left.length && j < right.length) {
    if (left.charAt(j) === right.charAt(j)) {
      j++;
    } else {
      break;
    }
    prefix = left.substring(0, j);
  }
  return prefix;
}

console.log(lcPrefix2(["flow", "fl", "flaaa"]));
console.log(lcPrefix2(["a", "fl", "sw"]));

// Trie树
// 时间复杂度 O(s+l) s为总字符串长度，l为最长字符串长度
// 空间复杂度 O(s) s为总字符串长度 用于构建Trie树
function lcPrefix3(strs) {
  let trie = new Trie();
  for (let i = 0; i < strs.length; i++) {
    trie.insert(strs[i]);
  }
  return trie.searchLongestPrefix();
}

function Trie() {
  this.root = new TrieNode("/");
}

Trie.prototype.insert = function (word) {
  let node = this.root;
  for (let i = 0; i < word.length; i++) {
    if (!node.next[word.charAt(i)]) {
      node.next[word.charAt(i)] = new TrieNode(word.charAt(i));
    }
    node = node.next[word.charAt(i)];
  }
  node.isEnd = true;
};

Trie.prototype.searchLongestPrefix = function () {
  let result = "";
  let node = this.root;
  while (node.next && !node.isEnd) {
    let keys = Object.keys(node.next);
    if (keys.length !== 1) return result;

    node = node.next[keys[0]];
    result += node.val;
  }
  return result;
};

function TrieNode(val) {
  this.val = val;
  this.next = {};
  // 标记是否为最后一个字母
  this.isEnd = false;
}

console.log(lcPrefix3(["flow", "fl", "flaaa"]));
console.log(lcPrefix3(["a", "fl", "sw"]));
