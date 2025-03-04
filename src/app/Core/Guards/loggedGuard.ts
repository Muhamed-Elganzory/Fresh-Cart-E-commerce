import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../Auth/Services/auth.service';

export const loggedGuard: CanActivateFn = (route, state): boolean => {
  const authService: AuthService =  inject(AuthService);
  const router: Router = inject(Router);

  if(authService.isAuthenticatedCookie()){
      router.navigate(['/home']);
      return false;
  }
  return true;
};

