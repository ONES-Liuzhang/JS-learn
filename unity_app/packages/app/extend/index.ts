/* eslint-disable consistent-this */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undefined */
/* eslint-disable no-extend-native */
interface Number {
  numberFormat(c ? : number): string

  moneyFormat(c ? : number): string
}
interface String {
  phoneFormat(): string
  cardFormat(): string
}
Number.prototype.numberFormat = function (c) {
  // let self = this as number
  if (!this && this !== 0) return ''

  if (c === undefined) c = 2
  return this.toFixed(c)
}

Number.prototype.moneyFormat = function (c) {
  if (!this && this !== 0) return ''
  if (c === undefined) c = 2
  let str = this.toFixed(c)
  let parts = str.split('.');
  parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  return parts.join('.')
}

String.prototype.phoneFormat = function () {
  let str = this.toString().replace(/ /g, '');
  let len = str.length;
  if (len > 11) {
    return str.substr(0, 3) + ' ' + str.substr(3, 4) + ' ' + str.substr(7, 4);
  } else if (len > 7) {
    return str.substr(0, 3) + ' ' + str.substr(3, 4) + ' ' + str.substr(7);
  } else if (len > 3) {
    return str.substr(0, 3) + ' ' + str.substr(3);
  }
  return str
}
String.prototype.cardFormat = function () {
  let str = this.toString().replace(/ /g, '');
  return str.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
}

// function getSessionId() {
//   let c_name = 'JSESSIONID=';
//   if (document.cookie.length > 0) {
//     let c_start = document.cookie.indexOf(c_name)
//     if (c_start !== -1) {
//       c_start = c_start + c_name.length + 1
//       let c_end = document.cookie.indexOf(";", c_start)
//       if (c_end == -1) c_end = document.cookie.length
//       return unescape(document.cookie.substring(c_start, c_end));
//     }
//   } else {
//     const JSESSIONID = $("#mySession").val();
//     return JSESSIONID;
//   }
// }
// const sessionId = getSessionId();
