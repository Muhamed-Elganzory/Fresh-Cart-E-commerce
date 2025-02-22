import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from '../Auth-Components/Services/auth.service';
import {inject} from '@angular/core';
import {AlertComponent} from '../../Shared/Components/alert/alert.component';
export const authGuard: CanActivateFn = (route, state): boolean => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);


  /*
    if(authService.isAuthenticatedLocalStorage()){
      return true;
    }else {
      // console.log(state);
      // console.log(route);
      router.navigate(['/login']);
      return false;
    }
  */

  if(authService.isAuthenticatedCookie()){
    return true;
  }
  router.navigate(['/login']);
  return false;


  // return authService.isAuthenticatedLocalStorage();
  // return authService.isAuthenticatedCookie();
};
