import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from '../Auth/Services/auth.service';
import {inject} from '@angular/core';
import {AlertComponent} from '../../Shared/Components/alert/alert.component';
export const authGuard: CanActivateFn = (route, state): boolean => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if(authService.isAuthenticatedCookie()){
    return true;
  }
  router.navigate(['/login']);
  return false;
};
