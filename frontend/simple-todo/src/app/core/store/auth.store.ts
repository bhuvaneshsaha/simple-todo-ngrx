import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { AuthService } from '../services/auth.service';
import { DateUtil } from '../../shared/utils/date-util';
import { Router } from '@angular/router';

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  expiresIn: number | null;
};

const authState = localStorage.getItem('auth-state');

const initialState: AuthState = {
  accessToken: authState ? JSON.parse(authState).accessToken : null,
  refreshToken: authState ? JSON.parse(authState).refreshToken : null,
  expiresIn: authState ? JSON.parse(authState).expiresIn : null,
};

export const AuthStore = signalStore(
  withState(initialState),
  withComputed(({ accessToken, expiresIn }) => ({
    isAuthenticated: computed(() => !!accessToken()),
    isExpired: computed(() =>
      DateUtil.isExpired(expiresIn() ? expiresIn()! : 0)
    ),
  })),
  withMethods(
    (store, authService = inject(AuthService), router = inject(Router)) => ({
      login(username: string, password: string) {
        authService.login(username, password).subscribe((response) => {
          patchState(store, (state) => {
            state.accessToken = response.accessToken;
            state.refreshToken = response.refreshToken;
            state.expiresIn = DateUtil.calculateExpirationTime(
              response.expiresIn
            );
            router.navigate(['/']);
            localStorage.setItem('auth-state', JSON.stringify(state));
            return state;
          });
        });
      },
      logout() {
        patchState(store, (state) => {
          state.accessToken = null;
          state.refreshToken = null;
          state.expiresIn = null;
          router.navigate(['/login']);
          return state;
        });
      },
    })
  )
);
