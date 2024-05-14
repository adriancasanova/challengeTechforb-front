import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiUrl: string = 'https://crowded-nananne-techforb-d7dd33b6.koyeb.app/usuarios';
  constructor(private http: HttpClient) { }

  registroUsuario(user: Usuario): Observable<any> {

    return this.http.post(this.apiUrl, user);

  }

}
