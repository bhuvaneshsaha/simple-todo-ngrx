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
  tokenExpiry: Date | null;
};

const authState = localStorage.getItem('auth-state');

const initialState: AuthState = {
  accessToken: authState ? JSON.parse(authState).accessToken : null,
  refreshToken: authState ? JSON.parse(authState).refreshToken : null,
  tokenExpiry: authState ? JSON.parse(authState).expires : null,
};

export const AuthStore = signalStore(
  withState(initialState),
  withComputed(({ accessToken, tokenExpiry }) => ({
    isAuthenticated: computed(() => !!accessToken()),
    isExpired: computed(() => {
      const expiryDate = tokenExpiry(); // Extract the value from the signal
      if (!expiryDate) {
        return true;
      }
      return DateUtil.currentDate() > expiryDate; // Compare the extracted value with the current date
    }),
  })),
  withMethods(
    (store, authService = inject(AuthService), router = inject(Router)) => ({
      login(username: string, password: string) {
        authService.login(username, password).subscribe((response) => {
          patchState(store, (state) => {
            state.accessToken = response.accessToken;
            state.refreshToken = response.refreshToken;
            state.tokenExpiry = DateUtil.addSecondsToCurrentDate(
              60,
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
          state.tokenExpiry = null;
          router.navigate(['/login']);
          return state;
        });
      },
    }),
  ),
);
