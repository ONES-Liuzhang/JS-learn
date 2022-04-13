/**
 * 替换空格
 *
 * https://leetcode-cn.com/problems/ti-huan-kong-ge-lcof/
 */
function replaceSpace(s) {
  const preLen = s.length;
  let spaceCount = 0;

  for (let i = 0; i < preLen; i++) {
    if (s.charAt(i) === " ") spaceCount++;
  }

  // 没有空格直接返回s
  if (spaceCount === 0) return s;

  const len = preLen + spaceCount * 2;
  const strList = new Array(len);

  let l = preLen - 1;
  let r = len - 1;

  while (l >= 0) {
    if (s.charAt(l) === " ") {
      strList[r--] = "0";
      strList[r--] = "2";
      strList[r--] = "%";
      l--;
    } else {
      strList[r--] = s.charAt(l--);
    }
  }
  return strList.join("");
}

console.log(replaceSpace("We are happy."));
