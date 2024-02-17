import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AuthStore } from './pages/auth/auth.store';

const services = [AuthStore];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), ...services],
};
