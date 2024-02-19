import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../store/auth.store';

export const userLoggedInGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  if (!authStore.isAuthenticated()) {
    router.navigate(['/login']);
  }

  if (authStore.isExpired()) {
    inject(AuthStore).logout();
    router.navigate(['/login']);
  }

  return inject(AuthStore).isAuthenticated();
};
