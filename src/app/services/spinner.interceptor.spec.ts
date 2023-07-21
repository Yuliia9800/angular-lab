import { TestBed } from '@angular/core/testing';

import { SpinnerInterceptor } from './spinner.interceptor';
import { SpinnerService } from './spinner.service';
import { HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('SpinnerInterceptor', () => {
  let spinnerService: SpinnerService;
  let interceptor: SpinnerInterceptor;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [SpinnerInterceptor, SpinnerService],
      imports: [HttpClientTestingModule],
    })
  );

  beforeEach(() => {
    spinnerService = TestBed.inject(SpinnerService);
    interceptor = TestBed.inject(SpinnerInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add Authorization to request headers', (done) => {
    spyOn(spinnerService, 'setLoading');
    const mockReq = new HttpRequest('GET', '/test');
    const next: any = { handle: () => of({ status: 'OK' }) };

    interceptor.intercept(mockReq, next).subscribe(() => {
      expect(spinnerService.setLoading).toHaveBeenCalledWith(true);

      done();
    });
  });
});
