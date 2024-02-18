import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthStore } from './core/store/auth.store';
import { authInterceptor } from './core/interceptor/auth.interceptor';
import { TaskStore } from './core/store/todo.store';
import { paginationInterceptor } from './core/interceptor/pagination.interceptor';

const services = [AuthStore, TaskStore];
const interceptors = [authInterceptor, paginationInterceptor];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([...interceptors])),
    ...services,
  ],
};
