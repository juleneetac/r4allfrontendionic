import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/serviceUsuario/usuario.service';
import { Modelusuario } from 'src/app/models/modelUsusario/modelusuario';
import { Modeltorneo } from 'src/app/models/modelTorneo/modeltorneo';
import { TorneoService } from 'src/app/services/serviceTorneo/torneo.service';
import { StorageComponent } from 'src/app/storage/storage.component'
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})

export class MainPage implements OnInit {

  constructor(
    private usuariosService: UsuarioService,
    private torneosService: TorneoService,
    private storage: StorageComponent
  ) {  }
  
  usuarioLogueado: Modelusuario;  //Usuario logueado en la Aplicación (ha de venir del Login)
  listaUsuarios: Modelusuario[];  //Lista de Usuarios
  listaTorneos: Modeltorneo[];    //Lista de Torneos

  //Flags para filtrar la lista de Usuarios
  listaUsuariosFlags = [];  //Buscar o no buscar por cada uno de los atributo 
  generoUsuarioValue;       //Valor del Segment de Sexo (m/f)

  //Flags para filtrar la lista de Torneos
  listaTorneosFlags = [];
  pistacubiertaValue: boolean;
  generoTorneoValue;
  modoTorneoValue;
  tipopistaTorneoValue;

  listaUsuariosForm = new FormGroup({
    usernameInput: new FormControl(''),
    maxEdadInput: new FormControl(''),
    minEdadInput: new FormControl(''),
    maxExpInput: new FormControl(''),
    minExpInput: new FormControl(''),
    maxValoracionInput: new FormControl(''),
    minValoracionInput: new FormControl('')
  });

  listaTorneosForm = new FormGroup({
    minParticipantesInput: new FormControl(''),
    maxParticipantesInput: new FormControl('')
  });

  ngOnInit() {
    this.usuarioLogueado = JSON.parse(this.storage.getUser());

    this.listaUsuariosFlags = [Boolean];
    for (let i = 0; i < 8; i++){
      //Por defecto, seleccionar todos como no marcados
      this.listaUsuariosFlags[i] = false;
    }

    this.listaTorneosFlags = [Boolean];
    for (let i = 0; i < 5; i++){
      //Por defecto, seleccionar todos como no marcados
      this.listaTorneosFlags[i] = false;
    }

    this.generoUsuarioValue = 'm';
    this.pistacubiertaValue = false;
    this.generoTorneoValue = 'm';
    this.modoTorneoValue = 'i';

    
    this.getUsuarios();
    this.getTorneos();
  }

  public getUsuarios(){

    interface LooseObject {
      [key: string]: any
    }
    let query:LooseObject = {};
    let queryflags = [];

    if(this.listaUsuariosFlags[0]){
      queryflags[0] = this.listaUsuariosFlags[0];
      Object.assign(query, {'username': this.listaUsuariosForm.get('usernameInput').value});
    }
    if(this.listaUsuariosFlags[1]){
      queryflags[1] = this.listaUsuariosFlags[1];
        //--------- BUSCAR POR UBICACIÓN Y RADIO: QUEDA PENDIENTE ------------//
    }
    if(this.listaUsuariosFlags[2]){
      queryflags[2] = this.listaUsuariosFlags[2];
        Object.assign(query, {'sexo': this.generoUsuarioValue});
    }

    //EDAD (FLAG 3)
    if(this.listaUsuariosFlags[3] || this.listaUsuariosFlags[4]){
      if(this.listaUsuariosFlags[3] && this.listaUsuariosFlags[4]){
        queryflags[3] = 3;
        Object.assign(query, {'edad': [this.listaUsuariosForm.get('minEdadInput').value, this.listaUsuariosForm.get('maxEdadInput').value]});
      }
      else if(this.listaUsuariosFlags[3]){
        queryflags[3] = 1;
        Object.assign(query, {'edad': [this.listaUsuariosForm.get('minEdadInput').value, 0]});
      }
      else{
        queryflags[3] = 2;
        Object.assign(query, {'edad': [0,this.listaUsuariosForm.get('maxEdadInput').value]});
      }
    }
    else{
      queryflags[3] = 0;
    }

    //EXP (FLAG 4)
    if(this.listaUsuariosFlags[5] || this.listaUsuariosFlags[6]){
      if(this.listaUsuariosFlags[5] && this.listaUsuariosFlags[6]){
        queryflags[4] = 3;
        Object.assign(query, {'exp': [this.listaUsuariosForm.get('minExpInput').value, this.listaUsuariosForm.get('maxExpInput').value]});
      }
      else if(this.listaUsuariosFlags[5]){
        queryflags[4] = 1;
        Object.assign(query, {'exp': [this.listaUsuariosForm.get('minExpInput').value, 0]});
      }
      else{
        queryflags[4] = 2;
        Object.assign(query, {'exp': [0,this.listaUsuariosForm.get('maxExpInput').value]});
      }
    }
    else{
      queryflags[4] = 0;
    }

    //VALORACION (FLAG 5)
    if(this.listaUsuariosFlags[7] || this.listaUsuariosFlags[8]){
      if(this.listaUsuariosFlags[7] && this.listaUsuariosFlags[8]){
        queryflags[5] = 3;
        Object.assign(query, {'valoracion': [this.listaUsuariosForm.get('minValoracionInput').value, this.listaUsuariosForm.get('maxValoracionInput').value]});
      }
      else if(this.listaUsuariosFlags[7]){
        queryflags[5] = 1;
        Object.assign(query, {'valoracion': [this.listaUsuariosForm.get('minValoracionInput').value, 0]});
      }
      else{
        queryflags[5] = 2;
        Object.assign(query, {'valoracion': [0,this.listaUsuariosForm.get('maxValoracionInput').value]});
      }
    }
    else{
      queryflags[5] = 0;
    }

    Object.assign(query, {'flags': queryflags});

    this.usuariosService.getUsuarios(query)
    .subscribe((res) => {
        this.listaUsuarios = res as Modelusuario[];
        console.log(this.listaUsuarios);
      },
      (err) => {
        console.log("err", err);
      }); 
  }


