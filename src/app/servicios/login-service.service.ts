import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  private url="https://crowded-nananne-techforb-d7dd33b6.koyeb.app/login";
  //urlGetUsuarios = 'http://localhost:8080/usuarioGet';
  currentUserSubject: BehaviorSubject<any>;
  constructor(private http: HttpClient) {
  this.currentUserSubject = new BehaviorSubject<any>(sessionStorage.getItem('currentUser')|| '{}');
  }
    iniciarSesion(credenciales:any):Observable<any> {
    return this.http.post(this.url, credenciales, { responseType: 'text' }).pipe(map(data =>{
      sessionStorage.setItem('currentUser', JSON.stringify(data));
      this.currentUserSubject.next(data);
      return data;
    }))
  }



get UsuarioAutenticado() {

  return this.currentUserSubject.value;

}

  }

















