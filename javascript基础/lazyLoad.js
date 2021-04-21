// 图片懒加载
// querySelectorAll 返回一个NodeList对象，是一个类数组，转化为Array
let imgList = [...document.querySelectorAll("img")];
let length = imgList.length; // 记录总长度
let count = 0;

let lazyLoad = function () {
	// 图片加载完后 可移除该图片
	let deleteImgIndexs = [];
	imgList.forEach((img, index) => {
		let rect = img.getBoundingClientRect();
		// 图片出现在可视范围
		if (rect.top < window.innerHeight) {
			// 加载图片
			img.src = img.dataset.src;
			deleteImgIndexs.push(index);
			count++;
			if (count === length) {
				document.removeEventListener("scroll", lazyLoad);
			}
		}
	});
	imgList = imgList.filter((_, index) => !deleteImgIndexs.includes(index));
};

// 可加入防抖 throttle
document.addEventListener("scroll", lazyLoad);
