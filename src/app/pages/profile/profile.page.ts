import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/serviceAuth/auth.service';
import { Modelusuario } from 'src/app/models/modelUsusario/modelusuario';
import { UsuarioService } from "../../services/serviceUsuario/usuario.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  PerfilLocal: String //ESTO NO SERA UN STRING EN EL FUTURO, SERA UN USER
  
  identificador:string;

  usuario


  constructor(
    public auth: AuthService, private usuariosSevice: UsuarioService
    ) { }

    
  ngOnInit() {
    this.PerfilLocal = localStorage.getItem("Usuario");
    console.log(this.PerfilLocal);


    this.getIdOfUser(this.PerfilLocal);
    console.log(this.identificador);
    console.log("aquí estamos")
/*     this.getUser(this.identificador);
 */    
    console.log("brrrrrr")
    console.log("objeto login")
    console.log(localStorage.getItem('user'));
    console.log("objeto login")


    this.usuario = JSON.parse(localStorage.getItem('user'));
    console.log(this.usuario);

  }


  getIdOfUser(PerfilLocal){
    console.log(this.PerfilLocal);
    this.usuariosSevice.getIdOfUser(this.PerfilLocal)
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
