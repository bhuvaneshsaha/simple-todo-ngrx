import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  inject,
} from '@angular/core';
import { AuthStore } from '../auth.store';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  authStore = inject(AuthStore);

  form = new FormGroup({
    email: new FormControl('test@test.com', [
      Validators.email,
      Validators.required,
    ]),
    password: new FormControl('$Pass@321', Validators.required),
  });

  login() {
    const { email, password } = this.form.value;
    this.authStore.login(email!, password!);
  }
}