import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should set user and token to local storage', () => {
      spyOn(window.localStorage, 'setItem');
      service.login({});
      expect(localStorage.setItem).toHaveBeenCalledWith('user', '{}');
      expect(localStorage.setItem).toHaveBeenCalledWith('token', '123');
    });
  });

  describe('logout', () => {
    it('should remove user and token in local storage', () => {
      spyOn(window.localStorage, 'removeItem');
      service.logout();
      expect(localStorage.removeItem).toHaveBeenCalledWith('user');
      expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    });
  });

  describe('isAuthenticated', () => {
    it('should return if user is authenticated', () => {
      expect(service.isAuthenticated()).toBe(false);
    });
  });

  describe('getUserInfo', () => {
    it('should return user`s info', () => {
      expect(service.getUserInfo()).toEqual(null);
    });
  });
});
