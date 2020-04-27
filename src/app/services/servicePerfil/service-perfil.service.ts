import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ServicePerfilService {

  id: string;

  usernombre = localStorage.getItem("username");
  passold = localStorage.getItem("password");


  constructor(private http: HttpClient) { }



getuserbyid(username){
return this.http.get("http://localhost:7000/usr/getidofuser/"+`${username}`)
}

update (contraseña2: string, mail: string, sexo: string, ubicacion:string, edad: string, valoracion: string, photo:File, id: string){


  const fd = new FormData();
  const Id = id;
  
    fd.append('username',this.usernombre);
    fd.append('mail',mail);
    fd.append('password',contraseña2);
    fd.append('sexo', sexo);
    fd.append('rutaimagen', photo);
    fd.append('ubicacion',ubicacion);
    fd.append('edad',edad);
    fd.append('valoracion',valoracion);
    return this.http.put("http://localhost:7000/usr/update/"+`${Id}`,fd)
  }
}
