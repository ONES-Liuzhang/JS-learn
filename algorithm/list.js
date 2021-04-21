// 链表
function List() {
	let Node = function (element) {
		this.data = element;
		this.next = null;
	};
	let head = null;
	let length = 0;
	this.getList = function () {
		return head;
	};
	// 增加节点
	this.append = function (element) {
		let node = new Node(element);
		let p = head;
		if (!head) {
			head = node;
		} else {
			while (p.next) {
				p = p.next;
			}
			p.next = node;
		}
	};
}
