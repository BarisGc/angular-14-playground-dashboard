import { FakeAuthService } from './services/fake-auth.service';
import { DatePipe, KeyValue } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, delay, map, of } from 'rxjs';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-pipes',
  templateUrl: './custom-pipes.component.html',
  styleUrls: ['./custom-pipes.component.scss'],
})
export class CustomPipesComponent implements OnInit {
  toDate: Date = new Date();
  num: number = 9542.1455421;
  per: number = 0.7414;
  per2: number = 1.3495;
  cur: number = 175;
  celcius: number = 37;
  Fahrenheit: number = 98.6;
  toDate2: Date = new Date();
  numDate = 1590319189931;
  strDate = 'Sun May 24 2020 19:16:23';

  obsValue = new Observable((observer) => {
    console.log('Observable starts');
    setTimeout(() => {
      console.log('Returns value');
      observer.next('1000');
    }, 5000);
  });

  hounds$!: Observable<any>;
  breeds: any;

  obj = {
    c: 123,
    b: 456,
    a: 789,
  };

  mapObj = new Map([
    ['c', 123],
    ['b', 446],
    ['a', 789],
  ]);

  constructor(
    private fakeAuthService: FakeAuthService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.setInitialState();
  }

  setInitialState() {
    this.setHounds();
    console.log('mapObj', this.mapObj);
    this.sortItems();
    this.fakeAuthService.getFakeApiResponse();
    this.setLocalization();
    this.useDatePipeInComponent();
  }
  setHounds() {
    // Simulate an asynchronous operation with a delay
    this.hounds$ = of([
      {
        message: [
          'afghan',
          'basset',
          'blood',
          'english',
          'ibizan',
          'plott',
          'walker',
        ],
        status: 'success',
      },
    ]).pipe(
      delay(2000),
      map((res) => {
        console.log('res', res);
        return res[0];
      })
    );

    this.breeds = {
      corgi: ['cardigan'],
      deerhound: ['scottish'],
      bulldog: ['boston', 'english', 'french'],
      mastiff: ['bull', 'english', 'tibetan'],
      australian: ['shepherd'],
      greyhound: ['italian'],
      buhund: ['norwegian'],
      hound: [
        'afghan',
        'basset',
        'blood',
        'english',
        'ibizan',
        'plott',
        'walker',
      ],
      bullterrier: ['staffordshire'],
    };
  }

  orderOriginal = (
    a: KeyValue<string, number>,
    b: KeyValue<string, number>
  ): number => {
    return 0;
  };

  orderbyValueAsc = (
    a: KeyValue<string, number>,
    b: KeyValue<string, number>
  ): number => {
    return a.value < b.value ? -1 : a.value > b.value ? 1 : 0;
  };

  orderbyValueDsc = (
    current: KeyValue<string, number>,
    previous: KeyValue<string, number>
  ): number => {
    return current.value > previous.value
      ? -1
      : current.value < previous.value
      ? 1
      : 0;
  };

  orderClause = (
    current: KeyValue<string, string[]>,
    previous: KeyValue<string, string[]>
  ): number => {
    return current.value.length > previous.value.length
      ? 1
      : current.value.length < previous.value.length
      ? -1
      : 0;
  };
  // #sort #compareFn
  //   compareFn(a, b) return value	sort order
  // < 0	sort a before b, e.g. [a, b]
  // > 0	sort a after b, e.g. [b, a]
  // === 0	keep original order of a and b
  // function compareFn(a, b) {
  //   if (a is less than b by some ordering criterion) {
  //     return -1;
  //   }
  //   if (a is greater than b by the ordering criterion) {
  //     return 1;
  //   }
  //   // a must be equal to b
  //   return 0;
  // }

  // #Sorting non-ASCII characters #non-ASCII #localeCompare
  unsortedItems = [
    'réservé',
    'premier',
    'communiqué',
    'café',
    'adieu',
    'éclair',
  ];
  sortedItems: string[] = [];
  sortItems() {
    this.sortedItems = [...this.unsortedItems];
    this.sortedItems.sort((a, b) => a.localeCompare(b));
  }

  // #ngx-translate #translate #i18n #localize #localization #internationalization #localizedDatePipe
  localeOptions!: { label: string; value: string }[];
  selectedLocale!: string;
  currentDate = new Date();
  formattedCurrentDate!: string;
  setLocalization() {
    this.selectedLocale = 'en';
    this.translate.setDefaultLang(this.selectedLocale);
    this.localeOptions = [
      { label: '🇺🇸', value: 'en' },
      { label: '🇫🇷', value: 'fr' },
    ];
  }

  useLocale({ option }: any) {
    this.translate.use(option.value);
  }
  datePipe = new DatePipe('en-US');

  // #pipeints #pipeincomponent #datePipe
  useDatePipeInComponent() {
    this.formattedCurrentDate =
      this.datePipe.transform(this.currentDate, 'd') ||
      'Not Valid Date or Format';
    console.log('this.formattedCurrentDate', this.formattedCurrentDate);
  }
}
