import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/serviceUsuario/usuario.service';
import { TorneoService } from 'src/app/services/serviceTorneo/torneo.service';
import { Modelusuario } from 'src/app/models/modelUsusario/modelusuario';
import { Modeltorneo } from 'src/app/models/modelTorneo/modeltorneo';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl  } from '@angular/forms';
import { Modellogin } from 'src/app/models/modelLogin/modellogin';
import { HttpErrorResponse } from '@angular/common/http';
import { Modelregister } from 'src/app/models/modelRegister/modelregister';
import { getLocaleMonthNames } from '@angular/common';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ChatService } from 'src/app/services/serviceChat/chat.service';
import { MapsService } from '../../services/serviceMaps/maps.service';
import { StorageComponent } from 'src/app/storage/storage.component';
import { AuthService } from 'src/app/services/serviceAuth/auth.service';
import { Socket } from 'ng-socket-io';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;   //para los validators
  validation_messages: any;  //para los validators
  username: string;
  mail: string;
  pass: string;
  confirmpass: string;
  edad: number;
  sexo: string;
  ubicacion: string;
  punto;
  usuario: Modelusuario;

constructor(
  
  private usuarioService: UsuarioService, 
  private torneoService: TorneoService, 
  private router: Router,  
  private formBuilder: FormBuilder,
  public toastController: ToastController,
  private chatService: ChatService,
  private mapsService: MapsService,
  private storage: StorageComponent,
  public auth: AuthService,
  private socket: Socket
  ) { 

  this.chatService.setSocket(socket); //para iniciar el socket de primeras
  

  this.registerForm = this.formBuilder.group({

    username: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern(/^[A-Z]+(([',. -][A-Z ])?[a-zA-Z0-9]*)*$/),
      Validators.minLength(3)])),
  
    mail: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)])),

    pass: new FormControl('', Validators.compose([  //se pone el nombre del form control donde pone formControlName
        Validators.required,
        //Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).+$/),
        Validators.minLength(3)])),

    confirmpass: new FormControl('', Validators.compose([  //se pone el nombre del form control donde pone formControlName
        Validators.required,
        //Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).+$/),
        Validators.minLength(3)])),

    edad: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern(/^[0-9]+$/)])),

    sexo: new FormControl('', Validators.compose([
           Validators.required,
          Validators.pattern(/^[mf]$/)])),  

/*     ubicacion: new FormControl('', Validators.compose([
            Validators.required,])),   */
  },

  {
     validators: this.password.bind(this)
  }

  );
}

async ngOnInit() {
  this.validation_messages = {
    'username': [
      { type: 'required', message: 'Name is required'},
      { type: 'unique', message: 'Username must be unique'} ,
      { type: 'pattern', message: 'Debe empezar con mayúsculas y no contener espacios' },
      { type: 'minlength', message: 'Demasiado corto'}
    ],
     'mail': [
       { type: 'required', message: 'Email is required' },
       { type: 'unique', message: 'Email must be unique'} ,
       { type: 'pattern', message: 'It must be valid. Must contain a @ and only one dot in the domain' }
     ],
    'pass': [
      { type: 'required', message: 'Password is required'},
      //{ type: 'pattern', message: 'Debe contener almenos una minúsucla, mayúscula, un número y un carácter especial'},
      { type: 'minlength', message: 'Minimo 3 letras o números'}
    ],

    'confirmpass': [
      { type: 'required', message: 'Password is required'},
      //{ type: 'pattern', message: 'Debe contener almenos una minúsucla, mayúscula, un número y un carácter especial'},
      { type: 'minlength', message: 'Minimo 3 letras o números'}
    ],

    'edad': [
      { type: 'required', message: 'Age is required'},
      { type: 'pattern', message: 'Debe ser un numero'}
    ],
    'sexo': [
      { type: 'required', message: 'Sexo is required'},
      { type: 'pattern', message: 'Pon " m " para masculino y " f " para femenino'}
    ]
    
/*     ,
    'ubicacion': [
      { type: 'required', message: 'Especifique ubicación'}
    ], */
  },

  //Registrar ubicación del usuario cuando se registra
  await this.mapsService.getCurrentPosition()
  .then(pos => {
    let position = pos;
    this.punto = {
      "type": "Point",
      "coordinates": [position[0], position[1]]    //SEGÚN RFC DEL GEOJSON, PARA QUE NO DE ERRORES EN EL MONGO
    }
    this.mapsService.getReverseGeocode(position[1], position[0])
    .subscribe((res) => { 
      if(res.address.city != null){
        this.ubicacion = res.address.city;
      }
      else if(res.address.town != null){
        this.ubicacion = res.address.town;
      }
      else if(res.address.village != null){
        this.ubicacion = res.address.village;
      }
      else {
        this.ubicacion = res.display_name;
      }
    });
  });

}

 //rutas
 goMain() {
  this.router.navigateByUrl("main")
}

//validar password
password(formGroup: FormGroup) {
  const { value: pass } = formGroup.get('pass');
  const { value: confirmpass } = formGroup.get('confirmpass');
  return pass === confirmpass ? null : { passwordNotMatch: true };
}

registerUser(event){
  event.preventDefault()
  console.log(event)
  let credencialr: Modelregister = new Modelregister(this.username, this.mail, this.pass, this.edad, this.sexo, this.ubicacion, this.punto)
  this.usuarioService.registrar(credencialr).subscribe(
    async res =>{
      console.log(res);    
      const toast = await this.toastController.create({
        message: 'Te registraste con éxito',
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

      //rutas
      await this.goMain();

      //send socket username
      this.chatService.connectSocket(this.username)

      //presentacion del toast
      await toast.present();
    },
    async err => {
      console.log(err);
      this.handleError(err);
    });
}

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
  else if  (err.status == 409) {
    console.log('nose');
    const toast = await this.toastController.create({
      message: 'Nombre de usuario ya existe. Pon otro username',
      position: 'bottom',
      duration: 2000,
    });
    await toast.present();
}
  else if  (err.status == 410) {
    console.log('nose');
    const toast = await this.toastController.create({
      message: 'Mail ya registrado. Pon otro mail',
      position: 'bottom',
      duration: 2000,
    });
    await toast.present();
  }
}

}
