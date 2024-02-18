import { Component, input } from '@angular/core';
import { Task } from '../../../core/models/task';
import { TodoItemComponent } from './todo-item.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoItemComponent],
  template: `
    <div class="todo-list overflow-auto flex flex-col gap-2">
      @for (item of tasks(); track item.id) {
        <app-todo-item [task]="item"></app-todo-item>
      } @empty {
        <div>There are no items.</div>
      }
    </div>
  `,
  styles: `
    .todo-list::-webkit-scrollbar {
      width: 0.2em;
    }

    .todo-list::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    .todo-list::-webkit-scrollbar-thumb {
      background-color: darkgrey;
      outline: 1px solid slategrey;
    }
  `,
})
export class TodoListComponent {
  tasks = input.required<Task[]>();
}
