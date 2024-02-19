import { Component, inject } from '@angular/core';
import { TaskStore } from '../../core/store/todo.store';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { FiltersComponent } from '../../shared/components/filters/filters.component';
import { TodoListComponent } from './components/todo-list.component';
import { patchState } from '@ngrx/signals';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    RouterOutlet,
    PaginationComponent,
    FiltersComponent,
    TodoListComponent,
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  todoStore = inject(TaskStore);
  router = inject(Router);
  isRouterActive = false;

  constructor() {
    this.todoStore.getTasks();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isRouterActive = true;
      }
      if (event instanceof NavigationEnd) {
        this.isRouterActive = this.router.url === '/details';
      }
    });
  }

  pageChanged(page: number) {
    patchState(this.todoStore, (state) => {
      state.pagination.CurrentPage = page;
      return state;
    });
    this.todoStore.getTasks();
  }

  pageSizeUpdated(perPage: number) {
    patchState(this.todoStore, (state) => {
      state.pagination.PageSize = perPage;
      return state;
    });
    this.todoStore.getTasks();
  }
}
