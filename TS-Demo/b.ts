class Foo {
	a;
	b;
	constructor() {
		this.a = 1;
		this.b = 2;
	}
	get g1() {
		return "get";
	}
	set s1(val: any) {
		this.s1 = val;
	}
}
