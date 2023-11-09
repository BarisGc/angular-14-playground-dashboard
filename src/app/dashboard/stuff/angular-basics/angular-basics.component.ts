import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { DummyTableItem } from './models/dummy-table-item';
import { NgModel } from '@angular/forms';
import { RoomsComponent } from './content-projection-examples/container/rooms/rooms.component';
import { EmployeesComponent } from './content-projection-examples/container/employees/employees.component';
import { DynamicCreatedComp } from './dynamic-created-comp/dynamic-created-comp';
import { DummyDirectiveDirective } from './directives/dummy-directive.directive';
import { SomeserviceService } from './services/someservice.service';

@Component({
  selector: 'app-angular-basics',
  template: `
    <div class="barisd-section-divider">style & ngStyle & class & ngClass</div>
    <div>
      <!-- #style examples : allows you to apply static inline styles using property binding -->
      <h1>style examples</h1>
      <nav>
        <!-- v1 styleExpression : string list of styles -->
        <!-- caution: object should be reinstantined so object identity is changed, it does not work if you just change properties -->
        <div [style]="objectStyle">
          applied: 'font-size: 1.2rem; color: cornflowerblue;'
        </div>
        <!--
      v2 styleExpression : An object with style names as the keys and style values as the defaultRxjsPracticeValues caution: object should be reinstantined so object identity is changed, it does not work if you just change properties -->
        <div [style]="anotherObjectStyle">
          applied: width: '100px', height: '100px', backgroundColor:
          'greenyellow',
        </div>
        <!-- v3 dash-case  -->
        <a [style.text-decoration]="activeLinkStyle">applied:overline</a>
        <div [style.font-size.px]="fontSize">applied: fontsize 30px</div>
        <!-- v4 camelCase -->
        <a [style.textDecoration]="linkStyle">applied: underline</a>
        <div [style.fontSize]="fontSize + 'px'">applied: fontsize 30px</div>
      </nav>

      <!-- #ngStyle examples : allows you to dynamically apply inline styles -->
      <h1>ngStyle examples</h1>
      <div>
        <!-- *v1 -->
        <div
          [ngStyle]="{
            'background-color': isHighlighted ? 'blueviolet' : 'white',
            color: 'white',
            'font-weight': ' bold'
          }"
        >
          applied: blueviolet Background, white text, bold font
        </div>
        <!-- v2 -->
        <div [ngStyle]="getCustomStyles()">
          applied: violet background, lighter font
        </div>
      </div>

      <!-- #class & #ngClass examples -->
      <h1>class & ngClass examples</h1>
      <!-- notes:
      1) have to use '' if you want to use kebap-case for class names
      2) [class] less flexible than [ngClass], but ensure good practice (view is changed only when its object identity change, thus encourage immutability etc.)
      anyway, try to use [ngClass] always -->
      <div>
        <!-- #Single class binding : boolean | undefined | null -->
        <div class="my-class" [class.extra-class]="isExtra">
          applied: my-class extra-class
        </div>
        <!-- #Multiple class binding v1 : string -->
        <!-- [class] & [ngClass] same for Angular 14+, dunno for Angular 14--->
        <div class="my-class-1" [ngClass]="'my-class-2 my-class-3'">
          applied: my-class-1 my-class-2 my-class-3
        </div>
        <!-- #Multiple class binding v2 : Record<string, boolean | undefined | null> -->
        <!-- [class] & [ngClass] same for Angular 14+, dunno for Angular 14 -->
        <div
          [ngClass]="{
            'my-class-1': false,
            myClass2: true,
            'my-class-2': true
          }"
        >
          applied : myClass2 my-class-2
        </div>
        <!-- #Multiple class binding v3 : Array<string> -->
        <!-- [class] & [ngClass] same for Angular 14+, dunno for Angular 14 -->
        <div [ngClass]="['my-class-1', 'my-class-1']">
          applied: my-class-1, my-class-2
        </div>
        <!-- #Multiple class binding v4 -->
        <!-- [class] & [ngClass] same for Angular 14+, dunno for Angular 14 -->
        <div
          [ngClass]="{ 'class-one': isCondition, 'class-two': !isCondition }"
        >
          applied: class-one
        </div>
        <!-- #Multiple class binding v5 -->
        <!-- [class] & [ngClass] is different, [class] multiple binding once is not working  -->
        <div
          [class]="{
            'class-one class-two': isCondition,
            'class-third': !isCondition
          }"
        >
          applied: class-one
        </div>
        <div
          [ngClass]="{
            'class-one class-two': isCondition,
            'class-third': !isCondition
          }"
        >
          applied: class-one class-two
        </div>
        <!-- #Multiple class binding v6  -->
        <!-- caution: dont push different types of elements into array like tuple, it does not work
          ex: extraClasses = ['extra-class', 'another-class', 1, 2, 3, true, false, undefined, null, { a: 1, b: 2 }, ['a', 'b', 'c']]; it does not work
      -->
        <div [ngClass]="extraClasses">
          'applied: extra-class', 'another-class'
        </div>
      </div>
    </div>
    <div class="barisd-section-divider">
      dummy table & *ngFor & scss examples"
    </div>
    <div>
      <h1>dummy table & *ngFor & scss examples</h1>
      <!-- #Button #Group -->
      <div id="buttonGroup">
        <button class="addNewButton" (click)="addNewItem()">Add New</button>
        <button
          class="updateLastButton rotate-element"
          (click)="updateLastItem()"
        >
          Update Last
        </button>
        <button class="deleteLastButton" (click)="deleteLastItem()">
          Delete Last
        </button>
        <!-- #select item & #$event & refresh all table examples -->
        <button class="refreshButton" (click)="refreshTable()">
          Refresh Table
        </button>
      </div>
      <!-- #Dummy #Table -->
      <table #dummyTable id="dummyTable">
        <thead
          [ngStyle]="{
            backgroundColor: 'gray',
            color: '#aff',
            fontStyle: 'italic'
          }"
        >
          <tr>
            <th>id(number)</th>
            <th>Name(string)</th>
            <th>Age(number)</th>
            <th>Courses(object[])</th>
          </tr>
        </thead>
        <tbody>
          <!-- #*ngFor #trackby-->
          <tr
            *ngFor="
              let item of dummyItemsArray;
              trackBy: trackById;
              index as i;
              first as isFirst;
              last as isLast;
              even as isEven;
              odd as isOdd;
              count as count
            "
            [ngClass]="'stripe-' + i"
            [ngStyle]="{
              color: isFirst ? 'crimson' : isLast ? 'mediumspringgreen' : ''
            }"
            (click)="selectItem($event, item)"
          >
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.age }}</td>
            <td class="coursesContainer">
              <tr class="courses" *ngFor="let course of item.courses">
                <td class="course">{{ course }}</td>
              </tr>
            </td>
            <td>
              <p-button (click)="removeItem(i)" [label]="'Remove'"></p-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="barisd-section-divider">
      ng-container & ViewChild & templatRef & $implicit & dynamicRef examples"
    </div>
    <div>
      <h1>ViewChild examples</h1>
      <div>
        <!-- #ViewChild #template #ngTemplateOutlet #outlet -->

        <input
          appDummyDirective
          type="text"
          id="txtInput"
          #txtInput
          [(ngModel)]="txt"
        />
        <label for="txtInput" #txtInputLabel>
          <ng-template [ngTemplateOutlet]="template1"></ng-template>
          <ng-template #template1>
            This template 1 is by ngTemplateOutlet</ng-template
          >
          <ng-template #template2
            >This template2 is by createEmbeddedView</ng-template
          >
        </label>
      </div>
      <h1>ng-container & templateRef & $implicit examples</h1>
      <div>
        <!-- #$implicit example -->
        <li *ngFor="let item of dummyItemsArray; index as i">
          <ng-container
            *ngTemplateOutlet="
              optionTemplate;
              context: { $implicit: item, idx: i, data: { value: 1 } }
            "
          ></ng-container>
          <!-- alternative syntax -->
          <ng-container
            [ngTemplateOutlet]="optionTemplate"
            [ngTemplateOutletContext]="{
              $implicit: item,
              idx: i,
              data: { value: 2 }
            }"
          ></ng-container>
        </li>

        <ng-template
          #optionTemplate
          let-implicit
          let-position="idx"
          let-_data="data"
        >
          <p>{{ position }} : {{ implicit | json }} : {{ _data.value }}</p>
        </ng-template>

        <!-- #ng-container #container & #template #templateref #ref & *ngTemplateOutlet #templateoutlet -->
        <ng-container
          *ngIf="dummyItemsArray.length as dummyItemsCount; else emptyList"
        >
          <div>There are {{ dummyItemsCount }} items in the list</div>
          <ng-container *ngTemplateOutlet="itemList"> </ng-container>
        </ng-container>

        <ng-template #itemList>
          <ul>
            <ng-template ngFor let-item [ngForOf]="dummyItemsArray">
              <li>{{ item.name }}</li>
            </ng-template>
          </ul>
        </ng-template>

        <ng-template #emptyList>
          <div>Sorry, The list is empty</div>
        </ng-template>

        <!-- #then syntax -->
        <ng-container *ngIf="isLoggedIn; then loggedIn; else loggedOut">
        </ng-container>

        <ng-template #loggedIn>
          <div>Welcome back, friend.</div>
        </ng-template>
        <ng-template #loggedOut>
          <div>Please friend, login.</div>
        </ng-template>
      </div>

      <h1>dynamic ref examples</h1>
      <!-- v1 -->
      <!-- #ViewContainerRef -->
      <h2>v1: createComponent via ViewContainerRef</h2>
      <div>
        <!-- dynamic ref examples -->
        <button class="" (click)="createDynamicComps()">
          Create Dynamic Comp
        </button>
        <button (click)="deleteTheDynamicCreatedComp()">
          Delete The Dynamically Created Comp
        </button>
        <ng-template #dynamicCreatedCompTempToBePlacedInVCR
          >This is a Dynamic Component</ng-template
        >
      </div>
      <!-- #ngComponentOutlet #dynamic -->
      <h2>v2: createComponent via ngComponentOutlet</h2>
      <ng-container *ngComponentOutlet="dynamicCreatedComp"></ng-container>
    </div>
    <div class="barisd-section-divider">content projection examples</div>
    <div>
      <!-- #content projection #projection -->
      <ng-container> ng-container context renders</ng-container>
      <app-container #appContainer>
        This is innertext which cannot be projected since ng-content is not used
        so it cannot be done as just insert innertext here
        <ng-container ngProjectAs="[roomgroup]">
          Rooms Projected
          <app-rooms #childRoomsComp
            >this is innertext of app-rooms tag</app-rooms
          >
        </ng-container>
        <ng-container ngProjectAs="[employeegroup]">
          Employees Projected
          <app-employees #childEmployeesComp [childNo]="1"
            >this is innertext of app-employees tag</app-employees
          >
          <app-employees #childEmployeesComp [childNo]="2"
            >this is innertext of app-employees tag</app-employees
          >
        </ng-container>
      </app-container>
    </div>
  `,
  styleUrls: ['./angular-basics.component.scss'],
})
export class AngularBasicsComponent implements OnInit, AfterViewInit {
  constructor(private cd: ChangeDetectorRef, private vref: ViewContainerRef) {}
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // #ViewChild examples
    this.cd.detectChanges();
    console.log('ViewChild examples start');
    console.log('txtInputElementRef', this.txtInputElementRef);
    console.log('txtInputNgModel', this.txtInputNgModel);
    console.log('txtInputViewContainerRef', this.txtInputViewContainerRef);
    console.log(
      'dummyDirectiveDirective.dummyDirectiveNo',
      this.dummyDirectiveDirective.dummyDirectiveNo
    );
    this.txtInputViewContainerRef.createEmbeddedView(this.template2);
    console.log('template2', this.template2);
    console.log('templates', this.templates);
    console.log('exampleProvider', this.exampleProvider);
    console.log('dummyTableCardElementRef', this.dummyTableCardElementRef);
    console.log('roomsComponent', this.roomsComponent);
    console.log('employeesComponent', this.employeesComponent);
    console.log('employeesComponentsList', this.employeesComponentsList);
    console.log(
      'employeesComponent.SomeserviceService.someServiceNo',
      this.SomeserviceService.someServiceNo
    );
    console.log('ViewChild examples end');
  }

  // style, ngStyle, class, ngClass examples
  objectStyle = 'font-size: 1.2rem; color: cornflowerblue;';
  anotherObjectStyle = {
    width: '100px',
    height: '100px',
    backgroundColor: 'greenyellow',
  };
  linkStyle = 'underline';
  activeLinkStyle = 'overline';
  fontSize = 30;
  isHighlighted = true;
  isExtra = true;
  extraClasses = ['extra-class', 'another-class'];
  isCondition = true;

  getCustomStyles(): object {
    return {
      'background-color': this.isHighlighted ? 'violet' : 'white',
      'font-weight': this.isHighlighted ? 'lighter' : 'normal',
    };
  }

  shouldHighlight(): boolean {
    return this.isHighlighted;
  }

  // dummy table & *ngFor & scss examples
  dummyItemsArray: DummyTableItem[] = [
    {
      id: 1,
      name: 'John',
      age: 25,
      courses: ['Math', 'English'],
    },
    {
      id: 2,
      name: 'Jane',
      age: 30,
      courses: ['Math', 'English', 'History'],
    },
    {
      id: 3,
      name: 'Bob',
      age: 35,
      courses: [],
    },
    {
      id: 4,
      name: 'Alice',
      age: 40,
      courses: ['angular', 'react', 'vue'],
    },
    {
      id: 5,
      name: 'Peter',
      age: 45,
      courses: ['vue'],
    },
  ];

  trackById(index: number, item: DummyTableItem) {
    return item ? item.id : undefined;
  }

  // #trackby
  trackByFnMultipleFields(index: number, item: DummyTableItem) {
    return item.name + item.age;
  }

  addNewItem() {
    const length = this.dummyItemsArray.length;
    this.dummyItemsArray.push({
      id: length + 1,
      name: `New Item ${length + 1}`,
      age: Math.floor(Math.random() * 100),
      courses: [`New Course ${length + 1}`],
    });
  }
  updateLastItem() {
    const length = this.dummyItemsArray.length;
    this.dummyItemsArray[length - 1].age = Math.floor(Math.random() * 100);
  }
  deleteLastItem() {
    this.dummyItemsArray.pop();
  }

  removeItem(i: number) {
    this.dummyItemsArray.splice(i, 1);
  }

  selectItem(event: MouseEvent, item: DummyTableItem) {
    console.log('theEvent', event);
    console.log('selectItem', item);
    this.dummyItemsArray.forEach((element) => {
      if (element.id === item.id) {
        element.id = 99;
        element.name = 'changed';
        element.age = 999;
        element.courses = ['changed'];
      }
    });
  }

  refreshTable() {
    this.dummyItemsArray = [
      {
        id: 1,
        name: 'John',
        age: 25,
        courses: ['Math', 'English'],
      },
      {
        id: 2,
        name: 'Jane',
        age: 30,
        courses: ['Math', 'English', 'History'],
      },
      {
        id: 3,
        name: 'Bob',
        age: 35,
        courses: [],
      },
      {
        id: 4,
        name: 'Alice',
        age: 40,
        courses: ['angular', 'react', 'vue'],
      },
      {
        id: 5,
        name: 'Peter',
        age: 45,
        courses: ['vue'],
      },
    ];
  }

  // #ViewChild #ElementRef #NgModel #read #ViewContainerRef examples
  // note: to achieve grandchildren's something from grandparent, you need to use viewchild or viewchildren chain
  isLoggedIn = true;
  txt!: string;

  @ViewChild('txtInput', { static: true, read: ElementRef })
  txtInputElementRef!: ElementRef;
  @ViewChild('txtInput', { static: true, read: NgModel })
  txtInputNgModel!: NgModel;
  @ViewChild('txtInput', { static: true, read: ViewContainerRef })
  txtInputViewContainerRef!: ViewContainerRef;
  @ViewChild('txtInput', { static: true, read: DummyDirectiveDirective })
  dummyDirectiveDirective!: DummyDirectiveDirective;
  @ViewChild('template2', { static: true, read: TemplateRef })
  template2!: TemplateRef<any>;
  @ViewChildren(TemplateRef) templates!: QueryList<any>;
  @ViewChild('childRoomsComp', { static: true, read: 'TokenA' })
  exampleProvider!: string;

  @ViewChild('appContainer', { static: true })
  dummyTableCardElementRef!: ElementRef;
  @ViewChild(RoomsComponent, { static: true })
  roomsComponent!: RoomsComponent;
  @ViewChild(EmployeesComponent, { static: true })
  employeesComponent!: EmployeesComponent;
  @ViewChildren(EmployeesComponent)
  employeesComponentsList!: QueryList<EmployeesComponent>;
  // you can also access some services: Any provider defined in the child component tree of the current component (e.g. @ViewChild(SomeService) someService: SomeService) but im not sure if being singleton matters
  @ViewChild(EmployeesComponent, { read: SomeserviceService })
  SomeserviceService!: SomeserviceService;

  // #dynamicRef examples

  // v1: createComponent via #ViewContainerRef
  @ViewChild('dynamicCreatedCompTempToBePlacedInVCR', {
    static: false,
    read: ViewContainerRef,
  })
  dynamicCreatedCompTempToBePlacedInVCR!: ViewContainerRef;
  // more readable variable name >>>>> entry!: ViewContainerRef;

  createDynamicComps() {
    // Caution: ⁡⁣⁣⁢ivy engine sebebi ile aşağıdaki duruma gerek yok
    // ⁡⁣⁣don't forget that components that are instantiated dynamically must be added to entryComponents of a module or hosting component⁡ ⁡
    const dynamicCreatedCompTempToBePlacedInVCR =
      this.dynamicCreatedCompTempToBePlacedInVCR.createComponent(
        DynamicCreatedComp
      );

    dynamicCreatedCompTempToBePlacedInVCR.instance.dynamicCreatedCompInputFromParent =
      'Dynamic Component Input From Parent';
  }

  deleteTheDynamicCreatedComp() {
    // For example, let's say you have created three instances of SomeComponent in myContainer using the create method. If you call remove(1) on myContainer, it will destroy the second view (index 1) from the view container, leaving the first and third instances of SomeComponent intact.
    this.dynamicCreatedCompTempToBePlacedInVCR.clear();
  }

  // v2: createComponent via #ngComponentOutlet
  dynamicCreatedComp = DynamicCreatedComp;
}
