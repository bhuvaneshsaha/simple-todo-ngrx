import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Task } from '../models/task';
import { inject } from '@angular/core';
import { TaskService } from '../services/task.service';
import { TodoParams } from '../models/params/todo-params';
import { Pagination } from '../models/pagination';

type TaskState = {
  tasks: Task[];
  pagination: Pagination;
  error: string;
};

export const initialState: TaskState = {
  tasks: [],
  error: '',
  pagination: {
    CurrentPage: 1,
    PageSize: 10,
    TotalCount: 0,
    TotalPages: 0,
  },
};

export const TaskStore = signalStore(
  withState(initialState),
  withMethods((store, taskService = inject(TaskService)) => ({
    getTasks() {
      const params: TodoParams = {
        pageNumber: store.pagination.CurrentPage(),
        pageSize: store.pagination.PageSize(),
        order: 'id',
        search: '',
        sort: 'asc',
      };
      taskService.getTasks(params).subscribe({
        next: (tasks) => {
          patchState(store, (state) => {
            state.tasks = tasks;
            state.error = '';
            return state;
          });
        },
        error: (error) => {
          patchState(store, (state) => {
            state.tasks = [];
            state.error = error;
            return state;
          });
        },
      });
    },
    updatePagination(pagination: Pagination) {
      patchState(store, (state) => {
        if (pagination) {
          state.pagination = pagination;
        }
        return state;
      });
    },
    clearPagination() {
      patchState(store, (state) => {
        state.pagination = initialState.pagination;
        return state;
      });
    },
  }))
);
