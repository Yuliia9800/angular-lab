import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse, UserResponse } from '../utils/public_api';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  token$ = new BehaviorSubject(localStorage.getItem('token') || '');

  constructor(private http: HttpClient, private router: Router) {}

  login(profile: any) {
    return this.http
      .post<LoginResponse>('auth/login', {
        login: profile.email,
        password: profile.password,
      })
      .pipe(
        tap(() => this.router.navigate(['/courses'])),
        map((data) => {
          this.token$.next(data.token);

          return data;
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  isAuthenticated() {
    return this.token$;
  }

  getUserInfo() {
    return this.http.post<UserResponse>('auth/userinfo', {
      token: this.token$.value,
    });
  }
}
