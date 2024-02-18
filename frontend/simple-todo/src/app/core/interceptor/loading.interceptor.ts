import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AppStore } from '../store/app.store';
import { tap } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const appStore = inject(AppStore);
  appStore.setLoading(true);

  return next(req).pipe(
    tap({
      next: (response) => {
        if (response instanceof HttpResponse) {
          appStore.setLoading(false);
        }
      },
      error: () => {
        appStore.setLoading(false);
      },
    }),
  );
};
