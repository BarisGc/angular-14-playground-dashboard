import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import {
  RxjsPractice,
  defaultRxjsPracticeValues,
  RxjsPractice2,
} from '../model/rxjs-practice';

@Injectable({
  providedIn: 'root',
})
export class RxjsPracticeService {
  private _rxjsPracticeSubject = new BehaviorSubject<RxjsPractice>(
    defaultRxjsPracticeValues
  );
  rxjsPracticeSubject$: Observable<RxjsPractice> =
    this._rxjsPracticeSubject.asObservable();

  private _rxjsPracticeSubject2 = new BehaviorSubject<
    RxjsPractice2 | undefined
  >(undefined);
  rxjsPracticeSubject2$: Observable<RxjsPractice2> = this._rxjsPracticeSubject2
    .asObservable()
    .pipe(
      filter((value, index): value is RxjsPractice2 => {
        return value !== undefined;
      }),
      // filter((value): value is RxjsPractice2 => !!value),
      // filter((value): value is RxjsPractice2 => Boolean(value)),
      // note: When logged to the console, all three filters will produce the same output for defined values of RxjsPractice2. However, the first syntax is more explicit and type-safe because it uses a type predicate to narrow down the type of value to RxjsPractice2.
      map((value) => value as RxjsPractice2)
    );

  constructor() {
    this._rxjsPracticeSubject2.next({
      id: 1,
      email: 'asd@',
      roles: ['admin', 'user'],
    });
  }
}
