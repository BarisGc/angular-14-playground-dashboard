import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [...AdminRoutingModule.components],
  imports: [SharedModule, AdminRoutingModule],
})
export class AdminModule {}
