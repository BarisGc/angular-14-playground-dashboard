import { USER_SUBSCRIPTIONS } from './db-data';

const webpush = require('web-push');

export function sendNewsletter(req: any, res: any) {
  console.log('Total subscriptions', USER_SUBSCRIPTIONS.length);

  // sample notification payload
  // https://developer.mozilla.org/en-US/docs/Web/API/Notification/actions
  const notificationPayload = {
    notification: {
      title: 'Angular News',
      body: 'Newsletter Available!',
      icon: 'assets/tr.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1,
      },
      actions: [
        {
          action: 'explore',
          title: 'Go to the site',
        },
      ],
    },
  };

  Promise.all(
    USER_SUBSCRIPTIONS.map((sub: any) =>
      webpush.sendNotification(sub, JSON.stringify(notificationPayload))
    )
  )
    .then((data) => {
      console.log('promisedönüşüdata', data);
      return res.status(200).json({ message: 'Newsletter sent successfully.' });
    })
    .catch((err) => {
      console.error('Error sending notification, reason: ', err);
      res.sendStatus(500);
    });
}
