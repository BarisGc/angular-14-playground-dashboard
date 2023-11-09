import { USERS } from './database-data';
import { DbUser } from './db-user';

class InMemoryDatabase {
  userCounter = Object.keys(USERS).length;
  createUser(email: string, passwordDigest: string) {
    let id = this.userCounter;

    const user: DbUser = {
      id,
      email,
      passwordDigest,
      roles: ['student'],
    };

    const isEmailInUse = Object.values(USERS).some(
      (user) => user.email === email
    );

    if (isEmailInUse) {
      const message = 'An user already exists with email ' + email;
      console.error(message);
      throw new Error(message);
    } else {
      USERS[id] = { ...user, id: id };
      this.userCounter++;
    }

    console.log('new USER added', USERS);

    return user;
  }

  findUserByEmail(email: string): DbUser | null {
    console.log('Finding user by email:', email);

    const users = Object.values(USERS);

    const user = users.find((user) => user.email === email);

    console.log('user retrieved:', user);

    return user ? user : null;
  }

  findUserById(userId: string): DbUser | null {
    let user = null;
    if (userId) {
      console.log('looking for userId ', userId);

      const users = Object.values(USERS);

      user = users.find((user) => user.id.toString() === userId);
    }

    return user ? user : null;
  }
}

export const db = new InMemoryDatabase();
