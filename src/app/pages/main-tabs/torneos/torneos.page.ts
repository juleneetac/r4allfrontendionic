import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Modeltorneo } from 'src/app/models/modelTorneo/modeltorneo';
import { TorneoService } from 'src/app/services/serviceTorneo/torneo.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MapsService } from 'src/app/services/serviceMaps/maps.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Modelusuario } from 'src/app/models/modelUsusario/modelusuario';
import { StorageComponent } from 'src/app/storage/storage.component';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-torneos',
  templateUrl: './torneos.page.html',
  styleUrls: ['./torneos.page.scss'],
})
export class TorneosPage implements OnInit {

  constructor(
    private router: Router,
    private torneosService: TorneoService,
    private mapsService: MapsService,
    private storage: StorageComponent,
    public alertController: AlertController,
    public toastController: ToastController,
    public navController: NavController
  ) { }

  listaTorneos: Modeltorneo[];    //Lista de Torneos

  usuarioLogueado: Modelusuario;  //Usuario logueado en la Aplicación (ha de venir del Login)

  visibleFilters: boolean;  //Indica si la lista de filtros está visible o no

  listaTorneosFlags = [];         //Flags para filtrar la lista de Torneos
  pistacubiertaValue: boolean;    //Valor del Toggle de pistacubierta
  generoValue;                    //Valor del Segment de genero del Torneo (m/f)
  modoValue;                      //Valor del Segment de modo del Torneo (i/d)
  tipopistaValue;                 //Valor del Select de tipopista del Torneo
  rangoValue;                     //Valor del Range de ubicación

  //Form para filtrar la lista de Torneos
  listaTorneosForm = new FormGroup({
    minParticipantesInput: new FormControl(''),
    maxParticipantesInput: new FormControl('')
  });

  ngOnInit() {
    this.usuarioLogueado = JSON.parse(this.storage.getUser());

    this.listaTorneosFlags = [Boolean];
    for (let i = 0; i < 5; i++){
      //Por defecto, seleccionar todos como no marcados
      this.listaTorneosFlags[i] = false;
    }

    this.visibleFilters = false;

    this.pistacubiertaValue = false;
    this.generoValue = 'm';
    this.modoValue = 'i';

  }

  ionViewDidEnter(){
    this.getTorneos();
  }

  public async getTorneos(){

    let position;
    await this.mapsService.getCurrentPosition().then(pos => { position = pos as [number]; });
    
    interface LooseObject {
      [key: string]: any
    }
    let query:LooseObject = {};
    let queryflags = [];

    if(this.listaTorneosFlags[0]){
      queryflags[0] = this.listaTorneosFlags[0];
      Object.assign(query, { 'punto': { 'type': "Point", 'coordinates': position }});
      Object.assign(query, { 'radio': (this.rangoValue * 1000) });
    }
    if(this.listaTorneosFlags[1]){
      queryflags[1] = this.listaTorneosFlags[1];
      Object.assign(query, {'pistacubierta': this.pistacubiertaValue});
    }
    if(this.listaTorneosFlags[2]){
      queryflags[2] = this.listaTorneosFlags[2];
      Object.assign(query, {'tipopista': this.tipopistaValue });
    }
    if(this.listaTorneosFlags[3]){
      queryflags[3] = this.listaTorneosFlags[3];
      Object.assign(query, {'modo': this.modoValue });
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
    .subscribe(trns => {
      this.listaTorneos = trns as Modeltorneo[];
      console.log(this.listaTorneos);
    },
    (err) => {
      console.log("err", err);
    });
  }

  toggleVisibleFilters(){
    this.visibleFilters = !this.visibleFilters;
  }

  pistacubiertaToggleChanged(){
    this.pistacubiertaValue = !this.pistacubiertaValue;
  }

  modoSegmentChanged(ev){
    this.modoValue = ev.detail.value;
  }

  updateRangoValue(event){
    this.rangoValue = event.detail.value;
  }

  /* generoSegmentChanged(ev){
    this.generoValue = ev.detail.value;
  } */

  async presentAlert(torneo: Modeltorneo){
    const alertActive = await this.alertController.create({
      animated: true,
      backdropDismiss: true, 
      keyboardClose: true,
      translucent: true,
      header: torneo.nombre,
      subHeader: 'Torneo',
      message: `Inscripción: ${torneo.inscripcion} €`,
      buttons: [
        {
          text: 'Entrar',
          handler: async () => {
            let navExtras: NavigationExtras = {
              state: {
                torneo: torneo
              }
            }
            this.router.navigate(['torneo-enter'], navExtras);
          } 
        },
        {
          text: 'Sitio Web',
          handler: () => {
            window.open(`${torneo.sitioweb}`, "_blank");
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            alertActive.dismiss();
          }
        }
      ]
    });

    const alertFinished = await this.alertController.create({
      animated: true,
      backdropDismiss: true, 
      keyboardClose: true,
      translucent: true,
      header: torneo.nombre,
      subHeader: 'Torneo',
      message: `Finalizado. Premio: ${torneo.premio}`,
      buttons: [
        {
          text: 'Sitio Web',
          handler: () => {
            window.open(`${torneo.sitioweb}`, "_blank");
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            alertFinished.dismiss();
          }
        }
      ]
    });

    if(torneo.ganador == undefined)
      await alertActive.present();
    else
      await alertFinished.present();
  }

}
