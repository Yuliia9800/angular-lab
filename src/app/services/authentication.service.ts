import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  user = localStorage.getItem('user');
  token = localStorage.getItem('token');

  login(profile: any) {
    localStorage.setItem('user', JSON.stringify(profile));
    localStorage.setItem('token', '123');

    this.user = profile;
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  isAuthenticated() {
    return Boolean(this.token);
  }

  getUserInfo() {
    return this.user;
  }
}
