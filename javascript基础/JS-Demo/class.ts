class A {
	name;
	constructor(name) {
		this.name = name;
	}
	say() {
		console.log("my name is ", this.name);
		this.run();
	}
	private run() {
		console.log("run");
	}
}

const a = new A("a");
a.say();
