import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from 'services/authentication.service';

export const authGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthenticationService);

  return authService.isAuthenticated().subscribe((val) => {
    if (val) {
      return true;
    }

    router.navigate(['login']);
    return false;
  });
};
