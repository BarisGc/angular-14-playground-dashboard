import { DOCUMENT, LocationStrategy } from '@angular/common';
import {
  ApplicationRef,
  Component,
  Inject,
  OnInit,
  inject,
} from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { concat, first, interval } from 'rxjs';
import { WINDOW } from './core/services/alternative-baris/window.service';
import { LoginComponent } from './auth/login/login.component';
import { TranslateService } from '@ngx-translate/core';
// #keywords: #window, #document
const langs = ['en', 'fr'];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'baris';
  constructor(
    private appRef: ApplicationRef,
    @Inject(WINDOW) private window: Window,
    @Inject(DOCUMENT) private document: Document,
    private swUpdate: SwUpdate,
    translate: TranslateService
  ) {
    translate.addLangs(langs);
    translate.setDefaultLang('en');
    translate.use('en');
    // you can use TranslatePipe or TranslateDirective or TranslateService(in component)
  }
  ngOnInit() {
    // this.handlePushNotifications();
    // this.disableBackButton();
    if (this.swUpdate.isEnabled) {
      this.handleSwUpdateInitially();
      this.handleSwUpdatePeridoically();
    } else {
      // this.window.alert(
      //   'Offline mode can not be activated, use a modern browser'
      // );
      console.log(
        'swUpdate is not enabled, Offline mode can not be activated, use a modern browser'
      );
    }
  }

  disableBackButton() {
    this.window.history.pushState(null, '', location.href);
    let ref = this;
    this.window.onpopstate = function () {
      ref.window.history.go(1);
    };
  }
  handleSwUpdateInitially() {
    // note: manuel custom service worker register
    // navigator.serviceWorker.register('/worker.js');
    // https://web.dev/service-worker-lifecycle/
    // note: skipWaiting and Clients.claim are designed to solve different problems.
    // "Clients.claim" ONLY has an effect on the very first time your webpage goes from an uncontrolled webpage to a controlled (by a service worker) webpage by registering a service worker.
    // "skipWaiting" is exactly what it says. It skips the waiting phase and moves directly to activating. Once activated it is now the active service worker for all clients. Clients being any window or tab that has a webpage open that is within the scope of your service worker.
    // No need to use both of them if it is not edge case

    // self.addEventListener('install', function (event) {
    //   event.waitUntil(self.skipWaiting());
    // });
    // self.addEventListener('activate', function (event) {
    //   event.waitUntil(self.clients.claim());
    // });

    // note: auto service worker register
    console.log('handleSwUpdateInitially');
    // https://github.com/angular/angular/issues/47455
    // version check
    this.swUpdate.unrecoverable.subscribe((event) => {
      this.window.alert(
        'An error occurred that we cannot recover from:\n' +
          event.reason +
          '\n\nPlease reload the page.'
      );
    });
    this.swUpdate.versionUpdates.subscribe((event) => {
      console.log('versionUpdates', event);
      switch (event.type) {
        case 'VERSION_DETECTED':
          console.log(`Downloading new app version: ${event.version.hash}`);

          try {
            this.window.navigator.vibrate([100, 50, 100]);
          } catch (error) {
            console.log('navigator.vibrate error', error);
          }

          this.window.alert('Yeni sürüm indiriliyor.');
          break;
        case 'VERSION_READY':
          console.log(`Current app version: ${event.currentVersion.hash}`);
          console.log(
            `New app version ready for use: ${event.latestVersion.hash}`
          );
          this.window.alert(
            'Yeni sürüm indirildi, sayfa yeniden başlatılacak!'
          );
          break;
        case 'VERSION_INSTALLATION_FAILED':
          console.log(
            `Failed to install app version '${event.version.hash}': ${event.error}`
          );
          break;
      }
    });
  }

  handleSwUpdatePeridoically() {
    // note:
    // In order to avoid negatively affecting the initial rendering, [ServiceWorkerModule](https://angular.io/api/service-worker/ServiceWorkerModule) will by default wait for the app to stabilize, before registering the ServiceWorker script. Constantly polling for updates, e.g. with interval(), will prevent the app from stabilizing and the ServiceWorker script will never be registered with the browser.
    // Allow the app to stabilize first, before starting polling for updates with `interval()`.
    const appIsStable$ = this.appRef.isStable.pipe(
      first((isStable) => isStable === true)
    );
    const everySixHours$ = interval(6 * 60 * 60 * 1000);
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);

    everySixHoursOnceAppIsStable$.subscribe(() =>
      this.swUpdate.checkForUpdate().then((event) => {
        if (event) {
          console.log('Yeni sürüm mevcut.');
          // note: window.location.reload() may not be worked in all browsers(may be old info or rumor) so use document.location.reload()
          this.swUpdate.activateUpdate().then(() => document.location.reload());
        } else {
          console.log('Yeni sürüm mevcut değil.');
        }
      })
    );
  }

  handlePushNotifications() {
    // note: bu projede logine koydum, ondan oradan çağırdım ama doğrusu webpush servis oluşturup oradan çağırmak
    // note2: windows10 üzerinde notificationlar browserda değil os üzerinden geliyor, bu arada hem os hem browser izinlerine dikkat, chrome da 25.04.2023 tarihi itibari ile os yerine browser üzerinden notification alma seçeneğini yok
    // const loginComponent = inject(LoginComponent);
    // if (this.authService.loggedUser) {
    //   if (Notification.permission !== 'granted') {
    //     loginComponent.subscribeToNotifications();
    //   }
    // }
  }
}
