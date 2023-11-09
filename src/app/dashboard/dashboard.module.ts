import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { DashboarRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutModule } from './layouts/layouts.module';
@NgModule({
  declarations: [...DashboarRoutingModule.components],
  imports: [SharedModule, DashboardLayoutModule, DashboarRoutingModule],
})
export class DashboardModule {}
