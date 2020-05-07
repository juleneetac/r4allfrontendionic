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
import { StorageComponent } from 'src/app/storage/storage.component';
import { Modellogin } from 'src/app/models/modelLogin/modellogin';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

//import crypto = require('crypto-browserify');

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuario: Modelusuario;
  user = JSON.parse(this.storage.getUser());
  usernombre = this.user.username;
  validation_messages: any;  //para los validators
  editperfilForm: FormGroup;  //para los validators
  pass1: string;
  difpass: string;
  mail: string = this.user.mail;
  edad: number = this.user.edad;
  sexo: string = this.user.sexo;
  ubicacion: string = this.user.ubicacion;
  //salt: string;
  //hash: string;
  //user: Modelusuario

 /*  usernombre = localStorage.getItem("username"); */
/* passold = localStorage.getItem("password"); */
  passold: string;
 //id: string;
 
  avatar

  file: File;
  photoSelected: string | ArrayBuffer

  constructor(
    private usuariosSevice: UsuarioService,
    private storage: StorageComponent,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    public toastController: ToastController,
    ) {
      this.editperfilForm = this.formBuilder.group({
    
        pass1: new FormControl('', Validators.compose([  //se pone el nombre del form control donde pone formControlName
            Validators.required,
            //Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).+$/),
            Validators.minLength(3)])),
    
        difpass: new FormControl('', Validators.compose([  //se pone el nombre del form control donde pone formControlName
            Validators.required,
            //Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).+$/),
            Validators.minLength(3)])),
            
        mail: new FormControl(this.user.mail, Validators.compose([
            Validators.required,
            Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]))
        ,
    
        edad: new FormControl('', Validators.compose([
              Validators.required,
              Validators.pattern(/^[0-9]+$/)])),
    
        sexo: new FormControl('', Validators.compose([
              Validators.required,
              Validators.pattern(/^[mf]$/)])),  
    
        ubicacion: new FormControl('', Validators.compose([
                Validators.required,])),  
      },
    
      // {
      //   validators: this.difpassword.bind(this)
      // }
    
      );
     }
  ngOnInit() {

    this.validation_messages = {
      'pass1': [
        { type: 'required', message: 'Password is required'},
        //{ type: 'pattern', message: 'Debe contener almenos una minúsucla, mayúscula, un número y un carácter especial'},
        { type: 'minlength', message: 'Minimo 3 letras o números'}
      ],
  
      'difpass': [
        { type: 'required', message: 'Password is required'},
        //{ type: 'pattern', message: 'Debe contener almenos una minúsucla, mayúscula, un número y un carácter especial'},
        { type: 'minlength', message: 'Minimo 3 letras o números'}
      ],

      'mail': [
        { type: 'required', message: 'Email is required' },
        { type: 'unique', message: 'Email must be unique'} ,
        { type: 'pattern', message: 'It must be valid. Must contain a @ and only one dot in the domain' }
      ],
  
      'edad': [
        { type: 'required', message: 'Age is required'},
        { type: 'pattern', message: 'Debe ser un numero'}
      ],
      'sexo': [
        { type: 'required', message: 'Sexo is required'},
        { type: 'pattern', message: 'Pon " m " para masculino y " f " para femenino'}
      ],
      'ubicacion': [
        { type: 'required', message: 'Especifique ubicación'}
      ],
  }
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
getIdOfUser(usernombre){
    console.log(this.usernombre);
    this.usuariosSevice.getIdOfUser(this.usernombre)
    .subscribe(
      (res) => {
        this.user._id = res as string;
        console.log(res);
        console.log("pppoa pppoe")
        console.log(this.user._id);
      },
      (err) => {
        console.log(err);
      });
  }


getPassOfUser(id){
  console.log("getpass")
console.log(this.user._id)
console.log(id);
this.usuariosSevice.getPassOfUser(this.user._id)
.subscribe(
  (res) => {
    this.passold = res as string;
    console.log(res);
    console.log("eeeeeeeee")
    console.log(this.passold);
  },
  (err) => {
    console.log(err);
  });
}

/* getAvatarOfUser(){
  console.log(this.id);
  this.usuariosSevice.getAvatarOfUser(this.id)
  .subscribe(
    (res) => {
      this.avatar = res;
      console.log(res);
      console.log("uiuiui")   
    },
    (err) => {
      console.log(err);
    });
} */

goProfile() {
  this.router.navigateByUrl("profile")
}

  updatePerfil (event2){//, experiencia: HTMLInputElement){
    event.preventDefault()
    console.log(event2)
 
    console.log(this.usernombre)
    console.log(this.pass1);
    console.log(this.difpass);
    console.log(this.mail);
    console.log(this.sexo);
    console.log(this.ubicacion);
    console.log(this.edad);
    //console.log(experiencia.value);
    console.log(this.user._id);
    let credencial: Modellogin = new Modellogin(this.user.username, this.pass1)
    this.usuarioService.login(credencial).subscribe(  //para comparar contraseña que sea la correcta
      async res =>{
              //console.log(res);
              //confirm('login correcto');
              const toast = await this.toastController.create({
                message: 'Updated usuario',
                position: 'top',
                duration: 2000,
                color: 'success',
              });
              if(this.file == undefined){
                this.usuariosSevice.updateUsuarionofoto(this.difpass, this.mail, this.sexo, this.ubicacion, this.edad, this.user._id)
                .subscribe(  //para actualizar el usuario con lo que quiero editar
                          async res => {
                          console.log(res);
                          const response: any = res;
                         // this.usuario = response.usuario;
                          //this.usuario.jwt = response.jwt;
                          //console.log(this.usuario.username, this.usuario.mail, this.usuario.sexo);
                          //Save info locally
                          //await this.storage.saveToken(this.usuario.jwt);
                          //await this.storage.saveUser(JSON.stringify(this.usuario));
                          await this.goProfile();
                          await toast.present();
                        },
                        (err) => {
                          console.log(err);
                        });
              }

              else{
              this.usuariosSevice.updateUsuario(this.difpass, this.mail, this.sexo, this.ubicacion, this.edad, this.file, this.user._id)
              .subscribe(  //para actualizar el usuario con lo que quiero editar
                        async res => {
                        console.log(res);
                        const response: any = res;
                       // this.usuario = response.usuario;
                        //this.usuario.jwt = response.jwt;
                        //console.log(this.usuario.username, this.usuario.mail, this.usuario.sexo);
                        //Save info locally
                        //await this.storage.saveToken(this.usuario.jwt);
                        //await this.storage.saveUser(JSON.stringify(this.usuario));
                        await this.goProfile();
                        await toast.present();
                      },
                      (err) => {
                        console.log(err);
                      });  
              
                  }
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
  else if  (err.status == 402) {
    console.log('La contraseña antogua no coincide, vuelve a probar');
    const toast = await this.toastController.create({
      message: 'La contraseña antogua no coincide, vuelve a probar',
      position: 'bottom',
      duration: 2000,
    });
    await toast.present();
    
  }
  
}
      }
        


  //this.salt = crypto.randomBytes(16).toString('hex'); //pruebo a ver 
  //this.hash = crypto.pbkdf2Sync(this.pass1, this.salt, 10000, 512, 'sha512').toString('hex');

    // if(this.pass1 == this.user.hash) //la que está al iniciar sesión
    //   {
    //     this.usuariosSevice.updateUsuario(this.difpass, this.mail, this.sexo, this.ubicacion, this.edad, this.file, this.user._id)
    //       .subscribe(
    //         async res => {
    //         console.log(res);
    //       },
    //       (err) => {
    //         console.log(err);
    //       });  
        
    //   }
    // else{
    //   console.log("el mail debe ser", this.mail)
    //   alert("Error, la contraseña antigua no coincide");
    // } 

    // }


   /* getUser(id){
    this.usuariosSevice.getUser(id)
    .subscribe(
      (res) => {
        this.user = res;
        console.log(res);
        console.log (this.user);
      },
      (err) => {
        console.log(err);
      });
  }  */


  //validar password
// difpassword(formGroup: FormGroup) {
//   const { value: pass1 } = formGroup.get('pass1');
//   const { value: difpass } = formGroup.get('difpass');
//   return pass1 !== difpass ? null : { passwordNotMatch: true };
// }

