import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

describe('AuthenticationService', () => {
  const mockRouter = jasmine.createSpyObj<Router>(['navigate']);
  let service: AuthenticationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: Router, useValue: mockRouter }],
    });
    service = TestBed.inject(AuthenticationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should navigate to /courses', () => {
      const mockResponse = { token: 'token124' };
      spyOn(window.localStorage, 'setItem');

      service.login({}).subscribe((res) => {
        expect(res.token).toEqual(mockResponse.token);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/courses']);
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
      expect(service.isAuthenticated().value).toBeFalsy();
    });
  });
});