  public getTorneos(){
    
    interface LooseObject {
      [key: string]: any
    }
    let query:LooseObject = {};
    let queryflags = [];

    if(this.listaTorneosFlags[0]){
      queryflags[0] = this.listaTorneosFlags[0];
        //--------- BUSCAR POR UBICACIÓN Y RADIO: QUEDA PENDIENTE ------------//
    }
    if(this.listaTorneosFlags[1]){
      queryflags[1] = this.listaTorneosFlags[1];
      Object.assign(query, {'pistacubierta': this.pistacubiertaValue});
    }
    if(this.listaTorneosFlags[2]){
      queryflags[2] = this.listaTorneosFlags[2];
      Object.assign(query, {'tipopista': this.tipopistaTorneoValue });
    }
    if(this.listaTorneosFlags[3]){
      queryflags[3] = this.listaTorneosFlags[3];
      Object.assign(query, {'modo': this.modoTorneoValue });
    }

    //NUM. PARTICIPANTES (FLAG 4)
    if(this.listaTorneosFlags[4] || this.listaTorneosFlags[5]){
      if(this.listaTorneosFlags[4] && this.listaTorneosFlags[5]){
        queryflags[4] = 3;
        Object.assign(query, {'participantes': [this.listaTorneosForm.get('minParticipantesInput').value, this.listaTorneosForm.get('maxParticipantesInput').value]});
      }
      else if(this.listaTorneosFlags[4]){
        queryflags[4] = 1;
        Object.assign(query, {'participantes': [this.listaTorneosForm.get('minParticipantesInput').value, 0]});
      }
      else{
        queryflags[4] = 2;
        Object.assign(query, {'participantes': [0,this.listaTorneosForm.get('maxParticipantesInput').value]});
      }
    }
    else{
      queryflags[4] = 0;
    }

    Object.assign(query, {'flags': queryflags});

    
    this.torneosService.getTorneos(query)
    .subscribe(res => {
      this.listaTorneos = res as Modeltorneo[];
      console.log(this.listaTorneos);
    },
    (err) => {
      console.log("err", err);
    });
  }

  //----------FUNCIONES PARA LA PAGE----------//
  generoUsuarioSegmentChanged(ev){
    this.generoUsuarioValue = ev.detail.value;
  }

  pistacubiertaToggleChanged(){
    this.pistacubiertaValue = !this.pistacubiertaValue;
  }

  modoTorneoSegmentChanged(ev){
    this.modoTorneoValue = ev.detail.value;
  }

  /* generoTorneoSegmentChanged(ev){
    this.generoTorneoValue = ev.detail.value;
  } */

}