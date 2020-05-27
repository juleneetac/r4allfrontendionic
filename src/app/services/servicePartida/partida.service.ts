import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ambiente } from '../ambiente';
import { Modelpartida } from 'src/app/models/modelPartida/modelpartida';
import {Observable} from "rxjs";
import { Modelusuario } from 'src/app/models/modelUsusario/modelusuario';

@Injectable({
  providedIn: 'root'
})
export class PartidaService {
  ambiente: Ambiente; 

  constructor(private http: HttpClient) {
    this.ambiente = new Ambiente();
   }

  addPartida(addpartida: Modelpartida): Observable<Modelpartida>{ 
    return this.http.post<Modelpartida>(this.ambiente.urlPartida + '/addprd', addpartida);
  }

  updateGanador(_id: string, setganador:any): Observable<Modelpartida> {
      return this.http.put<Modelpartida>(`${this.ambiente.urlPartida}/updprd/${_id}`, setganador);
    }
}
