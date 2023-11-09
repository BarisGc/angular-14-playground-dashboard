import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';

import { AngularTestPracticeRoutingModule } from './angular-test-practice-routing.module';

@NgModule({
  declarations: [...AngularTestPracticeRoutingModule.components],
  imports: [SharedModule, AngularTestPracticeRoutingModule],
})
export class AngularTestPracticeModule {}
