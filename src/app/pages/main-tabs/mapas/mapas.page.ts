import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Modelusuario } from 'src/app/models/modelUsusario/modelusuario';
import { Modeltorneo } from 'src/app/models/modelTorneo/modeltorneo';
import { UsuarioService } from 'src/app/services/serviceUsuario/usuario.service';
import { TorneoService } from 'src/app/services/serviceTorneo/torneo.service';
import { MapsService } from 'src/app/services/serviceMaps/maps.service';
import { StorageComponent } from 'src/app/storage/storage.component';
import { Ambiente } from 'src/app/services/ambiente';
import { Modelpartida } from 'src/app/models/modelPartida/modelpartida';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

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
    private ambiente: Ambiente,
    public toastController: ToastController
  ) 
  {  }

  mymap: any;
  baseLayer: any;
  redMarker: any;
  greenMarker: any;
  goldMarker: any;

  usuarioLogueado: Modelusuario;
  
  listaUsuarios: Modelusuario[];  //Lista de Usuarios
  listaTorneos: Modeltorneo[];    //Lista de Torneos
  listaPartidas: Modelpartida[];   //Lista de Partidas del Usuario Logueado

  ngOnInit() {

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

    //INICIAR EL MAPA
    this.baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
      attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
      /*
      maxZoom: 20,
      tileSize: 512, 
      zoomOffset: -1
      */
    });

    this.mymap = new L.Map('mapid', { layers:[this.baseLayer] });

/*     this.mymap.on('click', (e) => {
      this.mapsService.getReverseGeocode(e.latlng.lat, e.latlng.lng)
      .subscribe((res) => {
        L.marker([e.latlng.lat, e.latlng.lng], { icon: this.goldMarker }).bindPopup(res.display_name).addTo(this.mymap).openPopup();
      });
    }); */

  }

  /* 
  ionViewDidLoad(){

  } */

  async ionViewDidEnter(){
    await this.loadPosition();
    await this.loadUsuarios();
    await this.loadTorneos();
    await this.loadPartidas();
  }
  
  async loadPosition(){
    let position;
    await this.mapsService.getCurrentPosition().then(pos => { position = pos as [number]; });

    //let mypopup = R.responsivePopup({ closeOnClick: true, autoClose: true, hasTip: true, offset: [15, 20]}).setContent("<div><ion-chip color=\"primary\"><ion-avatar><img src=\""+ this.ambiente.path + this.usuarioLogueado.rutaimagen + "\"/></ion-avatar><ion-label>"+this.usuarioLogueado.username+"</ion-label></ion-chip></div>");

    L.marker([position[1],position[0]], {icon: this.redMarker})
    .bindPopup("<div><ion-chip color=\"primary\"><ion-avatar><img src=\""+ this.ambiente.path + this.usuarioLogueado.rutaimagen + "\"/></ion-avatar><ion-label>"+this.usuarioLogueado.username+"</ion-label></ion-chip></div>", {minWidth: 150, closeOnClick: true, autoClose: true})
    .addTo(this.mymap).openPopup();

    this.mymap.setView([position[1], position[0]], 16);
  }

  loadUsuarios(){
    this.usuarioService.getAllUsuarios()
    .subscribe((usrs) => {
      this.listaUsuarios = usrs as Modelusuario[];
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
      console.log("Error", err);
      this.handleError(err);
    });
  }

  loadTorneos(){
    this.torneoService.getAllTorneos()
    .subscribe((trns) => {
      this.listaTorneos = trns as Modeltorneo[];
      this.listaTorneos.forEach((torneo) => {
        try{
            L.marker([torneo.punto.coordinates[1], torneo.punto.coordinates[0]], {icon: this.greenMarker})
            .bindPopup("<ion-chip color=\"primary\"><ion-label>"+ torneo.nombre +"</ion-label></ion-chip><br><strong>Torneo organizado por " + torneo.organizador + "</strong><br><ion-label>"+ torneo.descripcion +"</ion-label><br><p>" + torneo.ubicacion + "</p><a href=\""+ torneo.sitioweb +"\" target=\"_blank\">Sitio Web</a>", {minWidth: 200, closeOnClick: true, autoClose: true})
            .addTo(this.mymap);
        }
        catch(err){
          console.log("No se ha podido cargar ubicación del Torneo", torneo.nombre);
        }
      });
    },
    (err) => {
      console.log("Error", err);
      this.handleError(err);
    });
  }

  loadPartidas(){
    this.usuarioService.getPartidasde(this.usuarioLogueado._id)
    .subscribe((res) => {
      this.listaPartidas = res.partidas as Modelpartida[];
      this.listaPartidas.forEach((partida) => {
        try{
          if(partida.modo == 'i'){
            L.marker([partida.punto.coordinates[1], partida.punto.coordinates[0]], {icon: this.goldMarker})
            .bindPopup("<strong>Partido organizado por " + partida.organizador + "</strong><br><ion-list><ion-list-header><b>Participantes:</b></ion-list-header><ion-item>" + partida.organizador + "</ion-item><ion-item lines=\"none\"><ion-label>"+partida.invitados[0]+"</ion-label></ion-item></ion-list><br><p>" + partida.ubicacion + "</p", {minWidth: 200, closeOnClick: true, autoClose: true})
            .addTo(this.mymap);
          }
          if(partida.modo == 'd'){
            L.marker([partida.punto.coordinates[1], partida.punto.coordinates[0]], {icon: this.goldMarker})
            .bindPopup("<strong>Partido organizado por " + partida.organizador + "</strong><br><ion-list><ion-list-header><b>Participantes:</b></ion-list-header><ion-item>" + partida.organizador + "</ion-item><ion-item lines=\"none\"><ion-label>"+partida.invitados[0]+"</ion-label></ion-item><ion-item lines=\"none\"><ion-label>"+partida.invitados[1]+"</ion-label></ion-item><ion-item lines=\"none\"><ion-label>"+partida.invitados[2]+"</ion-label></ion-item></ion-list><br><p>" + partida.ubicacion + "</p", {minWidth: 200, closeOnClick: true, autoClose: true})
            .addTo(this.mymap);
          }  
        }
        catch(err){
          console.log("No se ha podido cargar ubicación de la Partida");
        }
      });
    },
    (err) => {
      console.log("Error", err);
      this.handleError(err);
    });
  }

  private async handleError(err: HttpErrorResponse) {
    const toastERROR = await this.toastController.create({
      message: `${err.status} | ${err.error}`,
      duration: 4000,
      position: 'bottom',
      color: 'danger'
    });
    await toastERROR.present();
}

}
