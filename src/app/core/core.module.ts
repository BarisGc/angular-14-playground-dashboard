import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppInterceptor } from './http/http.interceptor';
import { Oauth2Interceptor } from './http/oauth2.interceptor';
import { NotFoundComponent } from './layouts/not-found/not-found.component';
import { AuthorizationErrorComponent } from './layouts/authorization-error/authorization-error.component';
import { WINDOW_PROVIDERS } from './services/alternative-baris/window.service';

@NgModule({
  declarations: [NotFoundComponent, AuthorizationErrorComponent],
  imports: [
    BrowserAnimationsModule, // For AngularMaterial Components
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Oauth2Interceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
    WINDOW_PROVIDERS
  ],
  exports: [],
})
export class CoreModule {}
