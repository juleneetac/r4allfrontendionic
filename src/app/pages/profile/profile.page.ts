import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/serviceAuth/auth.service';
import { Modelusuario } from 'src/app/models/modelUsusario/modelusuario';
import { UsuarioService } from "../../services/serviceUsuario/usuario.service";
import { StorageComponent } from 'src/app/storage/storage.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  //PerfilLocal: String //ESTO NO SERA UN STRING EN EL FUTURO, SERA UN USER
  
  identificador:string;  //ESTO NO SERA UN STRING EN EL FUTURO, SERA UN USER

  localperfil: string;


  constructor(
    public auth: AuthService, 
    private usuariosSevice: UsuarioService,
    private storage: StorageComponent
    ) { }

    
  ngOnInit() {
    this.localperfil =  JSON.parse(this.storage.getUser());
    //this.PerfilLocal = localStorage.getItem("Usuario");
    console.log(this.localperfil);


    // this.getIdOfUser(this.localperfil);
    // console.log(this.identificador);
    // console.log("aquí estamos profile")
/*     this.getUser(this.identificador);
 */    
    //console.log("brrrrrr")
    //console.log("objeto login")
    //console.log(this.storage.getUser());
    //console.log("objeto login")


   // this.localperfil =  JSON.parse(this.storage.getUser());
    //console.log(this.localperfil);

  }


  getIdOfUser(localperfil){
    console.log(this.localperfil);
    this.usuariosSevice.getIdOfUser(this.localperfil)
    .subscribe(
      (res) => {
        this.identificador = res as string;
        console.log(res);
        console.log("pppoa pppoe")
        console.log(this.identificador);
      },
      (err) => {
        console.log(err);
      });
  }


  /* getUser(identificador:string){
    this.usuariosSevice.getUser(identificador)
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

  
}
