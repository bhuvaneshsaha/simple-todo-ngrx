import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../../pages/auth/auth.store';

export const userLoggedInGuard: CanActivateFn = () => {
  const isAuthenticated = inject(AuthStore).isAuthenticated();
  const router = inject(Router);

  if (!isAuthenticated) {
    router.navigate(['/login']);
  }

  return inject(AuthStore).isAuthenticated();
};
