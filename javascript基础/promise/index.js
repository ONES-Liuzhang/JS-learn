const PENDDING_STATUS = "pendding";
const FULFILLED_STATUS = "fulfilled";
const REJECTED_STATUS = "rejected";

class _Promise {
	constructor(fn) {
		this.status = PENDDING_STATUS;
		this.value = null;
		fn(this.resolve.bind(this), this.reject.bind(this));
	}

	resolve(res) {
		if (this.status === PENDDING_STATUS) {
			this.status = FULFILLED_STATUS;
			this.value = res;
		}
	}

	reject(err) {
		if (this.status === PENDDING_STATUS) {
			this.status = REJECTED_STATUS;
			this.value = err;
		}
	}

	then(fulfilled, rejected) {
		return new _Promise((resolve, reject) => {
			if (this.status === FULFILLED_STATUS) {
				let val = fulfilled(this.value);
				resolve(val);
			} else if (this.status === REJECTED_STATUS) {
				let err = rejected(this.value);
				reject(err);
			}
		});
	}
}

let a = 11;
let p = new _Promise((resolve, reject) => {
	setTimeout(() => {
		if (a > 10) {
			resolve(a);
		} else {
			reject(a);
		}
	}, 3000);
});

p.then(
	(res) => {
		console.log(res);
	},
	(err) => {
		console.error(err);
	}
);
