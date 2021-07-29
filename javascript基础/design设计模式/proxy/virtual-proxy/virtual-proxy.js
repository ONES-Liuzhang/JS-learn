// 虚拟代理

//preload
class PreloadImage {
	constructor(imgNode) {
		this.imgNode = imgNode;
	}

	setSrc(url) {
		this.imgNode.src = url;
	}
}

class PreloadImageProxy {
	static PLACEHOLDER_IMAGE =
		"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
	constructor(targetImage) {
		this.targetImage = targetImage;
	}
	setSrc(url) {
		let image = new Image();
		// 为真实img节点初始化一个占位图
		this.targetImage.setSrc(PreloadImageProxy.PLACEHOLDER_IMAGE);
		image.onload = () => {
			this.targetImage.setSrc(url);
		};
		image.src = url;
	}
}
