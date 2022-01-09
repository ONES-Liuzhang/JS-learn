/**
 * 以 <schema>:// 或者 // 开头
 *
 * http
 * https
 * ws
 * file
 * RFC 3986将协议名定义为一系列字符，以字母开头，后跟字母
 * 通过字母、数字、加号、句点或连字符的任意组合。
 *
 * @param {*} url
 * @returns
 */
export default function isAbsoluteURL(url) {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
}
