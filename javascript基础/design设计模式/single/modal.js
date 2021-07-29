// 实现一个全局唯一的Modal弹框
const DialogBase = function () {
	this.modal = document.createElement("div");
	this.modal.id = "modal";
	this.modal.style.display = "none";
	this.modal.innerHTML = "modal";
	document.body.appendChild(this.modal);
};

DialogBase.prototype.show = function () {
	this.modal.style.display = "block";
};

function Dialog() {}
Dialog.getInstance = (function () {
	let instance = null;
	return function () {
		if (!instance) {
			instance = new DialogBase();
		}
		return instance;
	};
})();
