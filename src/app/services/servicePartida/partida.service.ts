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

  getPartidasde(_id:string): Observable<Modelusuario>{  //no es un array porque es solo una asignatura lo que le paso
    return this.http.get<Modelusuario>(this.ambiente.urlUsuario+'/getpartbyuser'+ `/${_id}`);
    }
}
