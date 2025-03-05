import { HttpInterceptorFn } from '@angular/common/http';
import {catchError, finalize, throwError} from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';

export const catchErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr: ToastrService = inject(ToastrService);

  return next(req).pipe(catchError((error) => {
    // toastr.error(error.message, 'error', {timeOut: 2000});
    return throwError(() => error);
  }));
};
