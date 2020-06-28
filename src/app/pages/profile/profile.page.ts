import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/serviceAuth/auth.service';
import { StorageComponent } from 'src/app/storage/storage.component';
import { Modelusuario } from 'src/app/models/modelUsusario/modelusuario';
import { Ambiente } from 'src/app/services/ambiente';
import { Router } from '@angular/router';
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
  redMarker: any;

  constructor(
    public auth: AuthService,  //se puede quitar creo
    private storage: StorageComponent,
    private router: Router,
  ) { 
      this.ambiente = new Ambiente();
      this.path=this.ambiente.path; 
  }

  localperfil: Modelusuario;
    
  ngOnInit() {
    this.localperfil = JSON.parse(this.storage.getUser());

    this.redMarker = new L.Icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

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
    L.marker([this.localperfil.punto.coordinates[1],this.localperfil.punto.coordinates[0]], {icon: this.redMarker}).addTo(this.mymap);
    this.mymap.setView([this.localperfil.punto.coordinates[1], this.localperfil.punto.coordinates[0]], 16);
  }

  goPerfil(){
    this.router.navigateByUrl("perfil");
  }

}
