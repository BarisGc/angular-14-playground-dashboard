import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';

import { CourseRoutingModule } from './course-routing.module';

@NgModule({
  declarations: [...CourseRoutingModule.components],
  imports: [CourseRoutingModule, SharedModule],
})
export class CourseModule {}
