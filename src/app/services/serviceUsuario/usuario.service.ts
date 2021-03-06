import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";
import { Ambiente } from '../ambiente';
import { Modelusuario } from 'src/app/models/modelUsusario/modelusuario';
import { Modellogin } from 'src/app/models/modelLogin/modellogin';
import { Modelregister } from 'src/app/models/modelRegister/modelregister';

import { Modeltorneo } from 'src/app/models/modelTorneo/modeltorneo';

import { platform } from 'os';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService { 
  loginn: Modellogin;
  ambiente: Ambiente;       

  //-----PRUEBA DE BERNAT-----//
  id: string;
  usernombre = localStorage.getItem("Usuario");
  passold = localStorage.getItem("password");

  constructor(private http: HttpClient) {
    this.ambiente = new Ambiente();
  }

  login(loginn: Modellogin): Observable<Modelusuario>{
    return this.http.post<Modelusuario>(this.ambiente.urlUsuario + '/login', loginn);       //REVISAR !!!! DEVUELVE UN MODELUSUARIO + SU TOKEN !!!
  }

  registrar(register: Modelregister): Observable<Modelusuario>{ 
    return this.http.post<Modelusuario>(this.ambiente.urlUsuario + '/register', register);  //REVISAR !!!! DEVUELVE UN MODELUSUARIO + SU TOKEN !!!
  }

  getUsuarios(filtros: any): Observable<Modelusuario[]>{
    return this.http.post<Modelusuario[]>(this.ambiente.urlUsuario + '/getusrs', filtros);  
  }
  
  getAllUsuarios(): Observable<Modelusuario[]>{  //esto es el observable. me da un array de usuarios
    return this.http.get<Modelusuario[]>(this.ambiente.urlUsuario + '/getallusrs');  //me da todos los usuarios del sistema
  }

  getUsuario(id: string): Observable<Modelusuario>{
    return this.http.get<Modelusuario>(`${this.ambiente.urlUsuario}/getusr/${id}`);  
  }
  
  getUsuariobyusername(username: string): Observable<Modelusuario> {
    return this.http.get<Modelusuario>(this.ambiente.urlUsuario + `/getusrbyname/${username}`);
  }

  updateUsuario(id: string, usuariomodificado:any): Observable<Modelusuario> {
    return this.http.put<Modelusuario>(`${this.ambiente.urlUsuario}/update/${id}`, usuariomodificado);
  }

  getAmigosde(id: string): Observable<Modelusuario>{  //no es un array porque es solo una asignatura lo que le paso
    return this.http.get<Modelusuario>(`${this.ambiente.urlUsuario}/getamigbyuser/${id}`);
  }
  
  getPartidasde(id: string): Observable<Modelusuario>{  //no es un array porque es solo una asignatura lo que le paso
    return this.http.get<Modelusuario>(`${this.ambiente.urlUsuario}/getpartbyuser/${id}`);
  }
  // getTorneosde(id: string): Observable<Modelusuario>{  //no es un array porque es solo una asignatura lo que le paso
  //   return this.http.get<Modelusuario>(`${this.ambiente.urlUsuario}/gettornbyuser/${id}`);
  // }

  addAmigo(idUsuario:string, idAmigo:string) {
    let req = {
      _idUsuario: idUsuario,
      _idAmigo: idAmigo
    }
    return this.http.post(`${this.ambiente.urlUsuario}/addamigo/`, req);
  }

  getTorneosde(id: string): Observable<Modelusuario>{ //Devuelve el Usuario con sus Torneos 'populados'
    const path = `${this.ambiente.urlUsuario}/gettornbyuser/${id}`;
    return this.http.get<Modelusuario>(path); 
  }

  updateImagenUsuario(id:string, photo:File): Observable<Modelusuario>{
    //Para poder enviar la nueva Imagen de perfil (rutaimagen), en caso de haber sido modificada
    const fdImagen = new FormData();
    fdImagen.append('rutaimagen', photo);
    return this.http.put<Modelusuario>(`${this.ambiente.urlUsuario}/updaterutaimagen/${id}`, fdImagen);
  }

  //Tema facebook
  updatefacebookUsuario(id:string, userfacemodified:any): Observable<Modelusuario> {
    return this.http.put<Modelusuario>(`${this.ambiente.urlUsuario}/updatefacebook/${id}`, userfacemodified);
  }

  registrarfacebook(register: Modelregister): Observable<HttpResponse<Modelusuario>>{ 
    return this.http.post<Modelusuario>(this.ambiente.urlUsuario + '/registerfacebook', register, {observe:'response'});  //REVISAR !!!! DEVUELVE UN MODELUSUARIO + SU TOKEN !!!
  }

  deleteUsuario(idUsuario: string){
    return this.http.delete(this.ambiente.urlUsuario + `/deleteuser/${idUsuario}`);
  }

}
