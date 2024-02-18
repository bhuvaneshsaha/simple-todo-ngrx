import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../store/auth.store';

export const userLoggedInGuard: CanActivateFn = () => {
  const isAuthenticated = inject(AuthStore).isAuthenticated();
  const isExpired = inject(AuthStore).isExpired();
  const router = inject(Router);

  if (!isAuthenticated) {
    router.navigate(['/login']);
  }

  if (isExpired) {
    inject(AuthStore).logout();
    router.navigate(['/login']);
  }

  return inject(AuthStore).isAuthenticated();
};
