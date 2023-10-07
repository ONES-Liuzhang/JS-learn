import { of, tap, skip, switchMap } from "rxjs";

const source = of(1, 2, 3, 4, 5);

// skip 跳过前面的几个值
// map
// mapTo 和 map(() => value) 类似，每次只输出一个 constant value
// tap 用于对每个值执行一次副作用，无返回值，和 map 不同，map 是需要返回一个新值的
// distinctUntilChanged
// switchMap

// source
//   .pipe(
//     skip(1),
//     tap((n) => {
//       if (n > 3) {
//         throw new TypeError(`Value ${n} is greater than 3`);
//       }
//     })
//   )
//   .subscribe({ next: console.log, error: (err) => console.log(err.message) });

source.pipe(switchMap((n) => of(n))).subscribe({ next: console.log });
