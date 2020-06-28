import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/serviceUsuario/usuario.service';
import { Modelusuario } from 'src/app/models/modelUsusario/modelusuario';
import { ActivatedRoute } from '@angular/router';
import { StorageComponent } from 'src/app/storage/storage.component';
import { Modelpartida } from 'src/app/models/modelPartida/modelpartida';
import { ToastController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
import { PartidaService } from 'src/app/services/servicePartida/partida.service';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { MapsService } from 'src/app/services/serviceMaps/maps.service';

@Component({
  selector: 'app-newpartida',
  templateUrl: './newpartida.page.html',
  styleUrls: ['./newpartida.page.scss'],
})
export class NewpartidaPage implements OnInit {
  
  listaUsuarios: Modelusuario[];

  usuarioLogueado: Modelusuario;  //Usuario logueado en la Aplicación (ha de venir del Login)

  mymap: any;
  baseLayer: any;
  goldMarker: any;

  invitados: string[];
  //invitado0:string;
  modoValue;              //Valor del Segment de modo del Torneo (i/d)
  ubicacion: any;
  punto: any;
  selectedMarker: any;
  
  constructor(
    // private formBuilder: FormBuilder,
    private router: Router,
    private storage: StorageComponent,
    public toastController: ToastController,
    private usuarioService: UsuarioService,
    private partidaService: PartidaService,
    // public auth: AuthService, 
    // //private socket: Socket,
    // private chatService: ChatService,
    private route: ActivatedRoute,
    private mapsService: MapsService
  ) { }

  ngOnInit() {
    this.usuarioLogueado = JSON.parse(this.storage.getUser());

    this.invitados = [];
    this.invitados[0] = this.route.snapshot.paramMap.get('invitado'); 
    this.modoValue = 'i';
    
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

    this.mymap = new L.Map('mapid2', { layers: [this.baseLayer] });

    this.mymap.on('click', (e) => {
      if(this.selectedMarker == undefined){
        this.mapsService.getReverseGeocode(e.latlng.lat, e.latlng.lng)
        .subscribe((res) => {
          this.selectedMarker = L.marker([e.latlng.lat, e.latlng.lng], { icon: this.goldMarker }).bindPopup(res.display_name).addTo(this.mymap).openPopup();
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
          this.selectedMarker = L.marker([e.latlng.lat, e.latlng.lng], { icon: this.goldMarker }).bindPopup(res.display_name).addTo(this.mymap).openPopup();
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

  goMain(){
    this.router.navigateByUrl("main/dashboard");
  }

  async addPartida(event){
    event.preventDefault()
    console.log(event)

    if((this.modoValue == 'i' && this.invitados.length==1) || (this.modoValue == 'i' && this.invitados.length==3)){
      let credencialP: Modelpartida = new Modelpartida(this.modoValue, this.ubicacion, this.usuarioLogueado.username, this.invitados, this.punto)
      this.partidaService.addPartida(credencialP).subscribe(
        async res =>{
          console.log(res);    
          const toast = await this.toastController.create({
            message: 'Partido creado correctamente',
            position: 'bottom',
            duration: 2000,
            color: 'success',
          });
    
    
          //rutas
          //await this.goMain();
    
          //send socket username
          //this.chatService.connectSocket(this.username)
    
          //presentacion del toast
          await toast.present();
  
          await this.goMain();
        },
        async err => {
          console.log(err);
          this.handleError(err);
        });
    }
    else{
      const toast = await this.toastController.create({
        message: 'Error. Selecciona correctamente el modo de Partido',
        position: 'bottom',
        duration: 2000,
      });
      await toast.present();
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

  modoSegmentChanged(ev){
    this.modoValue = ev.detail.value;
  }

/*   public getPartidasde(id:string){  //obtengo los estudiantes de una asignatura en concreto
    this.partidaService.getPartidasde(id).subscribe(
      (data) => {
        this.listapartidas = data.partidas;   //este data.partidas se refiere al apartado students que hay en el model de usuarios
        console.log("getparetidasde", this.listapartidas);
      },
      (err) => {
        console.log("err", err);
      }
    )  //el subject service es el declarado arriba en private
  } */

}

