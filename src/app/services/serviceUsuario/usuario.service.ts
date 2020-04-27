import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { Ambiente } from '../ambiente';
import { Modelusuario } from 'src/app/models/modelUsusario/modelusuario';
import { Modellogin } from 'src/app/models/modelLogin/modellogin';
import { Modelregister } from 'src/app/models/modelRegister/modelregister';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService { 
  loginn: Modellogin;
  ambiente: Ambiente;           //no se lo que hace pero se tiene que poner

  //-----PRUEBA DE BERNAT-----//
  id: string;
  usernombre = localStorage.getItem("username");
  passold = localStorage.getItem("password");


  constructor(private http: HttpClient) {
    this.ambiente = new Ambiente();
  }

  login(loginn: Modellogin): Observable<Modelusuario>{
    return this.http.post<Modelusuario>(this.ambiente.urlUsuario + '/login', loginn);
  }

  registrar(register: Modelregister): Observable<Modelusuario>{ 
    return this.http.post<Modelusuario>(this.ambiente.urlUsuario + '/register', register);
  }

  getUsuarios(filtros): Observable<Modelusuario[]>{
    return this.http.post<Modelusuario[]>(this.ambiente.urlUsuario + '/getusrs', filtros);  
  }

  getUsuario(usuarioid): Observable<Modelusuario>{
    return this.http.get<Modelusuario>(`${this.ambiente.urlUsuario}/getusr/${usuarioid}`);  
  }


  //-----ELIMINARLA CUANDO TENGAMOS EL LOCAL STORAGE-----//
  getIdOfUser(username): Observable<string>{
    return this.http.get<string>(`${this.ambiente.urlUsuario}/getidofuser/${username}`);
  }

  updateUsuario(contraseña2: string, mail: string, sexo: string, ubicacion:string, edad: string, valoracion: string, photo:File, id: string): Observable<Modelusuario>{

    var identificador = id;
    const fd = new FormData();
  
      fd.append('username',this.usernombre);
      fd.append('mail',mail);
      fd.append('password',contraseña2);
      fd.append('sexo', sexo);
      fd.append('rutaimagen', photo);
      fd.append('ubicacion',ubicacion);
      fd.append('edad',edad);
      fd.append('valoracion',valoracion);
      return this.http.put<Modelusuario>(`${this.ambiente.urlUsuario}/update/${identificador}`,fd)
  }

}
