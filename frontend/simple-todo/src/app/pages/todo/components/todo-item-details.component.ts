import { Component, inject } from '@angular/core';
import { TaskStore } from '../../../core/store/todo.store';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo-item-details',
  standalone: true,
  imports: [],
  template: `
    <div
      tabindex="0"
      class="flex justify-center items-center fixed top-0 bottom-0 left-0 right-0 z-[2] backdrop-blur-lg"
      (click)="$event.stopPropagation(); goBack()"
      (keyup)="({})"
    >
      <div class=" bg-orange-400 font-bold">
        {{ taskStore.activeTask()?.title }}
      </div>
    </div>
  `,
  styles: ``,
})
export class TodoItemDetailsComponent {
  taskStore = inject(TaskStore);
  activatedRoute = inject(ActivatedRoute);

  router = inject(Router);

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.taskStore.setActiveTask(params['id']);
    });
  }

  goBack() {
    this.router.navigate(['']);
  }
}
