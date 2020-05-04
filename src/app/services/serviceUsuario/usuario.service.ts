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
  usernombre = localStorage.getItem("Usuario");
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
  getAllUsuarios(): Observable<Modelusuario[]>{  //esto es el observable. me da un array de usuarios
    return this.http.get<Modelusuario[]>(this.ambiente.urlUsuario + '/getallusrs');  //me da todos los usuarios del sistema
  }

  getUsuario(usuarioid): Observable<Modelusuario>{
    return this.http.get<Modelusuario>(`${this.ambiente.urlUsuario}/getusr/${usuarioid}`);  
  }


  //-----ELIMINARLA CUANDO TENGAMOS EL LOCAL STORAGE-----//
  getIdOfUser(username): Observable<string>{
    return this.http.get<string>(`${this.ambiente.urlUsuario}/getidofuser/${username}`);
  }

  getPassOfUser(id): Observable<string>{
    return this.http.get<string>(`${this.ambiente.urlUsuario}/getpassofuser/${id}`)
  }

 /*  getAvatarOfUser(id) { `${this.ambiente.urlUsuario}/getusr/${id}`
    return this.http.get<string>(`${this.ambiente.urlUsuario}/avatar/${id}`)
  } */
 /*   getUser(_id:string):Observable<Modelusuario> {
    return this.http.get<Modelusuario>("http://localhost:7000/usr/getusr/"+`${_id}`)
  }  */

  updateUsuario(contraseña2: string, mail: string, sexo: string, ubicacion:string, edad: number, photo:File, id: string){

    var identificador = id;
    const fd = new FormData();
  
      //fd.append('username',this.usernombre);
      fd.append('mail',mail);
      fd.append('password',contraseña2);
      fd.append('sexo', sexo);
      fd.append('rutaimagen', photo);
      fd.append('ubicacion',ubicacion);
      fd.append('edad',edad.toString());
      //fd.append('vexp',exp);

      return this.http.put(`${this.ambiente.urlUsuario}/update/${identificador}`,fd)
  }
  
  updateUsuarionofoto(contraseña2: string, mail: string, sexo: string, ubicacion:string, edad: number, id: string){
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
    }
    console.log(user);
  
    return this.http.put(`${this.ambiente.urlUsuario}/updatenofoto/${identificador}`,user)
  }


}
