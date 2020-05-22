import { Component, OnInit } from '@angular/core';
import { Map, tileLayer, marker } from 'leaflet';
import * as L from 'leaflet';
import { Modelusuario } from 'src/app/models/modelUsusario/modelusuario';
import { Modeltorneo } from 'src/app/models/modelTorneo/modeltorneo';
import { UsuarioService } from 'src/app/services/serviceUsuario/usuario.service';
import { TorneoService } from 'src/app/services/serviceTorneo/torneo.service';
import { MapsService } from 'src/app/services/serviceMaps/maps.service';
import { StorageComponent } from 'src/app/storage/storage.component';
import { Ambiente } from 'src/app/services/ambiente';

@Component({
  selector: 'app-mapas',
  templateUrl: './mapas.page.html',
  styleUrls: ['./mapas.page.scss'],
})
export class MapasPage implements OnInit {

  constructor(
    private usuarioService: UsuarioService, 
    private torneoService: TorneoService, 
    private mapsService: MapsService,
    private storage: StorageComponent,
    private ambiente: Ambiente
  ) 
  {  }

  mymap: Map;
  marker: any;
  popup: any;

  usuarioLogueado: Modelusuario;
  
  //----- LAS VARIABLES DECLARADAS GLOBALMENTE NO SE GUARDAN-----//

  listaUsuarios: Modelusuario[];  //Lista de Usuarios
  listaTorneos: Modeltorneo[];    //Lista de Torneos

  redMarker: any;
  greenMarker: any;
  goldMarker: any;

  ngOnInit() {
    this.mymap = new Map('mapid');

    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
      attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      /*
      maxZoom: 18, 
      tileSize: 512, 
      zoomOffset: -1
      */
    }).addTo(this.mymap);

    this.mymap.on('click', this.onMapClick);

    this.usuarioLogueado = JSON.parse(this.storage.getUser());

    this.listaUsuarios = [];
    this.listaTorneos = [];

    this.redMarker = new L.Icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    this.greenMarker = new L.Icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    this.goldMarker = new L.Icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  }

  /* 
  ionViewDidLoad(){

  } */

  async ionViewDidEnter(){
    await this.loadMap();
    await this.loadUsuarios();

  }
  
  async loadMap(){

    let position;
    await this.mapsService.getCurrentPosition().then(pos => { position = pos as [number]; });

    //let mypopup = R.responsivePopup({ closeOnClick: true, autoClose: true, hasTip: true, offset: [15, 20]}).setContent("<div><ion-chip color=\"primary\"><ion-avatar><img src=\""+ this.ambiente.path + this.usuarioLogueado.rutaimagen + "\"/></ion-avatar><ion-label>"+this.usuarioLogueado.username+"</ion-label></ion-chip></div>");

    L.marker([position[1],position[0]], {icon: this.redMarker})
    .bindPopup("<div><ion-chip color=\"primary\"><ion-avatar><img src=\""+ this.ambiente.path + this.usuarioLogueado.rutaimagen + "\"/></ion-avatar><ion-label>"+this.usuarioLogueado.username+"</ion-label></ion-chip></div>", {minWidth: 150, closeOnClick: true, autoClose: true})
    .addTo(this.mymap).openPopup();

    this.mymap.setView([position[1], position[0]], 16);

  }

  onMapClick(e) {
    console.log(this);
    let lat = parseFloat(e.latlng.lat);
    let long = parseFloat(e.latlng.lng);
    console.log("You clicked the map at " + e.latlng.lat + " " + e.latlng.lng);
    console.log(this.mymap);
    L.marker([lat, long], {icon: this.greenMarker}).bindPopup("Has pulsado aquí").addTo(this.mymap).openPopup();
  }

  loadUsuarios(){
    this.usuarioService.getAllUsuarios()
    .subscribe((usrs) => {
      this.listaUsuarios = usrs as Modelusuario[];
      console.log(this.listaUsuarios);
      
      this.listaUsuarios.forEach((usuario) => {
        try{
            L.marker([usuario.punto.coordinates[1], usuario.punto.coordinates[0]])
            .bindPopup("<ion-chip color=\"primary\"><ion-avatar><img src=\""+ this.ambiente.path + usuario.rutaimagen + "\"/></ion-avatar><ion-label>"+ usuario.username +"</ion-label></ion-chip>", {minWidth: 150, closeOnClick: true, autoClose: true})
            .addTo(this.mymap);
        }
        catch(err){
          console.log("No se ha podido cargar ubicación del Usuario ", usuario.username);
        }
      });
    },
    (err) => {
      console.log("err", err);
    });
  }

  testReverseGeocode(){
    this.mapsService.getReverseGeocode(41.2755526,1.9872382)
    .subscribe((res) => { 
      let ciudad: any = res.address.town;
      console.log(ciudad);
    });
  }

/*   async getTorneos(){
    this.torneoService.getAllTorneos()
    .subscribe((trns) => {
      this.listaTorneos = trns as Modeltorneo[];
    },
    (err) => {
      console.log("err", err);
    });
  } */

}
