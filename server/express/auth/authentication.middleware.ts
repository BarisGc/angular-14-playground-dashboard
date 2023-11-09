import { Request, Response, NextFunction } from 'express';
import { activeClients } from './database-data';

export function checkIfAuthenticated(
  req: any,
  res: Response,
  next: NextFunction
) {
  if (req.body) {
    let findAuthenticatedClient = activeClients.find(
      (client) => client.email === req.body.user.email
    );

    if (findAuthenticatedClient) {
      next();
    } else {
      res
        .status(403)
        .send(
          'You are not active client, delete your local storage and try again!'
        );
    }
  } else {
    res.status(403).send('req.body property is not defined!');
  }
}
