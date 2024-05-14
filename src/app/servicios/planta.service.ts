import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Planta } from '../models/planta';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantaService {
  private apiUrl: string = 'https://crowded-nananne-techforb-d7dd33b6.koyeb.app/planta';
  constructor(private http: HttpClient) {}

 postPlanta(planta: Planta) {
   return this.http.post<Planta[]>(this.apiUrl, planta)
   .pipe(map((res: any) => {
     return res;
   }))
 }
 getsPlanta() {
   return this.http.get<Planta[]>(this.apiUrl)
   .pipe(map((res: any) => {
     return res;
   }))
 }

 updatePlanta(planta: Planta, id: number) {
   return this.http.put<Planta[]>(this.apiUrl + "/" + id, planta)
   .pipe(map((res: any) => {
     return res;

   }))
 }
 deletePlanta(id: number) {
   return this.http.delete<Planta[]>(this.apiUrl + "/" + id)
   .pipe(map((res: any) => {
     return res;
   }))
 }
}
