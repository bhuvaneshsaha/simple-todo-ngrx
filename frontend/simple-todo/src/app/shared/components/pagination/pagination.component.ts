import {
  Component,
  EventEmitter,
  Output,
  computed,
  input,
} from '@angular/core';
import { Pagination } from '../../../core/models/pagination';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  pagination = input.required<Pagination>();

  @Output() pageChanged = new EventEmitter<number>();

  isPreviousPageDisabled = computed(() => {
    return this.pagination().CurrentPage <= 1;
  });

  isNextPageDisabled = computed(() => {
    return this.pagination().CurrentPage >= this.pagination().TotalPages;
  });

  nextPage() {
    if (!this.isNextPageDisabled()) {
      this.pageChanged.emit(this.pagination().CurrentPage + 1);
    }
  }

  previousPage() {
    if (!this.isPreviousPageDisabled()) {
      this.pageChanged.emit(this.pagination().CurrentPage - 1);
    }
  }
}
