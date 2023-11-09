import { AutoFocusDirective } from './custom-directives/directives/auto-focus.directive';
import { JsAndTsPracticeComponent } from './js-and-ts-practice/js-and-ts-practice.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomDirectivesComponent } from './custom-directives/custom-directives.component';
import { MyEasyBoxComponent } from './custom-directives/my-easy-box/my-easy-box.component';

import { StuffComponent } from './stuff.component';
import { TwoWayBindingAndInputOutputComponent } from './two-way-binding-and-input-output/two-way-binding-and-input-output.component';
import { DependencyTokensComponent } from './dependency-tokens/dependency-tokens.component';
import { JsAndTsPracticeChild1Component } from './js-and-ts-practice/js-and-ts-practice-child1/js-and-ts-practice-child1.component';
import { SharedDynamicComponent } from './shared-dynamic/shared-dynamic.component';
import { SharedDynamicComponent2 } from './shared-dynamic/shared-dynamic.component2';
import { Child1Component } from './two-way-binding-and-input-output/child1/child1.component';
import { PipesPracticeComponent } from './two-way-binding-and-input-output/pipes-practice/pipes-practice.component';
import { ChildAbcDirective } from './custom-directives/directives/child-abc.directive';
import { ChildXyzDirective } from './custom-directives/directives/child-xyz.directive';
import { ParentDirective } from './custom-directives/directives/parent.directive';
import { ViewChildFromDirectivesDirective } from './custom-directives/directives/view-child-from-directives.directive';
import { BaseComponentComponent } from './dependency-tokens/base-component/base-component.component';
import { Child1ComponentComponent } from './dependency-tokens/child1-component/child1-component.component';
import { AngularTestPracticeComponent } from './angular-test-practice/angular-test-practice.component';
import { CleanCodeComponent } from './clean-code/clean-code.component';
import { RxjsPracticeComponent } from './rxjs-practice/rxjs-practice.component';
import { JsAndTsPracticeChild2Component } from './js-and-ts-practice/js-and-ts-practice-child2/js-and-ts-practice-child2.component';
import { AngularBasicsComponent } from './angular-basics/angular-basics.component';
import { ContainerComponent } from './angular-basics/content-projection-examples/container/container.component';
import { EmployeesComponent } from './angular-basics/content-projection-examples/container/employees/employees.component';
import { RoomsComponent } from './angular-basics/content-projection-examples/container/rooms/rooms.component';
import { DummyDirectiveDirective } from './angular-basics/directives/dummy-directive.directive';
import { AngularFormsComponent } from './angular-forms/angular-forms.component';
import { DynamicCreatedComp } from './angular-basics/dynamic-created-comp/dynamic-created-comp';
import { CounterCustomTwoWayExampleComponent } from './angular-forms/counter-custom-two-way-example/counter-custom-two-way-example.component';
import { HostListenerDirective } from './custom-directives/directives/host-listener.directive';
import { CustomPipesComponent } from './custom-pipes/custom-pipes.component';
import { HostBindingDirective } from './custom-directives/directives/host-binding.directive';
import { ExtendsNgclassDirective } from './custom-directives/directives/extends-ngclass.directive';
import { TruncatePipe } from './custom-pipes/pipes/truncate.pipe';
import { CustomDateFormatPipe } from './custom-pipes/pipes/custom-date-format.pipe';
import { TempConverterPipe } from './custom-pipes/pipes/temp-converter.pipe';
import { ClaimCheckPipe } from './custom-pipes/pipes/claim-check.pipe';
import { LocalizedDatePipe } from './custom-pipes/pipes/translate/localized-date.pipe';

const routes: Routes = [
  {
    path: '',
    component: StuffComponent,
    children: [
      {
        path: 'angular-basics',
        component: AngularBasicsComponent,
      },
      {
        path: 'angular-forms',
        component: AngularFormsComponent,
      },
      {
        path: 'custom-directives',
        component: CustomDirectivesComponent,
      },
      {
        path: 'custom-pipes',
        component: CustomPipesComponent,
      },

      {
        path: 'two-way-binding-and-input-output',
        component: TwoWayBindingAndInputOutputComponent,
      },
      {
        path: 'js-and-ts-practice',
        component: JsAndTsPracticeComponent,
      },
      {
        path: 'dependency-tokens',
        component: DependencyTokensComponent,
      },
      {
        path: 'angular-test-practice',
        loadChildren: () =>
          import('./angular-test-practice/angular-test-practice.module').then(
            (m) => m.AngularTestPracticeModule
          ),
      },
      {
        path: 'clean-code',
        component: CleanCodeComponent,
      },
      {
        path: 'rxjs-practice',
        component: RxjsPracticeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StuffRoutingModule {
  static components = [
    CustomDirectivesComponent,
    StuffComponent,
    TwoWayBindingAndInputOutputComponent,
    MyEasyBoxComponent,
    SharedDynamicComponent,
    SharedDynamicComponent2,
    Child1Component,
    JsAndTsPracticeComponent,
    JsAndTsPracticeChild1Component,
    PipesPracticeComponent,
    DependencyTokensComponent,
    BaseComponentComponent,
    Child1ComponentComponent,
    AngularTestPracticeComponent,
    CleanCodeComponent,
    RxjsPracticeComponent,
    JsAndTsPracticeChild2Component,
    AngularBasicsComponent,
    ContainerComponent,
    EmployeesComponent,
    RoomsComponent,
    DynamicCreatedComp,
    AngularFormsComponent,
    CounterCustomTwoWayExampleComponent,
  ];
  static directives = [
    ViewChildFromDirectivesDirective,
    ParentDirective,
    ChildXyzDirective,
    ChildAbcDirective,
    DummyDirectiveDirective,
    HostListenerDirective,
    HostBindingDirective,
    ExtendsNgclassDirective,
    AutoFocusDirective,
  ];
  static pipes = [
    TruncatePipe,
    CustomDateFormatPipe,
    TempConverterPipe,
    ClaimCheckPipe,
    CustomPipesComponent,
    LocalizedDatePipe,
  ];
}
