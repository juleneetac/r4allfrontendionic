import { Component, OnInit } from '@angular/core';
import { Modelusuario } from 'src/app/models/modelUsusario/modelusuario';
import { UsuarioService } from 'src/app/services/serviceUsuario/usuario.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Ambiente } from 'src/app/services/ambiente';
import { MapsService } from 'src/app/services/serviceMaps/maps.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  constructor(
    private usuariosService: UsuarioService,
    private mapsService: MapsService,
    private ambiente: Ambiente
  ) { }

  listaUsuarios: Modelusuario[];  //Lista de Usuarios
  
  visibleFilters: boolean;  //Indica si la lista de filtros está visible o no

  listaUsuariosFlags = [];  //Flags para filtrar la lista de Usuarios
  generoValue;              //Valor del Segment de sexo del Usuario (m/f)
  rangoValue;               //Valor del Range de ubicación

  //Form para filtrar la lista de Usuarios
  listaUsuariosForm = new FormGroup({
    usernameInput: new FormControl(''),
    maxEdadInput: new FormControl(''),
    minEdadInput: new FormControl(''),
    maxExpInput: new FormControl(''),
    minExpInput: new FormControl(''),
    maxValoracionInput: new FormControl(''),
    minValoracionInput: new FormControl('')
  });

  ngOnInit() {
    this.listaUsuariosFlags = [Boolean];
    for (let i = 0; i < 8; i++){
      //Por defecto, seleccionar todos como no marcados
      this.listaUsuariosFlags[i] = false;
    }

    this.visibleFilters = false;

    this.generoValue = 'm';

    this.getUsuarios();
  }

  public async getUsuarios(){

    let position;
    await this.mapsService.getCurrentPosition().then(pos => { position = pos as [number]; });

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
      Object.assign(query, { 'punto': { 'type': "Point", 'coordinates': position }});
      Object.assign(query, { 'radio': (this.rangoValue * 1000) });
    }
    if(this.listaUsuariosFlags[2]){
      queryflags[2] = this.listaUsuariosFlags[2];
        Object.assign(query, {'sexo': this.generoValue});
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
    .subscribe((usrs) => {
        this.listaUsuarios = usrs as Modelusuario[];
        console.log(this.listaUsuarios);
      },
      (err) => {
        console.log("err", err);
      }); 
  }

  toggleVisibleFilters(){
    this.visibleFilters = !this.visibleFilters;
  }

  generoSegmentChanged(ev){
    this.generoValue = ev.detail.value;
  }

  updateRangoValue(event){
    this.rangoValue = event.detail.value;
  }
}
