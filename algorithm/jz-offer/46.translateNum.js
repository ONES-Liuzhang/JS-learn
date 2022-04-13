/**
 * @param {number} num
 * @return {number}
 */
var translateNum = function (num) {
  if (!num) return 0;
  const str = num + "";
  const len = str.length;
  if (len === 1) return 1;

  let n1 = 1;
  let n2 = checkKey(0, 1) ? 2 : 1;

  for (let i = 2; i < len; i++) {
    let temp = n2;
    n2 = n2 + (checkKey(i - 1, i) ? 1 : 0) + (checkKey(i - 2, i - 1) ? n1 : 0);
    n1 = temp;
  }

  return n2;

  // 判断是否可以把key翻译成字母，key是字符串
  function checkKey(i, j) {
    const key = str.charAt(i) + str.charAt(j);
    return key === Number(key) + "" && key < 26;
  }
};

translateNum(624);
