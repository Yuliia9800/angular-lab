import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

export const authGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthenticationService);

  if (authService.isAuthenticated()) {
    return true;
  }

  router.navigate(['login']);
  return false;
};
