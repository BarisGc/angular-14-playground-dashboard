import { Request, Response } from 'express';
import { db } from './database';
import * as argon2 from 'argon2';
import { validatePassword } from './password-validation';

export function createUser(req: Request, res: Response) {
  const credentials = {
    email: req.body.user.email,
    password: req.body.user.password,
  };
  console.log('createUser credentials', credentials);
  const errors = validatePassword(credentials.password);
  console.log('validatePassword errors', errors);
  // Todo: burası hatalı çalışıyor olabilir, typescript uyarladım...
  if (Array.isArray(errors) && errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    createUserAndSession(res, credentials).catch((err) => {
      console.log('Error creating new user', err);
      res.sendStatus(500);
    });
  }
}

async function createUserAndSession(res: Response, credentials: any) {
  const passwordDigest = await argon2.hash(credentials.password);

  const user = db.createUser(credentials.email, passwordDigest);

  res.status(200).json({ id: user.id, email: user.email, roles: user.roles });
}
