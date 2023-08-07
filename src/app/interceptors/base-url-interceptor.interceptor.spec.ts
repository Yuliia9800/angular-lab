import { TestBed } from '@angular/core/testing';
import { HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { BaseUrlInterceptorInterceptor } from './base-url-interceptor.interceptor';

describe('BaseUrlInterceptorInterceptor', () => {
  let interceptor: BaseUrlInterceptorInterceptor;
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [BaseUrlInterceptorInterceptor],
      imports: [HttpClientTestingModule],
    })
  );

  beforeEach(() => {
    interceptor = TestBed.inject(BaseUrlInterceptorInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add Authorization to request headers', (done) => {
    const mockReq = new HttpRequest('GET', 'test');
    const requestCloneSpy = spyOn(mockReq, 'clone');
    const next: any = {
      handle: () => of({ status: 'OK' }),
    };

    interceptor.intercept(mockReq, next).subscribe(() => {
      expect(requestCloneSpy).toHaveBeenCalledWith({
        url: 'http://localhost:3004/test',
      });
      done();
    });
  });
});
