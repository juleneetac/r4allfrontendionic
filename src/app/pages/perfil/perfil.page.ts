import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl  } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { $ } from 'protractor';
import {ServicePerfilService} from "../../services/servicePerfil/service-perfil.service";
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Observable } from "rxjs";

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


file: File;
photoSelected: string | ArrayBuffer

  constructor(private ServicePerfilService: ServicePerfilService) { }
  ngOnInit() {

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


  updatePerfil (contraseña1: HTMLInputElement, contraseña2: HTMLInputElement, mail: HTMLInputElement, sexo: HTMLInputElement, ubicacion:HTMLInputElement, edad: HTMLInputElement, experiencia: HTMLInputElement){
  
  console.log(contraseña1.value);
  console.log(contraseña2.value);
  console.log(mail.value);
  console.log(sexo.value);
  console.log(ubicacion.value);
  console.log(edad.value);
  console.log(experiencia.value);
  
  
   if(contraseña1.value==this.passold) //la que está al iniciar sesión
    {
       this.ServicePerfilService.update(contraseña2.value, mail.value, sexo.value, ubicacion.value, edad.value, experiencia.value, this.file)
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
}
