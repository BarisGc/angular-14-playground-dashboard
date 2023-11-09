import { Component, OnInit } from '@angular/core';
import { Observable, interval, of, tap } from 'rxjs';

@Component({
  selector: 'app-pipes-practice',
  templateUrl: './pipes-practice.component.html',
  styleUrls: ['./pipes-practice.component.scss'],
})
export class PipesPracticeComponent implements OnInit {
  show = true;

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.obs$ = of(20000);
    }, 2000);

    setTimeout(() => {
      this.obs$ = of(null);
    }, 4000);
  }

  obs$: Observable<number | null> = interval(500).pipe(
    tap((x) => {
      if (x === 10) {
        this.show = false;
      }
    })
  );
}
