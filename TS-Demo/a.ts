import { extend } from "../vue-typescript-tsx/types/lodash";

class Foo {
	a;
	b;
	constructor(a, b) {
		this.a = a;
		this.b = b;
	}
	run() {
		console.log("foo", this.a, this.b);
	}
}

class Bar extends Foo {
	c;
	constructor(a, b) {
		super(a, b);
		this.c = a + b;
	}
	run() {
		console.log("bar");
	}
}

let bar = new Bar(1, 2);
bar.run();
