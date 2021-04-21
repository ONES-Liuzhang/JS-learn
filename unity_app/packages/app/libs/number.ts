// 数字工具类

/*

Number.EPSILON  // 机器精度  2^-52 
Number.MIN_VALUE  // 最大的浮点数  5e324
Number.MAX_VALUE  // 最小的浮点数 5e-324
Number.MAX_SAFE_INTEGER  // 最大的安全整数  2^53 -1 
Number.MIN_SAFE_INTEGER  // 最小的安全整数 -(2^53 -1 )
Number.POSITIVE_INFINITY(Infinity)   //正无穷大
Number.NEGATIVE_INFINITY(-Infinity)  //负无穷大

 */


const epsilon = Number.EPSILON || Math.pow(2, -52)

// 判断数字是否相等
export function numbersCloseEnoughToEqual(n1: number, n2: number) {
  return Math.abs(n1 - n2) < epsilon
}
