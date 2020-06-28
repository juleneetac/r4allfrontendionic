import { Component, OnInit } from '@angular/core';
import { Modeltorneo } from 'src/app/models/modelTorneo/modeltorneo';
import { TorneoService } from 'src/app/services/serviceTorneo/torneo.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MapsService } from 'src/app/services/serviceMaps/maps.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Modelusuario } from 'src/app/models/modelUsusario/modelusuario';
import { StorageComponent } from 'src/app/storage/storage.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-torneos',
  templateUrl: './torneos.page.html',
  styleUrls: ['./torneos.page.scss'],
})
export class TorneosPage implements OnInit {

  constructor(
    private torneosService: TorneoService,
    private mapsService: MapsService,
    private storage: StorageComponent,
    public alertController: AlertController,
    public toastController: ToastController
  ) { }

  usuarioLogueado: Modelusuario;    //Usuario logueado en la Aplicación

  listaTorneos: Modeltorneo[];      //Lista de Torneos
  lastListaTorneos: Modeltorneo[];  //Guarda el estado de la última búsqueda
  
  visibleFilters: boolean;  //Indica si la lista de filtros está visible o no
  listaTorneosFlags = [];   //Flags para filtrar la lista de Torneos (indican si buscar por ese filtro o no)
  
  estadoValue;                    //Valor del Segment de estado del Torneo (activo, en curso, finalizado)
  ubicacionValue;                 //Valor del Range de ubicación
  pistacubiertaValue: boolean;    //Valor del Toggle de pistacubierta
  tipopistaValue;                 //Valor del Select de tipopista del Torneo
  tipobolaValue;                  //Valor del Select de tipobola del Torneo
  modoValue;                      //Valor del Segment de modo del Torneo (i/d)
  generoValue;                    //Valor del Segment de genero del Torneo (m/f)
  organizadorValue;               //Valor del SearchBar de organizador
  inscripcionValue: any = {       //Valor del Range de inscripcion
    upper:1000,
    lower:0
  };               
  capacidadValue: any = {     //Valor del Range de numero de participantes 
    upper:200,
    lower:4
  };             

  ngOnInit() {
    this.usuarioLogueado = JSON.parse(this.storage.getUser());

    this.lastListaTorneos = [];

    this.listaTorneosFlags = [Boolean];
    for (let i = 0; i < 10; i++){
      //Por defecto, seleccionar todos como no marcados
      this.listaTorneosFlags[i] = false;
    }

    this.visibleFilters = false;

    this.estadoValue = "a";
    this.pistacubiertaValue = false;
    this.generoValue = 'm';
    this.modoValue = 'i';

  }

  ionViewDidEnter(){
    this.getAllTorneos();
  }

  public async getAllTorneos(event?:any){
    //Reiniciar Filtros
    for (let i = 0; i < 10; i++){
      this.listaTorneosFlags[i] = false;
    }

    this.estadoValue = "a";
    this.pistacubiertaValue = false;
    this.generoValue = 'm';
    this.modoValue = 'i';
    this.inscripcionValue = {       //Valor del Range de inscripcion
      upper:1000,
      lower:0
    };               
    this.capacidadValue = {     //Valor del Range de numero de participantes 
      upper:200,
      lower:4
    }; 
    
    this.torneosService.getAllTorneos()
    .subscribe(trns => {
      this.listaTorneos = trns as Modeltorneo[];
      console.log(this.listaTorneos);
      if(event !== undefined){
        event.target.complete();
      }

      this.lastListaTorneos = this.listaTorneos;
    },
    (err) => {
      console.log("Error", err);
      this.handleError(err);
    });
  }

  public async getTorneos(){

    let position;
    await this.mapsService.getCurrentPosition().then(pos => { position = pos as [number]; });
    
    let query= {
      'flags': this.listaTorneosFlags,
      'punto' : { 'type': "Point", 'coordinates': position },
      'radio': (this.ubicacionValue * 1000),
      'pistacubierta': this.pistacubiertaValue,
      'tipopista': this.tipopistaValue,
      'tipobola': this.tipobolaValue,
      'modo': this.modoValue,
      'genero': this.generoValue,
      'organizador': this.organizadorValue,
      'inscripcion': [this.inscripcionValue.lower, this.inscripcionValue.upper],
      'capacidad': [this.capacidadValue.lower, this.capacidadValue.upper],
      'estado': this.estadoValue
    };

    console.log("query", query);

    this.torneosService.getTorneos(query)
    .subscribe(trns => {
      this.listaTorneos = trns as Modeltorneo[];
      
      if(this.listaTorneosFlags[9]){
        //Si se busca por estado (Activo/En curso/Finalizado), crear una lista según los que se quieran mostrar
        let listaEstado = [];
        this.listaTorneos.forEach((torneo) => {
          if((torneo.participantes.length == torneo.capacidad) && (this.estadoValue == "e")){
            listaEstado.push(torneo);
          }
          if((torneo.participantes.length < torneo.capacidad) && (this.estadoValue == "a")){
            listaEstado.push(torneo);
          }
          if((torneo.ganador !== undefined) && (this.estadoValue == "f")){
            listaEstado.push(torneo);
          }
        });
        console.log("Lista por estado", listaEstado);
        this.listaTorneos = listaEstado;
      }

      console.log(this.listaTorneos);

      this.lastListaTorneos = this.listaTorneos;
    },
    (err) => {
      console.log("Error", err);
      this.handleError(err);
    });

    this.toggleVisibleFilters();
  }

  toggleVisibleFilters(){
    this.visibleFilters = !this.visibleFilters;
  }

  resetFilters(){
    this.getAllTorneos();
    for (let i = 0; i < 10; i++){
      this.listaTorneosFlags[i] = false;
    }

    this.estadoValue = "a";
    this.pistacubiertaValue = false;
    this.generoValue = 'm';
    this.modoValue = 'i';
    this.inscripcionValue = {       //Valor del Range de inscripcion
      upper:1000,
      lower:0
    };               
    this.capacidadValue = {     //Valor del Range de numero de participantes 
      upper:200,
      lower:4
    }; 

    this.toggleVisibleFilters();
  }

  searchTorneoName(ev: any){
    this.listaTorneos = this.lastListaTorneos;   //Reinicia la lista de Torneos con la última que se ha buscado

    let val = ev.target.value.toLowerCase();

    if(val && val.trim() != ''){
      this.listaTorneos = this.listaTorneos.filter((torneo) => {
        return (torneo.nombre.toLowerCase().indexOf(val) > -1);
      })
    }
  }

  estadoSegmentChanged(event){
    this.estadoValue = event.detail.value;
  }

  updateUbicacionRangeValue(event){
    this.ubicacionValue = event.detail.value;
  }

  pistacubiertaSegmentChanged(event){
    if(event.detail.value == "t"){
      this.pistacubiertaValue = true;
    }
    else{
      this.pistacubiertaValue = false;
    }
    //this.pistacubiertaValue = !this.pistacubiertaValue;
  }

  modoSegmentChanged(event){
    this.modoValue = event.detail.value;
  }

  generoSegmentChanged(event){
    this.generoValue = event.detail.value;
  }

  searchTipoBola(event: any){
    this.tipobolaValue = event.target.value;
  }

  searchOrganizador(event: any){
    this.organizadorValue = event.target.value;
  }

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
            /* let navExtras: NavigationExtras = {
              state: {
                torneo: torneo
              }
            }
            this.router.navigate(['torneo-enter'], navExtras); */
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
