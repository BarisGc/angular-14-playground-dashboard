import { Component, OnInit } from '@angular/core';
import {
  Observable,
  Observer,
  Subject,
  Subscriber,
  Subscription,
  catchError,
  finalize,
  tap,
  throwError,
  timer,
} from 'rxjs';

@Component({
  selector: 'app-rxjs-practice',
  templateUrl: './rxjs-practice.component.html',
  styleUrls: ['./rxjs-practice.component.scss'],
})
export class RxjsPracticeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.setPractices();
  }

  setPractices() {
    // this.practice_Promises_Vs_Observables();
    // this.practice_Observables_Vs_Observers_Vs_Subscriptions_Vs_Subjects();
    // this.practice_Error_Handling();
    // this.practice_Unsubscription_Approaches()
  }

  practice_Promises_Vs_Observables() {
    const result = 11;
    let log1 = '';
    let log2 = '';

    // #promise #then #catch #finally example1
    const promise1 = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (result > 10) resolve('promise1 is resolved');
        reject('promise1 is rejected');
      }, 3000);
    });

    promise1
      .then((value) => {
        log1 = 'promise1 value: ' + value;
        console.log('log1', log1);
      })
      .catch((err) => {
        console.log('promise1 error:', err);
      });

    // #promise example2 #async #await #asyncawait #trycatch #try #catch

    const promise2 = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (result > 10) resolve('promise2 is resolved');
        reject('promise2 is rejected');
      }, 5000);
    });

    async function callPromise2() {
      try {
        log2 = await promise2;
        console.log('log2', log2);
      } catch (err) {
        console.log('promise2 error:', err);
      }
    }
    callPromise2();
    /*
     * better use case
     */

    // async await

    // async getData() {
    //   try {
    //     const data = await this.apiService.getItems();
    //     const val = await this.apiService.checkTotal(data);
    //     if(val) {
    //       this.items = data;
    //     }
    //     console.log('items value: ', this.items);
    //   } catch(e) {
    //     console.error(e);
    //   }

    // with out asyn await

    // this.apiService.getItems().then(data => {
    //   console.log('items: ', data);
    //   // this.items = data;
    //   this.apiService.checkTotal(data).then(val => {
    //     console.log(val);
    //     if(val) {
    //       this.items = data;
    //     }
    //   }).catch(e => {
    //     console.log(e);
    //   });
    // })
    // .catch(err => {
    //   console.log(err);
    // });
    // }
  }

  practice_Observables_Vs_Observers_Vs_Subscriptions_Vs_Subjects() {
    // caution:
    // if you want to emit values from outside an Observable, you can use a Subject to bridge the gap and manually call the next method on the Subject to emit values.

    // Observable Example
    const myObservable1: Observable<number> = new Observable(
      (subscriber: Subscriber<number>) => {
        subscriber.next(1);
        subscriber.next(2);
        subscriber.complete();
      }
    );

    myObservable1.subscribe((value: number) =>
      console.log('This is Observable Example', value)
    );
    // Output: 1
    // Output: 2

    // Observer Example (observer is just an interface!)
    const myObserver: Observer<number> = {
      next: (value: number) => console.log('This is Observer Example', value),
      error: (error: any) => console.error(error),
      complete: () => console.log('Completed'),
    };

    myObserver.next(1); // Output: 1

    // Subscribe Example
    const myObservable2: Observable<number> = new Observable((subscriber) => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.complete();
    });

    const subscription = myObservable2.subscribe((value: number) =>
      console.log('This is Subscribe Example', value)
    );
    // Output: 1
    // Output: 2

    subscription.unsubscribe();

    // Subject Example
    const mySubject: Subject<number> = new Subject();

    mySubject.subscribe((value: number) =>
      console.log('This is Subject Example; Observer A:', value)
    );

    mySubject.next(1); // Output: Observer A: 1

    mySubject.subscribe((value: number) =>
      console.log('This is Subject Example; Observer B:', value)
    );

    mySubject.next(2);
    // Output: Observer A: 2
    // Output: Observer B: 2

    // mySubject.unsubscribe();
    // mySubject.next(3); throws error
  }

  practice_Error_Handling() {
    const subject = new Subject<number>();

    subject
      .pipe(
        tap((value) => {
          if (value > 1) {
            throw new Error('Error emitted by throw');
          }
        }),
        catchError((error) => {
          console.error('catchError', error);
          return throwError(() => new Error(error));
        }),

        finalize(() => console.log('finalize'))
      )
      .subscribe({
        error: (e) => console.error('observer', e),
        next: (value) => console.log('next', value),
        complete: () => console.log('complete'),
      });

    subject.next(1);
    subject.next(2);

    // output:
    // next 1
    // catchError Error: Error emitted by throw
    // observer Error: Error emitted by throw
    // finalize
  }

  practice_Unsubscription_Approaches() {
    // #subscriptions #unsubscription #unsubs # unsubscript
    // Create a Subscription object to manage multiple subscriptions
    const subscriptions = new Subscription();

    // Add subscriptions to the collection
    const sub1 = timer(0, 1000).subscribe((data) => console.log('data1', data));
    const sub2 = timer(0, 3000).subscribe((data) => console.log('data2', data));

    subscriptions.add(sub1);
    subscriptions.add(sub2);
    setTimeout(() => {
      subscriptions.unsubscribe();
    }, 10000);
  }

  // note:
  // ⁡⁣⁢⁡⁢⁣⁡⁣⁢⁣Observer:⁡⁡⁡
  // An Observer is a consumer of values emitted by an Observable. It is an interface or an object with three optional methods: next, error, and complete. The next method is used to handle the next value emitted by the Observable. Observers are typically used when you want to define how to handle the emitted values.

  // ⁡⁣⁢⁣Observable:⁡
  // An Observable represents a stream of values over time. It is a producer of data, and other parts of your application can subscribe to it to receive those values. The next method is not directly used with the Observable itself, but rather with the Observer that subscribes to the Observable.

  // ⁡⁣⁢⁣Subscribe:⁡
  // The subscribe method is used to initiate the subscription to an Observable. It takes an Observer or a set of callback functions as arguments. The next function can be provided as part of the Observer object or as a separate argument in the subscribe method to handle the next emitted value. When you subscribe to an Observable, you provide the necessary logic for handling the emitted values, including the next function if required.

  // ⁡⁣⁢⁣Subject:⁡⁡
  // A Subject is a special type of Observable that allows you to multicast values to multiple Observers. It acts as both an Observable and an Observer. You can manually call the next method on a Subject to emit values, and those values will be received by all the subscribed Observers. Subjects are commonly used for communication between different parts of an application or as event buses.

  // ⁡⁣⁢⁣In summary⁡, the next method is used in the Observer pattern and can be found in the Observer interface, where you define how to handle the next emitted value. The next function is called by the Observable or manually on a Subject to emit a new value to the subscribed Observers.
}
