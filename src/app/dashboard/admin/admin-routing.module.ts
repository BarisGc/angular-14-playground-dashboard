import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminChild1Grandchild1Component } from './admin-child1/admin-child1-grandchild1/admin-child1-grandchild1.component';
import { AdminChild1Component } from './admin-child1/admin-child1.component';
import { AdminChild2Component } from './admin-child2/admin-child2.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'child1',
        component: AdminChild1Component,
        children: [
          { path: 'grandchild1', component: AdminChild1Grandchild1Component },
        ],
      },
      { path: 'child2', component: AdminChild2Component },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
  static components = [
    AdminComponent,
    AdminChild1Component,
    AdminChild2Component,
    AdminChild1Grandchild1Component,
  ];
}
