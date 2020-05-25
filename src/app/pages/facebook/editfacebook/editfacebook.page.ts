import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { StorageComponent } from 'src/app/storage/storage.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/serviceUsuario/usuario.service';
import { Modelusuario } from 'src/app/models/modelUsusario/modelusuario';
import { Modelregister } from 'src/app/models/modelRegister/modelregister';
import { AuthService } from 'src/app/services/serviceAuth/auth.service';
import { Socket } from 'ng-socket-io';
import { ChatService } from 'src/app/services/serviceChat/chat.service';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-editfacebook',
  templateUrl: './editfacebook.page.html',
  styleUrls: ['./editfacebook.page.scss'],
})
export class EditfacebookPage implements OnInit {
  usuario: Modelusuario;
  punto;
  user;
  validation_messages: any;  //para los validators
  editfacebookForm: FormGroup;  //para los validators
  // usernombre = this.user.username;
  // mail: string = this.user.mail;
  edad: number = 33;// = this.user.edad;
  ubicacion: string = "Barcelona";// = this.user.ubicacion;
  // sexo: string = this.user.sexo;
  // punto = this.user.punto;
  imageFile: File;
  photoSelected: string | ArrayBuffer
  profile;
  given_name: string;
  mail: string;
  sexo: string;
  punto2 = {
  "type": "Point",
  "coordinates": [1.9780778999999997, 41.2713734]
  }

  

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private geolocation: Geolocation,
    private storage: StorageComponent,
    public toastController: ToastController,
    private usuarioService: UsuarioService,
    public auth: AuthService, 
    private socket: Socket,
    private chatService: ChatService,
  ) 
  {
    this.editfacebookForm = this.formBuilder.group({
      edad: new FormControl('', Validators.compose([
            Validators.required,
            Validators.pattern(/^[0-9]+$/)])),
  
      ubicacion: new FormControl('', Validators.compose([
              Validators.required,])),  
    },
    );

    this.chatService.setSocket(socket); //para iniciar el socket de primeras

    this.auth.userProfile$.subscribe(   //para coger el usuario que nos pasa facebook
      async res =>{
            console.log(res)
            this.profile = res;     
      }
    )
   }

  ngOnInit() {

    this.validation_messages = {
      'edad': [
        { type: 'required', message: 'Age is required'},
        { type: 'pattern', message: 'Debe ser un numero'}
      ],
      'ubicacion': [
        { type: 'required', message: 'Especifique ubicación'}
      ],
  }

    

    if (this.profile.gender == "male")
    {
      this.sexo = "m"
    }
    else{
      this.sexo = "f"
    }
    console.log(this.sexo)
    
    console.log("TU ERES ESTE " + this.profile.given_name)

    if(!JSON.parse(this.storage.getUser()))
    {
      console.log("memememe")
      this.registerUser();
    }

    //Registrar ubicación del usuario cuando se registra
  this.geolocation.getCurrentPosition().then((geoposition: Geoposition) => {
    console.log(geoposition);
    this.punto = {
      "type": "Point",
      "coordinates": [geoposition.coords.longitude, geoposition.coords.latitude]    //SEGÚN RFC DEL GEOJSON, PARA QUE NO DE ERRORES EN EL MONGO
    }
  });


 }

 onPhotoSelected(event: HtmlInputEvent): void{
  if (event.target.files && event.target.files[0]) {
    this.imageFile = <File>event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => this.photoSelected = reader.result;
    reader.readAsDataURL(this.imageFile);
  }
}

 goProfile() {
  this.router.navigateByUrl("profile")
 }

updatefacebookPerfil (event2){//  FALTA LO DE LA FOTO
  event.preventDefault()
  console.log(event2)
  this.user = JSON.parse(this.storage.getUser());

    //Primero actualizamos el Usuario y luego le actualizamos la Foto si es necesario:
    let userfacemodified = {
      ubicacion: this.ubicacion,  
      punto: this.punto2,          //EN TEORIA DEBERIA SER EL punto y no punto2
      edad: this.edad,
    }

    this.usuarioService.updatefacebookUsuario(this.user._id, userfacemodified).subscribe( //NO COGE EL ID
      async res => {
        const toast = await this.toastController.create({
          message: 'Updated usuario',
          position: 'top',
          duration: 2000,
          color: 'success',
        });
      let usuariomod = res as Modelusuario;
      console.log(usuariomod);
      
      await this.storage.saveUser(JSON.stringify(usuariomod));
      await this.goProfile();
      await toast.present();

    if(this.imageFile != undefined){
      this.usuarioService.updateImagenUsuario(this.user._id, this.imageFile)
      .subscribe(async res => {
        let usuariomod = res as Modelusuario;
        console.log(usuariomod);
        await this.storage.saveUser(JSON.stringify(usuariomod));
        await this.goProfile();
        await toast.present();
      },
      (err) => {
        console.log("err", err);
      });
    }
  },
  err => {
    console.log(err);
    this.handleError(err);
  });
}





  registerUser(){   //SE REGISTRA CON FACEBOOM NADA MAS ENTRAR
    console.log("LLEGAS ¿?")
    let credencialr: Modelregister = new Modelregister(this.profile.given_name, this.profile.email, '', 0, this.sexo, '', this.punto2)
    this.usuarioService.registrarfacebook(credencialr).subscribe(
      async res =>{
        console.log(res);  
        if (res.status == 200){
          const toast = await this.toastController.create({
          message: 'Register con facebook exitoso, tus datos se han guardado',
          position: 'top',
          duration: 2000,
          color: 'success',
        });
        //presentacion del toast
        await toast.present();
      }
      
  
        const response: any = res.body;
        console.log(response);
        console.log(res.body);
        this.usuario = response.usuario;
        console.log(this.usuario.username, this.usuario.mail, this.usuario.sexo);
  
        //Save info locally
        await this.storage.saveUser(JSON.stringify(this.usuario));

        if (res.status == 201){
          const toast = await this.toastController.create({
            message: 'Login con facebook',
            position: 'top',
            duration: 2000,
            color: 'success',
          });
          console.log(this.usuario.rutaimagen)
          //go to profile if the user has logge
          this.goProfile();
          //presentacion del toast
          await toast.present();
        }
  
        //send socket username
        this.chatService.connectSocket(this.profile.given_name)
      },
      async err => {
        console.log(err);
        this.handleError(err);
      });
  }


  //errores
  private async handleError(err: HttpErrorResponse) {
    if (err.status == 500) {
      console.log('Error')
      const toast = await this.toastController.create({
        message: 'Error',
        position: 'bottom',
        duration: 2000,
      });
      await toast.present();
    } 

    if (err.status == 501) {
      console.log('intento actualizar')
      const toast = await this.toastController.create({
        message: 'Error actualizando perfil',
        position: 'bottom',
        duration: 2000,
      });
      await toast.present();
        } 
    if (err.status == 503) {
          console.log('intento actualizar 2 not user found')
          const toast = await this.toastController.create({
            message: 'not user found',
            position: 'bottom',
            duration: 2000,
          });
          await toast.present();
            } 
  }
  


}
