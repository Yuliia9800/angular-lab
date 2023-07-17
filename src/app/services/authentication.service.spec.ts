import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthenticationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should set user and token to local storage', () => {
      const mockResponse = { token: 'token124' };
      spyOn(window.localStorage, 'setItem');

      service.login({}).subscribe((res) => {
        expect(res.token).toEqual(mockResponse.token);
        expect(localStorage.setItem).toHaveBeenCalledWith(
          'token',
          mockResponse.token
        );
      });

      const req = httpTestingController.expectOne({
        method: 'POST',
        url: `auth/login`,
      });

      req.flush(mockResponse);
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
      const mockResponse = {
        id: 1,
        name: {
          first: 'firstName',
          last: 'lastName',
        },
      };

      spyOn(window.localStorage, 'setItem');

      service.getUserInfo().subscribe((res) => {
        expect(res).toEqual(mockResponse as any);
        expect(localStorage.setItem).toHaveBeenCalled();
      });

      const req = httpTestingController.expectOne({
        method: 'POST',
        url: `auth/userinfo`,
      });

      req.flush(mockResponse);
    });
  });
});
