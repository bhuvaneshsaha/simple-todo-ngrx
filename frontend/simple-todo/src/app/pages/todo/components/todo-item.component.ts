import { Component, input } from '@angular/core';
import { Task } from '../../../core/models/task';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [],
  template: `
    <div class="flex gap-3 border-2 border-orange-800">
      <div>
        <input type="checkbox" [checked]="task().isCompleted" />
      </div>
      <div class="flex flex-col w-full">
        <div>
          <span class="font-bold truncate">{{ task().title }}</span>
        </div>
        <div class="text-xs truncate">
          <span>{{ task().description }}</span>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class TodoItemComponent {
  task = input.required<Task>();
}
