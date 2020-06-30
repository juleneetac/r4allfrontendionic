import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/serviceAuth/auth.service';
import { StorageComponent } from 'src/app/storage/storage.component';
import { Modelusuario } from 'src/app/models/modelUsusario/modelusuario';
import { Ambiente } from 'src/app/services/ambiente';
<<<<<<< HEAD

=======
import { Router, NavigationExtras } from '@angular/router';
>>>>>>> develop
import * as L from 'leaflet';
import { Modeltorneo } from 'src/app/models/modelTorneo/modeltorneo';
import { Modelpartida } from 'src/app/models/modelPartida/modelpartida';
import { UsuarioService } from 'src/app/services/serviceUsuario/usuario.service';
import { TorneoService } from 'src/app/services/serviceTorneo/torneo.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Participante } from 'src/app/models/modelParticipante/participante';

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
    private usuarioService: UsuarioService,
    private torneoService: TorneoService,
    public auth: AuthService,  //se puede quitar creo
    private storage: StorageComponent,
<<<<<<< HEAD

=======
    private router: Router,
    public toastController: ToastController
>>>>>>> develop
  ) { 
      this.ambiente = new Ambiente();
      this.path=this.ambiente.path; 
  }

  localperfil: Modelusuario;
  participantes: Participante[];      //Guarda el Participante del Usuario por cada Torneo         
  historialTorneos: Modeltorneo[];    //Historial de Torneos jugados
  historialPartidas: Modelpartida[];  //Historial de Torneos jugados
    
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

    this.getHistorialTorneos();
    this.getHistorialPartidas();
  }

  goPerfil(){
    this.router.navigateByUrl("perfil");
  }

  goTorneo(torneo: Modeltorneo){
    let navExtras: NavigationExtras = {
      state: {
        torneo: torneo
      }
    }
    this.router.navigate([`torneo-detail/${torneo.nombre}`], navExtras);
  }

  public getHistorialTorneos(){
    this.usuarioService.getTorneosde(this.localperfil._id)
    .subscribe((data) => {
      this.historialTorneos = [];
      data.torneos.forEach(torneo => {
        if(torneo.ganador !== undefined){
          //Representamos solamente los Torneos que hayan finalizado
          this.torneoService.getParticipantesde(torneo._id)
          .subscribe((populatedTorneo) => {
            //Torneo con los Participantes (y parejas, en caso de Dobles) populados

            //Popular el/los Ganador/es
            this.torneoService.getGanadores(populatedTorneo._id)
            .subscribe((ganadores) => {
              populatedTorneo.ganador = ganadores[0] as Participante;
              if(populatedTorneo.modo == 'd'){
                populatedTorneo.ganador2 = ganadores[1] as Participante;
              }
              this.historialTorneos.push(populatedTorneo);

              /* for (let i = 0; i < this.historialTorneos.length; i++) {
                for (let j = 0; j < this.historialTorneos[i].participantes.length; j++) {
                  if(this.historialTorneos[i].participantes[j]._idUsuario == this.localperfil._id){
                    this.participantes[i] = this.historialTorneos[i].participantes[j];
                  }
                }
              }
              console.log("Tus Participantes", this.participantes); */
            });
          },
          (err) => {
            console.log(`No se ha podido cargar el Torneo ${torneo.nombre} `, err);
          });
        }
      });
      console.log('Historial de Torneos:', this.historialTorneos);
    },
    (err) => {
      console.log("err", err);
      this.handleError(err);
    });
  }

  public async getHistorialPartidas(){
    this.usuarioService.getPartidasde(this.localperfil._id)
    .subscribe((data) => {
      this.historialPartidas = [];
      data.partidas.forEach(partida => {
        if(partida.ganador !== undefined){
          //Representamos solamente los Partidos que hayan finalizado
          this.historialPartidas.push(partida);
        }
      });
      console.log('Historial de Partidos:', this.historialPartidas);
      },
      (err) => {
        console.log("err", err);
        this.handleError(err);
      }
    );
  }

/*   getParticipantes(){
    
  } */

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
