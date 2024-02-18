import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {
  @Input() perPage = 10;

  @Output() pageSizeUpdated = new EventEmitter<number>();

  pageUpdated() {
    this.pageSizeUpdated.emit(this.perPage);
  }

}
