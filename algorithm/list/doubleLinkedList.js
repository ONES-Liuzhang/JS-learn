function DoubleLinkedList() {
	let Node = function (val) {
		this.val = val;
		this.prev = null;
		this.next = null;
	};
	let head = null;
	let tail = null;
	let length = 0;

	this.search = function (element) {
		let root = head;
		while (root) {
			if (root.val === element) {
				return root;
			} else {
				root = root.next;
			}
		}
	};
	this.insert = function (position, element) {
		let node = new Node(element);
		if (position === 0) {
			if ((node.next = head)) {
				head.prev = node;
			}
			head = node;
		} else if (position > length) {
			return false;
		} else {
			let root = head;
			let pos = 0;
			while (root) {
				if (pos == position - 1) {
					root.next = node;
					node.prev = root;
				}
				pos++;
				root = root.next;
			}
		}
		length++;
	};
	this.removeAt = function (element) {};
	this.isEmpty = function () {};
	this.size = function () {
		return length;
	};
	this.getHead = function () {
		return head;
	};
}

const d = new DoubleLinkedList();
d.insert(0, 2);
console.log(d.getHead());
