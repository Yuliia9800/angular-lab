import { TestBed } from '@angular/core/testing';

import { AuthInterceptorInterceptor } from './auth-interceptor.interceptor';
import { AuthenticationService } from './authentication.service';
import { HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('AuthInterceptorInterceptor', () => {
  let authService: AuthenticationService;
  let interceptor: AuthInterceptorInterceptor;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [AuthInterceptorInterceptor, AuthenticationService],
      imports: [HttpClientTestingModule],
    })
  );

  beforeEach(() => {
    authService = TestBed.inject(AuthenticationService);
    interceptor = TestBed.inject(AuthInterceptorInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add Authorization to request headers', (done) => {
    const mockReq = new HttpRequest('GET', '/test');
    const requestCloneSpy = spyOn(mockReq, 'clone');
    const next: any = {
      handle: () => of({ status: 'OK' }),
    };

    interceptor.intercept(mockReq, next).subscribe(() => {
      expect(requestCloneSpy).toHaveBeenCalledWith({
        headers: mockReq.headers.set('Authorization', ''),
      });
      done();
    });
  });
});
