import { Component, inject } from '@angular/core';
import { TaskStore } from '../../core/store/todo.store';
import { TodoParams } from '../../core/models/params/todo-params';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { FiltersComponent } from '../../shared/components/filters/filters.component';
import { TodoListComponent } from './components/todo-list.component';
import { patchState } from '@ngrx/signals';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [PaginationComponent, FiltersComponent, TodoListComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  todoStore = inject(TaskStore);

  constructor() {
    this.todoStore.getTasks();
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
