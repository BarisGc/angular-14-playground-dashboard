import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of } from 'rxjs';
import { FakeLoggedUser } from '../models/fake-logged-user';

@Injectable({
  providedIn: 'root',
})
export class FakeAuthService {
  fakeApiResponse = new FakeLoggedUser(
    'John Doe',
    'johndoe',
    '123456789',
    'admin',
    'joe@gmail.com',
    ['canEdit', 'canDelete', 'canAdd'],
    'fakeToken',
    'fakeRefreshToken'
  );

  constructor() {}

  getFakeApiResponse() {
    return this.fakeApiResponse;
  }
}
