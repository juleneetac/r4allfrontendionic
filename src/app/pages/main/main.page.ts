import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/serviceUsuario/usuario.service';
import { Modelusuario } from 'src/app/models/modelUsusario/modelusuario';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor(private usuariosService: UsuarioService) { }

  usuarios: Modelusuario[];

  ngOnInit() {
  }

  public getUsuarios(){   //obtengo todos los usuarios
    this.usuariosService.getUsuarios().subscribe(
      (data) => {
        this.usuarios = data;
        console.log(this.usuarios);
      },
      (err) => {
        console.log("err", err);
      }
    ) 
  }
}
