import { NgModule } from '@angular/core';
import { PasswordStrengthDirective } from '../directives/password-strength.directive';
import { OnlyOneErrorPipe } from '../pipes/only-one-error.pipe';

import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [...AuthRoutingModule.components, PasswordStrengthDirective],
  imports: [SharedModule, AuthRoutingModule],
})
export class AuthModule {}
