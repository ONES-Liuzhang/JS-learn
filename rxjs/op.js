import { timer, map, startWith, endWith } from "rxjs";

timer(1000)
  .pipe(map(() => "timer emit"))
  .subscribe((x) => console.log(x));
