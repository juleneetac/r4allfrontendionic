import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/serviceAuth/auth.service';
import { StorageComponent } from 'src/app/storage/storage.component';
import { Modelusuario } from 'src/app/models/modelUsusario/modelusuario';
import { Ambiente } from 'src/app/services/ambiente';

import * as L from 'leaflet';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  ambiente: Ambiente; 
  path;

  mymap: any;
  baseLayer: any;

  constructor(
    public auth: AuthService,  //se puede quitar creo
    private storage: StorageComponent,

  ) { 
      this.ambiente = new Ambiente();
      this.path=this.ambiente.path; 
  }

  localperfil: Modelusuario;
    
  ngOnInit() {
    this.localperfil = JSON.parse(this.storage.getUser());

    //INICIAR EL MAPA
    this.baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
      attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
      /*
      maxZoom: 20,
      tileSize: 512, 
      zoomOffset: -1
      */
    });

    this.mymap = new L.Map('mapid3', { layers: [this.baseLayer] });

    //L.marker([this.localperfil.punto.coordinates[0],this.localperfil.punto.coordinates[1]]).bindPopup(this.localperfil.username).addTo(this.mymap).openPopup();
    //this.mymap.setView([this.localperfil.punto.coordinates[0], this.localperfil.punto.coordinates[1]], 18);
  }

  ionViewDidEnter(){
    L.marker([this.localperfil.punto.coordinates[1],this.localperfil.punto.coordinates[0]]).bindPopup(this.localperfil.username).addTo(this.mymap).openPopup();
    this.mymap.setView([this.localperfil.punto.coordinates[1], this.localperfil.punto.coordinates[0]], 16);
  }

}
