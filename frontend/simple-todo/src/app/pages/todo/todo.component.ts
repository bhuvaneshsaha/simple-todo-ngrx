import { Component, inject } from '@angular/core';
import { TaskStore } from '../../core/store/todo.store';
import { TodoParams } from '../../core/models/params/todo-params';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  todoStore = inject(TaskStore);

  constructor() {
    const todoParam: TodoParams = new TodoParams();
    this.todoStore.getTasks(todoParam);
  }
}
