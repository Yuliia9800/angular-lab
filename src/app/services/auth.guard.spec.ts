import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { authGuard } from './auth.guard';
import { AuthenticationService } from './authentication.service';

describe('authGuard', () => {
  const mockRouter = jasmine.createSpyObj<Router>(['navigate']);

  const setup = (isAuthenticated: boolean) => {
    TestBed.configureTestingModule({
      providers: [
        authGuard,
        {
          provide: AuthenticationService,
          useValue: { isAuthenticated: () => isAuthenticated },
        },
        { provide: Router, useValue: mockRouter },
      ],
    });

    return TestBed.runInInjectionContext(authGuard);
  };

  it('should return false and redirect', () => {
    const guard = setup(false);

    expect(guard).toBeFalse();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should return true when user is authenticated', () => {
    const guard = setup(true);

    expect(guard).toBeTruthy();
  });
});
