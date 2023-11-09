import { LOCALE_ID, enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(
    AppModule
    // #local #locale  #localization #internationalization  #i18n #ngx-translate #translate
    //   {
    //   providers: [{provide: LOCALE_ID, useValue: 'en-US' }] // static
    //   providers: [{provide: LOCALE_ID, useFactory: appLocaleService }] // dynamic but For changes made to appLocaleService to be reflected in our app, we need to reload the Angular app. LOCALE_ID is required in Angular build process. Reloading the app may reset the app state and re-trigger HTTP requests.
    //   // providers: [{provide: LOCALE_ID, useValue: navigator.language }] // copilot advice
    // }
  )
  .catch((err) => console.error(err));

// Approach 2: Passing the locale as arguments of the date pipe
// Same as the previous approach, the static locale can be replaced by value resolved in a service. That way, we can dynamically change the locale without reloading the entire app.
// The repetitive syntax makes this approach frustrating in the syntax.
// <div>{{ '2021-03-21' | date:undefined:undefined:'en-US' }}</div>

// Approach 3: Using a custom pipe localizedDate, The localizedDate pipe combines Angular date pipe and the lib ngx-translate. As others, it has its cost, this approach adds extra computation in the app
//   The internationalization library ngx-translate provides a translate pipe that can be used as follows.
//   <div>{{ 'my.traduction.key.for.hello-world' | translate }}</div>
// <!-- output (if the current locale is EN): <div>Hello world</div> -->
// <!-- output (if the current locale is FR): <div>Bonjour le monde</div> -->

// If you have a specific URL per locale and redirect the user when he changes locale, the first approach should work just fine. If you are already using ngx-translate, creating a localizedDate starts to make sense.

// To help you with your decision, here is a quick comparison between the three approaches:
// https://blog.theodo.com/2021/10/angular-localized-date-pipe/
// Syntaxe	Reusability	Reload required	Performance
// Setting LOCALE_ID	⭐️⭐️⭐️	⭐️⭐️⭐️	YES	⭐️⭐️⭐️
// Using date pipe argument	-	⭐️	NO	⭐️⭐️⭐️
// Custom localizedDate	⭐️⭐️⭐️	⭐️⭐️⭐️	NO	⭐️
