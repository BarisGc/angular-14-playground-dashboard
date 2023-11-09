// https://brianflove.com/2018-01-11/angular-window-provider/
// While there are plenty of solutions out there already that propose methods for indirectly accessing the Window object, I've found that many of them don't actually perform any conditional verification that our Angular application is executing in the context of a browser, where we will have the Window object.

// Here's an example of a solution that I felt was inadequate:

// import { Injectable } from '@angular/core';

// function getWindow (): any {
//     return window;
// }

// @Injectable()
// export class WindowRefService {
//   get nativeWindow (): any {
//     return getWindow();
//   }
// }
// A quick look at this indicates that we are not checking if the application is executing in the context of a browser. Further, we may want to support a context for tests, where we might want to mock some properties or methods on the Window object.

import { isPlatformBrowser } from '@angular/common';
import {
  ClassProvider,
  FactoryProvider,
  InjectionToken,
  PLATFORM_ID,
} from '@angular/core';

/* Create a new injection token for injecting the window into a component. */
export const WINDOW = new InjectionToken('WindowToken');

/* Define abstract class for obtaining reference to the global window object. */
export abstract class WindowRef {
  get nativeWindow(): Window | Object {
    throw new Error('Not implemented.');
  }
}

/* Define class that implements the abstract class and returns the native window object. */
export class BrowserWindowRef extends WindowRef {
  constructor() {
    super();
  }

  override get nativeWindow(): Window | Object {
    return window;
  }
}

/* Create an factory function that returns the native window object. */
export function windowFactory(
  browserWindowRef: BrowserWindowRef,
  platformId: Object
): Window | Object {
  if (isPlatformBrowser(platformId)) {
    return browserWindowRef.nativeWindow;
  }
  return new Object();
}

/* Create a injectable provider for the WindowRef token that uses the BrowserWindowRef class. */
const browserWindowProvider: ClassProvider = {
  provide: WindowRef,
  useClass: BrowserWindowRef,
};

/* Create an injectable provider that uses the windowFactory function for returning the native window object. */
const windowProvider: FactoryProvider = {
  provide: WINDOW,
  useFactory: windowFactory,
  deps: [WindowRef, PLATFORM_ID],
};

/* Create an array of providers. */
export const WINDOW_PROVIDERS = [browserWindowProvider, windowProvider];

// A few things to note:

// I have an InjectionToken that is declared as WINDOW that is exported. We will use this to inject the Window object into our components.
// I define an abstract class WindowRef that has an accessor for the nativeWindow property.
// I then define the BrowserWindowRef class that extends the abstract class, implementing the nativeWindow property to return the globally available window object.
// The windowFactory() function determines if the application is executing within the context of the browser using the isPlatformBrowser() function. Right now, if the application is not executing within the context of a browser, then I simply return a new Object. This part is extensible in that you could return a mock object in another context. The function expects an instance of the BrowserWindowRef and the platformId object. These dependencies are specified in the windowProvider
// The browserWindowProvider is a ClassProvider that provides an instance of the BrowserWindowRef using the WindowRef injection token.
// The windowProvider is a FactoryProvider that uses the windowFactory to return the Window object (or an emtpy object) when the the WINDOW injection token is used.
// Finally, we declare an array of providers called WINDOW_PROVIDERS.
