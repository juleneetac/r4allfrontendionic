import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Ambiente } from '../ambiente';
import { Modeltorneo } from '../../models/modelTorneo/modeltorneo'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TorneoService {

  environment:Ambiente;

  constructor(
    private http: HttpClient,
    
  ) { 
    this.environment = new Ambiente();
  }

  getTorneos(filtros): Observable<Modeltorneo[]> {
    const path = `${this.environment.urlTorneo}/gettrns`;
    return this.http.post<Modeltorneo[]>(path, filtros);
  }
}
