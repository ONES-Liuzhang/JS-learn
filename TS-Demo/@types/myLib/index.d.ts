export as namespace myLib;
/*~ If this module exports functions, declare them like so.
 */
export function myFunction(a: string): string;
export function myOtherFunction(a: number): number;
/*~ You can declare types that are available via importing the module */
export interface SomeType {
  name: string;
  length: number;
  extras?: string[];
}
/*~ You can declare properties of the module using const, let, or var */
export const myField: number;
