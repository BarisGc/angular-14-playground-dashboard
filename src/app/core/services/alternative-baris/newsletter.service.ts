import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NewsletterService {
  constructor(private http: HttpClient) {}

  addPushSubscriber(sub: any) {
    return this.http.post('/api/notifications', sub);
  }

  send() {
    return this.http.post('/api/newsletter', null);
  }
}

// note:
// This is going to be displayed to the user even if the browser window is closed.

// So what is going to happen is that even if the service worker has been, well, been stopped by the

// browser, the browser is going to start again.

// The service worker and the service worker is going to receive the Bush Epper message is going to take

// the notification below that we have provided to firebase cloud messaging and it's going to use it to

// call the browser notification Epper.

// So there are two standards here involved.

// One is the push API that was used to send the message to the client and the other is the notifications

// EPA, which is used to display notifications such as this one to the user.

// The end result is that we have transparent notifications being handled by the English service worker
