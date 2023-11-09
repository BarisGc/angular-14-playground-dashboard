import { Request, Response } from 'express';
import { activeClients } from './database-data';
export function logout(req: Request, res: Response) {
  let emailsDB = activeClients.map((userInfo) => userInfo.email);
  let userIndex = emailsDB.indexOf(req.body.user['email']);
  activeClients.splice(userIndex, 1);

  console.log('Logout Successful');
  res.status(200).json({ message: 'Logout Successful' });
}
