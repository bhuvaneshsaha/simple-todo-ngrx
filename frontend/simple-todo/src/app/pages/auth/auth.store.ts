import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { AuthService } from './auth.service';
import { DateUtil } from '../../shared/utils/date-util';

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
  withMethods((store, authService = inject(AuthService)) => ({
    login(username: string, password: string) {
      authService.login(username, password).subscribe((response) => {
        patchState(store, (state) => {
          state.accessToken = response.accessToken;
          state.refreshToken = response.refreshToken;
          state.expiresIn = DateUtil.calculateExpirationTime(
            response.expiresIn
          );
          return state;
        });
      });
    },
    logout() {
      patchState(store, (state) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.expiresIn = null;
        return state;
      });
    },
  }))
);
