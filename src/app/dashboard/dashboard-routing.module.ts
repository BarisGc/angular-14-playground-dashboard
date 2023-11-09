import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthorizationGuard } from '../core/guards/alternative-baris/authorization.guard';
import { AuthorizationErrorComponent } from '../core/layouts/authorization-error/authorization-error.component';

import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';

export const DashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
        canActivate: [AdminAuthorizationGuard('admin')],
        // canActivate: [
        //   () =>
        //     inject(Service).hasUserPermissions(['WRITE_SOMETHING'])
        //       ? true
        //       : inject(Router).parseUrl('/goSomewhere'),
        // ],
      },
      {
        path: 'customer',
        loadChildren: () =>
          import('./customer/customer.module').then((m) => m.CustomerModule),
      },
      {
        path: 'movie',
        loadChildren: () =>
          import('./movie/movie.module').then((m) => m.MovieModule),
      },
      {
        path: 'course',
        loadChildren: () =>
          import('./course/course.module').then((m) => m.CourseModule), // caution: promise

      },
      {
        path: 'stuff',
        loadChildren: () =>
          import('./stuff/stuff.module').then((m) => m.StuffModule),
      },
      {
        path: 'authorization-error',
        component: AuthorizationErrorComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(DashboardRoutes)],
  exports: [RouterModule],
})
export class DashboarRoutingModule {
  static components = [DashboardComponent, HomeComponent];
}
