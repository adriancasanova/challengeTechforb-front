
import { HttpErrorResponse, HttpInterceptorFn, HttpHandlerFn, } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { LoginServiceService } from './servicios/login-service.service';

export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const userSrv  = inject(LoginServiceService);
  let loggedUserData : any;
  const localData = sessionStorage.getItem('currentUser');
  if(localData != null) {
    loggedUserData =  JSON.parse(localData);
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${loggedUserData.token}`,
      },
    });

  }
  console.log("El interceptor esta corriendo" + JSON.stringify(loggedUserData));
  return next(req);
  }












  /*
  const cloneRequest =  req.clone({
    setHeaders:{
      Authorization: `Bearer ${loggedUserData.token}`
    }
  });

  return next(cloneRequest).pipe(
    catchError((error: HttpErrorResponse)=>{
      debugger;
      return throwError(error)
    } )

  );
  console.log("la data del servicio de autenticacion es", loggedUserData)
  return next(req);
*/











