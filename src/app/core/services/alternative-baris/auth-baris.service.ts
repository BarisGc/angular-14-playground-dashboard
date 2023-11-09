import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  filter,
  map,
  tap,
  shareReplay,
} from 'rxjs';
import { User } from 'src/app/core/services/alternative-baris/model/user';
@Injectable({
  providedIn: 'root',
})
export class AuthBarisService {
  private _userSubject = new BehaviorSubject<User | undefined | null>(
    undefined
  );

  user$: Observable<User> = this._userSubject.asObservable().pipe(
    filter((value, index): value is User => {
      return value !== undefined;
    }),
    map((value) => value as User)
  );

  get user(): User | null | undefined {
    return this._userSubject.getValue();
  }

  isLoggedIn$: Observable<boolean> = this.user$.pipe(map((user) => !!user?.id));

  isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(
    map((isLoggedIn) => !isLoggedIn)
  );

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  signUp(email: string, password: string) {
    let obs$ = this.http
      .post<User>('/api/signup', {
        user: {
          email,
          password,
        },
      })
      .pipe(shareReplay(1));
    obs$.subscribe();
    return obs$;
  }

  login(email: string, password: string) {
    let obs$ = this.http
      .post<User>('/api/login', {
        user: {
          email,
          password,
        },
      })
      .pipe(
        shareReplay(1),
      );
    obs$.subscribe((user) => {
      this._userSubject.next(user),
        localStorage.setItem('authInfo', JSON.stringify(user));
    });
    return obs$;
  }

  loginAsUser(email: string) {
    let obs$ = this.http
      .post<User>('/api/admin', {
        impersonatedUserEmail: email,
        user: this.user,
      })
      .pipe(
        shareReplay(1),
      );
    obs$.subscribe((user) => {
      this._userSubject.next(user);
      localStorage.setItem('authInfo', JSON.stringify(user));
    });
    return obs$;
  }

  logout(): Observable<any> {
    let obs$ = this.http
      .post('/api/logout', { user: this.user })
      .pipe(shareReplay(1));
    obs$.subscribe(() => {
      this._userSubject.next(null);
      localStorage.removeItem('authInfo');
    });
    return obs$;
  }

  isLoggedIn() {
    let authInfo = localStorage.getItem('authInfo');
    if (authInfo) {
      this._userSubject.next(JSON.parse(authInfo));
    }
    return authInfo ? true : false;
  }
}
