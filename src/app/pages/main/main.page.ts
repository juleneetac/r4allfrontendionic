import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/serviceUsuario/usuario.service';
import { Modelusuario } from 'src/app/models/modelUsusario/modelusuario';
import { Modeltorneo } from 'src/app/models/modelTorneo/modeltorneo';
import { TorneoService } from 'src/app/services/serviceTorneo/torneo.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor(
    private usuariosService: UsuarioService,
    private torneosService: TorneoService
  ) { }

  listausuarios: Modelusuario[];       //Lista de Usuarios
  listatorneos: Modeltorneo[];         //Lista de Torneos
  usuariologueado: Modelusuario;  //Usuario logueado en la Aplicación (ha de venir del Login)

  ngOnInit() {
    //-------- PRUEBA DE USUARIOLOGUEADO --------//
    this.usuariologueado = new Modelusuario();
    this.usuariologueado.username = "Lorem Ipsum";

    this.getUsuarios();
    this.getTorneos();
  }

  public getUsuarios(){
    let filtros = {
      //Recoger valores de los inputs

      //-----PRUEBA: Con esto se muestran todos los Usuarios-----//
      "flags": [false, false, 0, 0, 0]
      
/*       "ubicacion": "Castelldefels",
      "radio": 50,
      "sexo": "hombre",
      "edad": [20,50],
      "exp": [0,1200],
      "valoracion": [0,5] */
    }

    this.usuariosService.getUsuarios(filtros)
    .subscribe((res) => {
        this.listausuarios = res as Modelusuario[];
        console.log(this.listausuarios);
      },
      (err) => {
        console.log("err", err);
      }); 
  }

  public getTorneos(){
    let filtros = {
      //Recoger valores de los inputs

      //-----PRUEBA: Con esto se muestran todos los Torneos-----//
      "flags": [false, false, false, false, 0]
      
/*       "pistacubierta": false,
      "tipopista": "TierraBatida",
      "modo": "individual",
      "organizador": "5ea577f92b8b46027ccae61b" */
    }

    this.torneosService.getTorneos(filtros)
    .subscribe(res => {
      this.listatorneos = res as Modeltorneo[];
      console.log(this.listatorneos);
    },
    (err) => {
      console.log("err", err);
    });
  }
}
