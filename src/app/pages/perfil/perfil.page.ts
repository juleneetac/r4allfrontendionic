import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl  } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { $ } from 'protractor';
import { UsuarioService } from "../../services/serviceUsuario/usuario.service";
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Observable } from "rxjs";
import { strictEqual } from 'assert';
import { Modelusuario } from 'src/app/models/modelUsusario/modelusuario';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  perfilForm: FormGroup;
  username: string;
  mail: string;
  pass: string;
  confirmpass: string;
  edad: number;
  sexo: string;
  ubicacion: string;


  usernombre = localStorage.getItem("username");
  passold = localStorage.getItem("password");

  id: string;
 

file: File;
photoSelected: string | ArrayBuffer

  constructor(private usuariosSevice: UsuarioService) { }
  ngOnInit() {

    this.getuser();

  }

  onPhotoSelected(event: HtmlInputEvent): void{
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

/*   contraseña1, contraseña2, mail, sexo, ubicacion, edad, experiencia
 */
getIdOfUser(){
    console.log(this.usernombre);
    this.usuariosSevice.getIdOfUser(this.usernombre)
    .subscribe(
      (res) => {
        this.id = res as string;
        console.log(res);
        console.log(this.id);
      },
      (err) => {
        console.log(err);
      });

  }

  updatePerfil (contrasena1: HTMLInputElement, contrasena2: HTMLInputElement, mail: HTMLInputElement, sexo: HTMLInputElement, ubicacion:HTMLInputElement, edad: HTMLInputElement, experiencia: HTMLInputElement){
 
  console.log(contrasena1.value);
  console.log(contrasena2.value);
  console.log(mail.value);
  console.log(sexo.value);
  console.log(ubicacion.value);
  console.log(edad.value);
  console.log(experiencia.value);
  console.log(this.id);
  
 
   if(contrasena1.value == this.passold) //la que está al iniciar sesión
    {
       this.usuariosSevice.updateUsuario(contrasena2.value, mail.value, sexo.value, ubicacion.value, edad.value, experiencia.value, this.file, this.id)
        .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        });  
       
    }
  else{
    alert("Error");
  } 

  }

  getuser(){
    this.usuariosSevice.getUsuario(this.id)
    .subscribe(
      (res) => {
        this.username = res.username;
        console.log(res);
      },
      (err) => {
        console.log(err);
      });
  }
}