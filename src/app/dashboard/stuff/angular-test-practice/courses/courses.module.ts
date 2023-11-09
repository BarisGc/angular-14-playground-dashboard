import { NgModule } from '@angular/core';
import { CourseRoutingModule } from './courses-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CourseResolver } from './services/course.resolver';

@NgModule({
  declarations: [...CourseRoutingModule.components],
  imports: [SharedModule, CourseRoutingModule],
  providers: [CourseResolver],
})
export class CoursesModule {}
