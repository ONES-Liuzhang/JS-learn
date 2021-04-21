function binaryToBase64(binary) {
	const dict =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	let suffix = "";
	let result = "";
	if ((binary.length / 8) % 3 == 1) {
		suffix = "==";
		binary += "0000";
	} else if ((binary.length / 8) % 3 == 2) {
		suffix = "=";
		binary += "00";
	}
	let arr = binary.split("");
	let count = 0;
	let currIndex = binary.length - 1;
	while (currIndex >= 0) {
		let byteNum = 0;
		while (count < 6) {
			byteNum += arr[currIndex] * Math.pow(2, count);
			count++;
			currIndex--;
		}
		result = dict[byteNum] + result;
		count = 0; // 还原count
	}
	return result + suffix;
}

function strToBinary(str) {
	let result = "";
	for (let i = 0; i < str.length; i++) {
		let byte = str.charCodeAt(i).toString(2);
		while (byte.length % 8 !== 0) {
			byte = "0" + byte;
		}
		result += byte;
	}
	return result;
}

let binary = strToBinary("hello");
let base64 = binaryToBase64(binary);
console.log(binary);
console.log(base64);
