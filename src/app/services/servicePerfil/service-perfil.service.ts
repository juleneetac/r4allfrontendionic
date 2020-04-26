import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ServicePerfilService {


  usernombre = localStorage.getItem("username");
  passold = localStorage.getItem("password");


  constructor(private http: HttpClient) { }


update (contraseña2: string, mail: string, sexo: string, ubicacion:string, edad: string, valoracion: string, photo:File){

  const BASE_URI = "http://localhost:7000/perfil/update"
  const fd = new FormData();
  
    fd.append('username',this.usernombre);
    fd.append('mail',mail);
    fd.append('password',contraseña2);
    fd.append('sexo', sexo);
    fd.append('image', photo);
    fd.append('ubicacion',ubicacion);
    fd.append('edad',edad);
    fd.append('valoracion',valoracion);
  

}
