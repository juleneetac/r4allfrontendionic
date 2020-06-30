import { Component, OnInit } from '@angular/core';
import { TorneoService } from 'src/app/services/serviceTorneo/torneo.service';
import * as L from 'leaflet';
import { MapsService } from 'src/app/services/serviceMaps/maps.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Modeltorneo } from 'src/app/models/modelTorneo/modeltorneo';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  mymap: any;
  baseLayer: any;
  greenMarker: any;

  selectedMarker: any;

  nombre: any;
  ubicacion: any;
  punto: any;
  organizador: any;
  inscripcion: number;
  premio: any;
  tipobola: any;
  modo: any;
  pistacubierta: boolean;
  genero: any;
  descripcion: any;
  sitioweb: any;
  tipopista: any;
  capacidad: any;

  constructor(
    private mapsService: MapsService,
    private torneosService: TorneoService,
    public toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.genero = 'm';
    this.pistacubierta = false;
    this.modo = 'i';
    this.tipopista = 'TierraBatida';
    
    this.baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
      attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
      /*
      maxZoom: 20,
      tileSize: 512, 
      zoomOffset: -1
      */
    });

    this.greenMarker = new L.Icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    this.mymap = new L.Map('mapid10', { layers: [this.baseLayer] });

    this.mymap.on('click', (e) => {
      if(this.selectedMarker == undefined){
        this.mapsService.getReverseGeocode(e.latlng.lat, e.latlng.lng)
        .subscribe((res) => {
          this.selectedMarker = L.marker([e.latlng.lat, e.latlng.lng], { icon: this.greenMarker }).bindPopup(res.display_name).addTo(this.mymap).openPopup();
          this.ubicacion = res.display_name;
          this.punto = {
          'type': "Point",
          'coordinates': [e.latlng.lng, e.latlng.lat]
          }
        });
      }
      else {
        this.mymap.removeLayer(this.selectedMarker);
        this.mapsService.getReverseGeocode(e.latlng.lat, e.latlng.lng)
        .subscribe((res) => {
          this.selectedMarker = L.marker([e.latlng.lat, e.latlng.lng], { icon: this.greenMarker }).bindPopup(res.display_name).addTo(this.mymap).openPopup();
          this.ubicacion = res.display_name;
          this.punto = {
          'type': "Point",
          'coordinates': [e.latlng.lng, e.latlng.lat]
          }
        });
      }
    });
  }

  async ionViewDidEnter(){
    let position;
    await this.mapsService.getCurrentPosition().then(pos => { position = pos as [number]; });

    this.mymap.setView([position[1], position[0]], 16);
  }

  /* courtSegmentChanged(event){
    this.court = event.detail.value  
  } */
  modoSegmentChanged(event){
    this.modo = event.detail.value
  }
  generoSegmentChanged(event){
    this.genero = event.detail.value
  }
  pistacubiertaSegmentChanged(event){
    if(event.detail.value == "t"){
      this.pistacubierta = true;
    }
    else{
      this.pistacubierta = false;
    }
    //this.pistacubiertaValue = !this.pistacubiertaValue;
  }

  async addTorneo(){

    let torneo = {
      'nombre': this.nombre,
      'ubicacion': this.ubicacion,
      'organizador': this.organizador,
      'inscripcion': this.inscripcion,
      'premio': this.premio,
      'tipobola': this.tipobola,
      'tipopista': this.tipopista,
      'punto': this.punto,
      'genero': this.genero,
      'modo': this.modo,
      'pistacubierta': this.pistacubierta,
      'descripcion': this.descripcion,
      'sitioweb': this.sitioweb,
      'capacidad': this.capacidad
    }

    let newTorneo = torneo as Modeltorneo;

    console.log(newTorneo);

    if((this.nombre!=undefined) && (this.organizador!=undefined) && (this.capacidad!=undefined) && (this.inscripcion!=undefined) && (this.premio!=undefined) && (this.tipobola!=undefined) && (this.punto!=undefined) && (this.tipopista!=undefined) && (this.sitioweb!=undefined) && (this.descripcion!=undefined))
    {
      /* this.torneosService.addTorneo(this.nombre, this.nombreclub, this.organizador, this.inscripcion, this.premio, this.bola, this.punto, this.superficie, this.genero, this.court, this.modo, this.web, this.descripcion)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
          alert("No se ha podido crear el torneo, el campo inscripción debe ser un número")
        }); */

      this.torneosService.addTorneo(newTorneo)
      .subscribe(async (res) => {
        console.log(res);
        const toastOK = await this.toastController.create({
          message: `Torneo ${res.nombre} creado correctamente`,
          duration: 3000,
          position: 'bottom',
          color: 'success'
        });
        toastOK.present();
        this.router.navigateByUrl("home");
      },
      (err) => {
        console.log(err);
        this.handleError(err);
      });
    }
    else{
      const toastERROR2 = await this.toastController.create({
        message: "Para poder registrar un torneo, debes completar todos los campos",
        duration: 4000,
        position: 'bottom',
        color: 'danger'
      });
      await toastERROR2.present();
    }
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
