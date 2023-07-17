import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse, User, UserResponse } from '../utils/public_api';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  user = JSON.parse(localStorage.getItem('user') || '{}') as User;
  token = localStorage.getItem('token') || '';

  constructor(private http: HttpClient) {}

  login(profile: any) {
    return this.http
      .post<LoginResponse>('auth/login', {
        login: profile.email,
        password: profile.password,
      })
      .pipe(
        map((data) => {
          this.token = data.token;
          localStorage.setItem('token', this.token);

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
  }

  isAuthenticated() {
    return Boolean(this.token);
  }

  getUserInfo() {
    return this.http
      .post<UserResponse>('auth/userinfo', { token: this.token })
      .pipe(
        map((data) => {
          this.user = {
            id: data.id,
            firstName: data.name.first,
            lastName: data.name.last,
          };

          localStorage.setItem('user', JSON.stringify(this.user));

          return data;
        }),
        catchError((err) => {
          console.error(err);
          return throwError(() => new Error(err));
        })
      );
  }
}
