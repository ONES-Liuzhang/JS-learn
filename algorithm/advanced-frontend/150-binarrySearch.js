function search(arr, result) {
	return binarrySearch(0, arr.length - 1);
	function binarrySearch(leftIdx, rightIdx) {
		if (leftIdx > rightIdx) {
			return -1;
		}
		let midIdx = Math.floor((leftIdx + rightIdx) / 2);
		let mid = arr[midIdx];
		if (mid == result) {
			return midIdx;
		} else if (mid < result) {
			return binarrySearch(midIdx + 1, rightIdx);
		} else if (mid > result) {
			return binarrySearch(leftIdx, midIdx);
		}
	}
}

console.log(search([1, 2, 3, 4, 4.5, 5, 6], 4.5));

// [leftIdx, rightIdx)
function search2(arr, target) {
	let leftIdx = 0;
	let rightIdx = arr.length;
	while (leftIdx < rightIdx) {
		let midIdx = Math.floor((leftIdx + rightIdx) / 2);
		let mid = arr[midIdx];
		if (mid == target) {
			return midIdx;
		} else if (mid < target) {
			leftIdx = midIdx + 1;
		} else if (mid > target) {
			rightIdx = midIdx;
		}
	}
	return -1;
}

console.log(search2([1, 2, 3, 4, 4.5, 5, 6], 4.5));

function searchFirstIdx(arr, target) {
	let leftIdx = 0;
	let rightIdx = arr.length;
	let firstIdx = -1;
	while (leftIdx < rightIdx) {
		let midIdx = Math.floor((leftIdx + rightIdx) / 2);
		let mid = arr[midIdx];
		if (mid == target) {
			if (firstIdx == -1 || firstIdx > midIdx) {
				firstIdx = midIdx;
				rightIdx = midIdx;
			}
		} else if (mid < target) {
			leftIdx = midIdx + 1;
		} else if (mid > target) {
			rightIdx = midIdx;
		}
	}
	return firstIdx;
}
