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
import { StorageComponent } from 'src/app/storage/storage.component';
import { ChatService } from 'src/app/services/serviceChat/chat.service';
import { Socket } from 'ng-socket-io';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: Modelusuario;
  constructor(
  private usuarioService: UsuarioService, 
  private torneoService: TorneoService, 
  private router: Router,
  public toastController: ToastController,
  public auth: AuthService,
  public storage: StorageComponent,
  private chatService: ChatService, 
  private socket: Socket

  ) { 
    this.chatService.setSocket(socket);
  }

password: string;
username: string;

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

  this.usuarioService.login(credencial).subscribe(
    async res =>{
      //console.log(res);
      //confirm('login correcto');
      const toast = await this.toastController.create({
        message: 'Login correcto',
        position: 'top',
        duration: 2000,
        color: 'success',
      });

      
      const response: any = res;
      this.usuario = response.usuario;
      this.usuario.jwt = response.jwt;
      console.log(this.usuario.username, this.usuario.mail, this.usuario.sexo);
      
      //Save info locally
      await this.storage.saveToken(this.usuario.jwt);
      await this.storage.saveUser(JSON.stringify(this.usuario));

      //poner el loginlocal a true para saber que estan logeado
      this.auth.loginLocal();

      await this.goMain();    //Que al loguearte vayas al Main

      this.chatService.connectSocket(this.username)  //se le pasa el usuario  del socket

      //console.log(String(this.auth.authenticationState));
      await toast.present();
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

