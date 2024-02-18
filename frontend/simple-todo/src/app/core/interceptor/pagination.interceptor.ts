import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { TaskStore } from '../store/todo.store';
import { inject } from '@angular/core';

export const paginationInterceptor: HttpInterceptorFn = (req, next) => {
  const taskStore = inject(TaskStore);

  next(req).subscribe((response) => {
    if (response instanceof HttpResponse) {
      const pagination = response.headers.get('x-pagination');
      if (pagination) {
        taskStore.updatePagination(
          JSON.parse(response.headers.get('x-pagination')!)
        );
      }
    }
  });

  return next(req);
};
