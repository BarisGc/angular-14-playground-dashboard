import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularTestPracticeComponent } from './angular-test-practice.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path: '',
    component: AngularTestPracticeComponent,
    children: [
      {
        path: 'calculator',
        component: CalculatorComponent,
      },
      {
        path: 'courses',
        loadChildren: () =>
          import('./courses/courses.module').then((m) => m.CoursesModule),
      },
      {
        path: 'about',
        component: AboutComponent,
      },
    ],
  },

  {
    path: '**',
    redirectTo: '/',
    // redirecTo: "", redirectTo: " " both works and same like '/' but not semantically correct
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AngularTestPracticeRoutingModule {
  static components = [CalculatorComponent, AboutComponent];
}
