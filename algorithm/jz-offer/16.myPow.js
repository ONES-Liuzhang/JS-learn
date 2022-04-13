/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 *
 * https://leetcode-cn.com/problems/shu-zhi-de-zheng-shu-ci-fang-lcof/
 */
function myPow(x, n) {
  // 特殊情况
  if (x === 0) return 0;
  if (n === 0 || x === 1) return 1;
  if (x === 0 && n < 0) {
    throw Error("不能对0求倒数");
  }

  // n小于0时要求倒数
  if (n < 0) return 1 / powerUnsigned(x, n);
  else return powerUnsigned(x, n);

  function powerUnsigned(base, exp) {
    // js二进制数字是32位有符号数字，可能出现位运算后小于0的情况
    if (exp < 0) exp = -exp;
    if (exp === 0) return 1;
    if (exp === 1) return base;

    let num = powerUnsigned(base, exp >> 1);
    num = num * num;
    if (exp & 1) {
      num = num * base;
    }
    return num;
  }
}
