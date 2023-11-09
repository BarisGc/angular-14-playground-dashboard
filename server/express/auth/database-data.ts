import { DbUser } from './db-user';

export const USERS: { [key: number]: DbUser } = {
  0: {
    id: 0,
    email: 'student@gmail.com',
    // ADMIN user (password is Password10) can read all lessons and also can login on behalf of other users
    passwordDigest:
      '$argon2i$v=19$m=4096,t=3,p=1$vfrhde0OMBNSSE9rRWtVrQ$gBaNgJFPBZfzuvrzfX8iSr2+OCD8K8Iu/JjwpYp8/TY',
    roles: ['student'],
  },
  1: {
    id: 1,
    email: 'admin@gmail.com',
    // normal user (password is Password10), does not have access to login as another user functionality
    passwordDigest:
      '$argon2i$v=19$m=4096,t=3,p=1$vfrhde0OMBNSSE9rRWtVrQ$gBaNgJFPBZfzuvrzfX8iSr2+OCD8K8Iu/JjwpYp8/TY',
    roles: ['student', 'admin'],
  },
};

export const activeClients: DbUser[] = [];
