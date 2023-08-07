import { TestBed } from '@angular/core/testing';
import { HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { AuthInterceptorInterceptor } from './auth-interceptor.interceptor';

describe('AuthInterceptorInterceptor', () => {
  let interceptor: AuthInterceptorInterceptor;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [AuthInterceptorInterceptor],
      imports: [HttpClientTestingModule],
    })
  );

  beforeEach(() => {
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
