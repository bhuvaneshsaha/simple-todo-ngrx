import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AccessTokenResponseDto } from './models/auth.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  login(
    username: string,
    password: string
  ): Observable<AccessTokenResponseDto> {
    return this.http.post<AccessTokenResponseDto>('/api/login', {
      email: username,
      password,
    });
  }
}
