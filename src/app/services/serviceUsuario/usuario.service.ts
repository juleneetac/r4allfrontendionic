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

  updateUsuario(id:string, usuariomodificado:any): Observable<Modelusuario> {
    return this.http.put<Modelusuario>(`${this.ambiente.urlUsuario}/update/${id}`, usuariomodificado);
  }

  updateImagenUsuario(id:string, photo:File): Observable<Modelusuario>{
    //Para poder enviar la nueva Imagen de perfil (rutaimagen), en caso de haber sido modificada
    const fdImagen = new FormData();
    fdImagen.append('rutaimagen', photo);
    return this.http.put<Modelusuario>(`${this.ambiente.urlUsuario}/updaterutaimagen/${id}`, fdImagen);
  }
  
/*   updateFotoUsuario(contraseña2: string, mail: string, sexo: string, ubicacion:string, edad: number, id: string, punto): Observable<Modelusuario>{
    var identificador = id;
    var password = contraseña2;
    var mail = mail;
    var sexo = sexo;
    var ubicacion = ubicacion;
    var edad = edad;
    var valoracion = valoracion;
    
    const user = {
      password: password,
      mail: mail,
      sexo: sexo,
      ubicacion: ubicacion,
      edad: edad,
      punto: punto
    }
    console.log(user);
  
    return this.http.put<Modelusuario>(`${this.ambiente.urlUsuario}/updatenofoto/${identificador}`,user)
  } */


}
