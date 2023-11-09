import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesService } from './dashboard/course/services/courses.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeEn);
registerLocaleData(localeFr);

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    // MatSnackBarModule, //TODO: hata çıkarsa commenti kaldır
    BrowserModule,
    AppRoutingModule, // Main routes for application
    CoreModule,
    HttpClientModule,
    TranslateModule.forRoot(
      // #forRoot vs #forChild
      // forRoot: In simple terms, the use of forRoot allows us to access our providers from any point in the application that is not lazy loaded.
      // forChild: When you are using the forChild static method, you are basically telling Angular, "There is already a Router instance available in the app so please just register all of these routes with that instance." The forChild method is the method that you will call to register routes throughout your app and you will use it inside of the child, routing modules that you create.
      {
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      }
    ),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }), // Singleton objects (services, components and resources that are loaded only at app.module level),
  ],
  providers: [CoursesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
