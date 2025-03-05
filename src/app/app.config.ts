import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import {BrowserAnimationsModule, provideAnimations} from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import {NgxSpinnerModule} from 'ngx-spinner';
import {authInterceptor} from './Core/Interceptors/auth.interceptor';
import {loadingInterceptor} from './Core/Interceptors/loading.interceptor';
import {catchErrorInterceptor} from './Core/Interceptors/catch-error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withHashLocation(),
      withViewTransitions(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      }),
    ),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor, loadingInterceptor, catchErrorInterceptor])),
    provideClientHydration(withEventReplay()),
    importProvidersFrom(BrowserAnimationsModule, NgxSpinnerModule),
    provideAnimations(),
    provideToastr(), // Toastr providers
  ]
};
