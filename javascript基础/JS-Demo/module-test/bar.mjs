import { baz } from "./baz.mjs";
console.log("bar");
export function bar() {
	baz();
}
