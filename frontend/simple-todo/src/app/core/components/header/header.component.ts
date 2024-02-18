import { Component, inject } from '@angular/core';
import { AuthStore } from '../../../pages/auth/auth.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  authStore = inject(AuthStore);
}
