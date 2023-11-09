import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CourseComponent } from './course/course.component';
import { CourseResolver } from './services/course.resolver';
import { CoursesCardListComponent } from './courses-card-list/courses-card-list.component';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    // http://example.com/courses/123/abc
    // path: ':id/:extra',
    // const id = this.route.snapshot.params.id; // 123
    // const extra = this.route.snapshot.params.extra; // abc
    // better way: const extra = this.route.snapshot.paramMap.get('extra')
    path: ':id',
    component: CourseComponent,
    resolve: {
      course: CourseResolver,
    },
  },
  {
    path: '**',
    redirectTo: '/',
    // redirecTo: "", olmaz mı?
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseRoutingModule {
  static components = [
    HomeComponent,
    CoursesCardListComponent,
    CourseDialogComponent,
    CourseComponent,
  ];
}
