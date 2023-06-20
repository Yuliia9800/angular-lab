import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  user = {};

  login(profile: any) {
    localStorage.setItem('user', JSON.stringify(this.user));
    localStorage.setItem('token', '123');
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  isAuthenticated() {
    return false;
  }

  getUserInfo() {
    return this.user;
  }
}
