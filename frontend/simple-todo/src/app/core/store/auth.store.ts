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

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  expiresIn: null,
};

export const AuthStore = signalStore(
  withState(initialState),
  withComputed(({ accessToken }) => ({
    isAuthenticated: computed(() => !!accessToken()),
  })),
  withMethods((store, authService = inject(AuthService), router = inject(Router)) => ({
    login(username: string, password: string) {
      authService.login(username, password).subscribe((response) => {
        patchState(store, (state) => {
          state.accessToken = response.accessToken;
          state.refreshToken = response.refreshToken;
          state.expiresIn = DateUtil.calculateExpirationTime(
            response.expiresIn
          );
          router.navigate(['/']);
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
  }))
);
