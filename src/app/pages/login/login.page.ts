import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/serviceUsuario/usuario.service';
import { TorneoService } from 'src/app/services/serviceTorneo/torneo.service';
import { Modelusuario } from 'src/app/models/modelUsusario/modelusuario';
import { Modeltorneo } from 'src/app/models/modelTorneo/modeltorneo';
import { FormGroup, FormControl } from '@angular/forms';
import { Modellogin } from 'src/app/models/modelLogin/modellogin';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/serviceAuth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {constructor(
  private usuarioService: UsuarioService, 
  private torneoService: TorneoService, 
  private router: Router,
  public toastController: ToastController,
  public auth: AuthService,
  ) { }

//usuarios: Modelusuario[]; en el login no es necesario
//torneos: Modeltorneo[];
password: string;
username: string;

//-----PROVISIONAL-----//
miStorage = window.localStorage;

ngOnInit(){
}

//rutas
goMain() {
  this.router.navigateByUrl("main")
}
goProfile() {
  this.router.navigateByUrl("profile")
}


//funciones
loginUser(event){
  event.preventDefault()
  console.log(event)
  let credencial: Modellogin = new Modellogin(this.username, this.password)

  //-----PROVISIONAL-----//
  localStorage.setItem("username", this.username);
  localStorage.setItem("password", this.password);

  this.usuarioService.login(credencial).subscribe(
    async res =>{
            console.log(res);
            //confirm('login correcto');
            const toast = await this.toastController.create({
              message: 'Login correcto',
              position: 'top',
              duration: 2000,
              color: 'success',
            });
            this.auth.loginLocal();
            console.log(String(this.auth.authenticationState));
            await toast.present();
            //rutas
           localStorage.setItem("Usuario",String(credencial.username));
            //this.goProfile();
            this.goMain();
    },
    err => {
      console.log(err);
      this.handleError(err);
    });
}


//errores
private async handleError(err: HttpErrorResponse) {
  if (err.status == 500) {
    console.log('entra')
    const toast = await this.toastController.create({
      message: 'Error',
      position: 'bottom',
      duration: 2000,
    });
    await toast.present();
  } 
  else if  (err.status == 404) {
    console.log('nose');
    const toast = await this.toastController.create({
      message: 'Usuario no existente',
      position: 'bottom',
      duration: 2000,
    });
    await toast.present();
  }
  else if  (err.status == 401) {
    console.log('salida');
    const toast = await this.toastController.create({
      message: 'Unauthorized',
      position: 'bottom',
      duration: 2000,
    });
    await toast.present();
  }
  else if  (err.status == 402) {
    console.log('mal password');
    const toast = await this.toastController.create({
      message: 'Incorrect password',
      position: 'bottom',
      duration: 2000,
    });
    await toast.present();
    
  }
  
}

}

