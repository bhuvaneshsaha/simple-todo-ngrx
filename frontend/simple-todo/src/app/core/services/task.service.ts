import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task';
import { TodoParams } from '../models/params/todo-params';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  http = inject(HttpClient);

  getTasks(todoParam: TodoParams): Observable<Task[]> {
    const params = {
      page: todoParam.page.toString(),
      pageSize: todoParam.pageSize.toString(),
      search: todoParam.search,
      sort: todoParam.sort,
      order: todoParam.order,
    };
    return this.http.get<Task[]>('/api/Todo', { params });
  }
}
