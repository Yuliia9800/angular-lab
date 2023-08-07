import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { AuthenticationService } from 'services/authentication.service';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  const mockRouter = jasmine.createSpyObj<Router>(['navigate']);

  const setup = (isAuthenticated: boolean) => {
    TestBed.configureTestingModule({
      providers: [
        authGuard,
        {
          provide: AuthenticationService,
          useValue: {
            isAuthenticated: () => new BehaviorSubject(isAuthenticated),
          },
        },
        { provide: Router, useValue: mockRouter },
      ],
    });

    return TestBed.runInInjectionContext(authGuard);
  };

  it('should return false and redirect', () => {
    setup(false);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should return true when user is authenticated', () => {
    const guard = setup(true);

    expect(guard).toBeTruthy();
  });
});
