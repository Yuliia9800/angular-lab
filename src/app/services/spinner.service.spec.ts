import { TestBed } from '@angular/core/testing';

import { SpinnerService } from './spinner.service';

describe('SpinnerService', () => {
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('setLoading', () => {
    it('should change loading status', () => {
      expect(service.loading).toBeFalsy();

      service.setLoading(true);
      expect(service.loading).toBeTruthy();
    });
  });

  describe('getLoading', () => {
    it('should return loading status', () => {
      expect(service.getLoading()).toBeFalse();
    });
  });
});
