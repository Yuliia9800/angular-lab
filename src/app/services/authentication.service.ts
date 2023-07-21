import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse, User, UserResponse } from '../utils/public_api';
import { BehaviorSubject, Subject, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  user$ = new BehaviorSubject(
    JSON.parse(localStorage.getItem('user') || '{}') as any
  );
  token$ = new BehaviorSubject(localStorage.getItem('token') || '');

  constructor(private http: HttpClient) {}

  login(profile: any) {
    return this.http
      .post<LoginResponse>('auth/login', {
        login: profile.email,
        password: profile.password,
      })
      .pipe(
        map((data) => {
          this.token$.next(data.token);
          localStorage.setItem('token', this.token$.value);

          return data;
        }),
        catchError((err) => {
          console.error(err);
          return throwError(() => new Error(err));
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    this.user$.next({});
    this.token$.next('');
  }

  isAuthenticated() {
    return this.token$;
  }

  getUserInfo() {
    return this.http
      .post<UserResponse>('auth/userinfo', { token: this.token$.value })
      .pipe(
        map((data) => {
          const user = {
            id: data.id,
            firstName: data.name.first,
            lastName: data.name.last,
          };

          this.user$.next(user);
          localStorage.setItem('user', JSON.stringify(user));

          return data;
        }),
        catchError((err) => {
          console.error(err);
          return throwError(() => new Error(err));
        })
      );
  }
}
