import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { interceptorInterceptor } from './interceptor.interceptor';
import { routes } from './app.routes';
//import { interceptor } from './interceptor/interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(withFetch(), withInterceptors([interceptorInterceptor]))]
};
