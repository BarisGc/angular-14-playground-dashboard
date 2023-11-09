import { NgModule } from '@angular/core';
import { StuffRoutingModule } from './stuff-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
@NgModule({
  declarations: [
    ...StuffRoutingModule.components,
    ...StuffRoutingModule.directives,
    ...StuffRoutingModule.pipes,
  ],
  imports: [
    SharedModule,
    StuffRoutingModule,
    TranslateModule,
    CardModule,
    TabViewModule,
    SelectButtonModule,
    ButtonModule,
    TableModule,
  ],
})
export class StuffModule {}
