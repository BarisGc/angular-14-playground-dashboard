import { USER_SUBSCRIPTIONS } from './db-data';

export function addPushSubscriber(req: any, res: any) {
  const sub = req.body;

  console.log('Received Subscription on the server: ', sub);

  USER_SUBSCRIPTIONS.push(sub);

  res.status(200).json({ message: 'Subscription added successfully.' });
}
