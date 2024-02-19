import { Routes } from '@angular/router';
import { userLoggedInGuard } from './core/guards/user-logged-in.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/todo/todo.component').then((c) => c.TodoComponent),
    canActivate: [userLoggedInGuard],
    children: [
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./pages/todo/components/todo-item-details.component').then(
            (c) => c.TodoItemDetailsComponent,
          ),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/login/login.component').then(
        (c) => c.LoginComponent,
      ),
  },
];
