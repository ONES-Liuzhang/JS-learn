import { BehaviorSubject, combineLatest, noop, Subscription } from "rxjs";
import * as op from "rxjs/operators";

const orignalVal = {
  a: 1,
  b: 2,
};
const subject = new BehaviorSubject(orignalVal);

// 订阅
// subject.subscribe((val) => {
//   console.log("subscribe1 ", val);
// });
const obj1 = { c: 3 };

subject
  .pipe(op.skip(1), op.mapTo("structure-may-change"))
  .pipe(
    op.startWith("init"),
    op.map(() => {
      return obj1;
    }),
    op.distinctUntilChanged((objA, objB) => Object.is(objA, objB))
  )
  .subscribe((val) => {
    console.log(val);
  });

subject.next(obj1);
subject.next(obj1);
subject.next({ c: 5 });
subject.complete();
