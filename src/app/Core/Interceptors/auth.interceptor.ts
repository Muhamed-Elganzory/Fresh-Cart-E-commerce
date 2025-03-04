import { HttpInterceptorFn } from '@angular/common/http';
import {AuthService} from '../Auth/Services/auth.service';
import {inject} from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService);
  if(req.url.includes('cart') || req.url.includes('orders')){
    req = req.clone({
      setHeaders: {
        token: authService.getTokenCookie()!
      }
    })
  }
  return next(req);
};
