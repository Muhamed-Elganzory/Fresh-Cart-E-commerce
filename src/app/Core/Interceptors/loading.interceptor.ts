import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {finalize} from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner: NgxSpinnerService = inject(NgxSpinnerService);

  /*
  if(req.url.includes('cart') || req.url.includes('orders')){
    spinner.show('spinner-1');
  }else {
    spinner.show('spinner-2');
  }
  */

  spinner.show('spinner-1');
  return next(req).pipe(finalize(() => {
    spinner.hide('spinner-1');
    // spinner.hide('spinner-2');
  }));
};
