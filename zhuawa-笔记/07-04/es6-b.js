import { fnA } from "./es6-a.js";

export let b = true;

export const fnB = () => {
  fnA();
};

setTimeout(() => {
  b = false;
}, 500);
