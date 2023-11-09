import { Request, Response } from 'express';
import { db } from './database';
import * as argon2 from 'argon2';
import { DbUser } from './db-user';
import { activeClients } from './database-data';

export function login(req: Request, res: Response) {
  const credentials = {
    email: req.body.user.email,
    password: req.body.user.password,
  };

  const user = db.findUserByEmail(credentials.email);

  if (!user) {
    res.sendStatus(403);
  } else {
    loginAndBuildResponse(credentials, user, res);
  }
}

async function loginAndBuildResponse(
  credentials: any,
  user: DbUser,
  res: Response
) {
  try {
    await attemptLogin(credentials, user);
    activeClients.push(user);
    console.log('activeClients', activeClients);

    console.log('Login successful');

    res.status(200).json({ id: user.id, email: user.email, roles: user.roles });
  } catch (err) {
    console.log('Login failed:', err);
    res.sendStatus(403);
  }
}

async function attemptLogin(credentials: any, user: DbUser) {
  const isPasswordValid = await argon2.verify(
    user.passwordDigest,
    credentials.password
  );

  if (!isPasswordValid) {
    throw new Error('Password Invalid');
  }
}
