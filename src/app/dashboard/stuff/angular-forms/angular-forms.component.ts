import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Car } from './model/car';
import { AngularFormsDataService } from './service/angular-forms-data.service';
import {
  Observable,
  Subject,
  catchError,
  concat,
  distinctUntilChanged,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { Person } from './model/person';
import { createPasswordStrengthValidator } from 'src/app/validators/password-strength.validator';
import { PurchaseFormModel } from './model/strict-formgroup-example';

@Component({
  selector: 'app-angular-forms',
  templateUrl: './angular-forms.component.html',
  styleUrls: ['./angular-forms.component.scss'],
})
export class AngularFormsComponent implements OnInit {
  // general
  loading = false;
  // template driven forms examples
  // V1
  carLoading = false;
  cars$!: Observable<Car[]>;
  selectedCar!: Car;
  carInput$ = new Subject<string>();
  // V2
  peopleLoading = false;
  people$!: Observable<any[]>;
  selectedPersons!: Person[];
  peopleInput$ = new Subject<string>();

  // reactive forms examples
  purchaseForm!: PurchaseFormModel;
  rfForm = this.fb.nonNullable.group({
    // alternative
    // email: this.fb.nonNullable.control('', {
    //   validators: [Validators.required, Validators.email],
    //   updateOn: 'blur',
    // }),
    email: [
      'admin@gmail.com',
      {
        validators: [Validators.required, Validators.email],
        updateOn: 'blur',
      },
    ],
    password: [
      'Password10',
      [
        Validators.required,
        Validators.minLength(8),
        createPasswordStrengthValidator(),
      ],
    ],
    randomNumbers: [Math.random() * 100],
    // TODO: this.reset null mu olur nonnulable eklersen? dene
    employees: this.fb.array([
      this.fb.group({
        firstName: ['baris'],
        lastName: ['d'],
        skills: this.fb.array([
          this.fb.group({
            skill: ['angular'],
            exp: ['junior'],
          }),
        ]),
      }),
    ]),
    captcha: [{ value: null, disabled: true }, Validators.required], // caution: Validators.required does not work since it is disabled, also value is not included in the form value, use getRawValue() instead if you need disabled values
  });

  get _email() {
    return this.rfForm.get('email') as FormControl;
    // alternative way of getting form control
    // return this.form.controls['email'] as FormControl;
  }

  get _password() {
    return this.rfForm.get('password') as FormControl;
  }

  get _randomNumbers() {
    return this.rfForm.get('randomNumbers') as FormControl;
  }

  get _captcha() {
    return this.rfForm.get('captcha') as FormControl;
  }

  logSkillIndex(skillIndex: any) {
    console.log('skillIndex', skillIndex);
  }
  constructor(
    private angularFormsDataService: AngularFormsDataService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.setInitialState();
  }

  // template driven forms examples #tdf #template  #template driven
  tdf = {
    email: '',
    password: '',
    address: {
      city: '',
      pincode: '',
    },
    selectedCar: '',
  };

  loginUserTdf(tdfForm: NgForm, submit: Event) {
    console.log('tdfForm Submitted', tdfForm);
    console.log('tdfForm submit event', submit);
  }

  byEmailTDFChange(changeEvent: any) {
    console.log('byEmailTDFChange', changeEvent);
  }

  setInitialState() {
    this.addHtmlBlock();
    this.setDropdowns();
  }

  // ng-select
  setDropdowns() {
    this.setNgSelectCarDropdownV1();
    this.setNgSelectCarDropdownV2();
  }

  setNgSelectCarDropdownV1() {
    this.carLoading = true;
    this.angularFormsDataService.getCars().subscribe((cars) => {
      this.cars$ = of(cars);
      this.carLoading = false;
    });
  }

  setNgSelectCarDropdownV2() {
    this.loadPeople();
  }

  customSearchFn(term: string, item: Car) {
    term = term.toLowerCase();
    return (
      item.name.toLowerCase().indexOf(term) > -1 ||
      item.nested.name.toLowerCase().includes(term)
    );
  }

  trackByFn(item: Person) {
    return item.id;
  }

  loadPeople() {
    this.people$ = concat(
      of([]), // default items
      this.peopleInput$.pipe(
        distinctUntilChanged(),
        tap(() => (this.peopleLoading = true)),
        switchMap((term) =>
          this.angularFormsDataService.getPeople(term).pipe(
            catchError(() => of([])), // empty list on error
            tap(() => (this.peopleLoading = false))
          )
        )
      )
    );
  }

  addTagFn(name: string) {
    return { name: name, tag: true };
  }

  // reactive forms examples
  // https://dev.to/danywalls/why-you-should-use-strictly-typed-reactive-forms-in-your-angular-app-1j0
  // TODO: rfForm type kontrol et
  loginUserRf(rfForm: any, submit: Event) {
    console.log('rfForm Submitted', rfForm);
    console.log('rfForm submit event', submit);
  }

  employees(): FormArray {
    return this.rfForm.get('employees') as FormArray;
  }

  newEmployee(): FormGroup {
    return this.fb.group({
      firstName: '',
      lastName: '',
      skills: this.fb.array([]),
    });
  }

  addEmployee() {
    this.employees().push(this.newEmployee());
  }

  removeEmployee(empIndex: number) {
    this.employees().removeAt(empIndex);
  }

  employeeSkills(empIndex: number): FormArray {
    console.log('empIndex', empIndex);
    console.log(this.employees().at(empIndex).get('skills'));
    return this.employees().at(empIndex).get('skills') as FormArray;
  }

  newSkill(): FormGroup {
    return this.fb.group({
      skill: '',
      exp: '',
    });
  }

  addEmployeeSkill(empIndex: number) {
    this.employeeSkills(empIndex).push(this.newSkill());
  }

  removeEmployeeSkill(empIndex: number, skillIndex: number) {
    this.employeeSkills(empIndex).removeAt(skillIndex);
  }

  // #htmlcontext #htmlblock #addhtml #addhtmlblock #innerhtml #InnerHTML #[innerHTML]
  htmlBlocks: string[] = [];

  addHtmlBlock() {
    const newHtmlBlock =
      '<p>Yeni bir HTML bloğu ekledim!Yeni bir HTML bloğu ekledim!Yeni bir HTML bloğu ekledim!Yeni bir HTML bloğu ekledim!Yeni bir HTML bloğu ekledim!Yeni bir HTML bloğu ekledim!Yeni bir HTML bloğu ekledim!Yeni bir HTML bloğu ekledim!Yeni bir HTML bloğu ekledim!Yeni bir HTML bloğu ekledim!Yeni bir HTML bloğu ekledim!Yeni bir HTML bloğu ekledim!Yeni bir HTML bloğu ekledim!Yeni bir HTML bloğu ekledim!Yeni bir HTML bloğu ekledim!Yeni bir HTML bloğu ekledim!Yeni bir HTML bloğu ekledim!Yeni bir HTML bloğu ekledim!Yeni bir HTML bloğu ekledim!Yeni bir HTML bloğu ekledim!Yeni bir HTML bloğu ekledim!Yeni bir HTML bloğu ekledim!</p>'; // Bu kısmı kendi HTML bloğunuzla değiştirebilirsiniz.
    this.htmlBlocks.push(newHtmlBlock);
  }

  // #$event
  value1 = '';
  value2 = '';
  handleInput(event: Event) {
    this.value1 = (event.target as HTMLInputElement).value;
  }

  clickCount = 0;
  clickCount1 = 0;
  clickMe() {
    this.clickCount++;
  }

  // #custom #customtwoway #customtwowaybinding #custom two way #custom twoway
  count = 0;
  clearCount() {
    this.count = 0;
  }
}
