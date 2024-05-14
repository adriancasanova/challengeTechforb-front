import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginServiceService } from './servicios/login-service.service';
import { Subject } from 'rxjs';

export const guardGuard: CanActivateFn = (route, state) => {
  const esta = sessionStorage.getItem('currentUser')
  const userSrv  = inject(LoginServiceService);
  console.log("el guard" + userSrv.UsuarioAutenticado)
  if(esta == null || esta == undefined ) {
    return false
  } else {
    return true
  }

};
