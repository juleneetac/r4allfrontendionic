import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Ambiente } from '../ambiente';
import { Modeltorneo } from '../../models/modelTorneo/modeltorneo'
import { Observable } from 'rxjs';
import { Participante } from 'src/app/models/modelParticipante/participante'

@Injectable({
  providedIn: 'root'
})
export class TorneoService {

  environment:Ambiente;

  constructor(
    private http: HttpClient
  ) { 
    this.environment = new Ambiente();
  }

  getTorneo(id: string): Observable<Modeltorneo> {
    const path = `${this.environment.urlTorneo}/gettrn/${id}`;
    return this.http.get<Modeltorneo>(path);
  }

  getTorneos(filtros): Observable<Modeltorneo[]> {
    const path = `${this.environment.urlTorneo}/gettrns`;
    return this.http.post<Modeltorneo[]>(path, filtros);
  }

  getAllTorneos(): Observable<Modeltorneo[]> {
    const path = `${this.environment.urlTorneo}/getalltrns`;
    return this.http.get<Modeltorneo[]>(path);
  }

  getParticipantesde(id: string): Observable<Modeltorneo> {
    const path = `${this.environment.urlTorneo}/getparticbytrn/${id}`;
    return this.http.get<Modeltorneo>(path)
  }

  getGanadores(idTorneo: string): Observable<Participante[]> {
    const path = `${this.environment.urlTorneo}/getganadores/${idTorneo}`;
    return this.http.get<Participante[]>(path);
  }

  addTorneo(newTorneo: Modeltorneo): Observable<Modeltorneo> {
    const path = `${this.environment.urlTorneo}/addtrn`;
    return this.http.post<Modeltorneo>(path, newTorneo);
  }

  updateTorneo(id:string, updatedTorneo: Modeltorneo): Observable<Modeltorneo> {
    const path = `${this.environment.urlTorneo}/update/${id}`;
    return this.http.put<Modeltorneo>(path, updatedTorneo);
  }

  addParticipante(newParticipante: Participante): Observable<Participante> {
    const path = `${this.environment.urlTorneo}/addpartic`;
    return this.http.post<Participante>(path, newParticipante);
  }

  addParticipantes(participantes): Observable<any> {
    const path = `${this.environment.urlTorneo}/addpartics`;
    return this.http.post<any>(path, participantes);
  }

  addGanador(torneoId: string, participanteId: string) {
    const path = `${this.environment.urlTorneo}/addganador/${torneoId}`;
    let res = { 
      '_idParticipante': participanteId 
    };
    return this.http.put(path, res);
  }

  addGanadores(torneoId: string, participante1Id: string, participante2Id: string) {
    const path = `${this.environment.urlTorneo}/addganadores/${torneoId}`;
    let res = { 
      '_idParticipante1': participante1Id,
      '_idParticipante2': participante2Id,
    };
    return this.http.put(path, res);
  }

}
