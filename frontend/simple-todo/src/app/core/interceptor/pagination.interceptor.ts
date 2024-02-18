import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { TaskStore } from '../store/todo.store';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

export const paginationInterceptor: HttpInterceptorFn = (req, next) => {
  const taskStore = inject(TaskStore);

  return next(req).pipe(
    tap((response) => {
      if (response instanceof HttpResponse) {
        const pagination = response.headers.get('x-pagination');
        if (pagination) {
          taskStore.updatePagination(
            JSON.parse(response.headers.get('x-pagination')!),
          );
        }
      }
      return response;
    }),
  );
};
