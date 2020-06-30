import { Component, OnInit } from '@angular/core';
import { StorageComponent } from 'src/app/storage/storage.component';
import { Modelusuario } from 'src/app/models/modelUsusario/modelusuario';
import { Ambiente } from 'src/app/services/ambiente';
import { Router, ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import { UsuarioService } from 'src/app/services/serviceUsuario/usuario.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-usuario-detail',
  templateUrl: './usuario-detail.page.html',
  styleUrls: ['./usuario-detail.page.scss'],
})
export class UsuarioDetailPage implements OnInit {

  usuarioLogueado: Modelusuario;      //Usuario logueado en la Aplicación
  selectedUsuario: any;               //Usuario de esta Pagina de Usuario

  mymap: any;
  baseLayer: any;

  ambiente: Ambiente; 
  path;

  constructor(
    private usuarioService: UsuarioService,
    private storage: StorageComponent,
    private route: ActivatedRoute,
    private router: Router,
    public toastController: ToastController
  ) { 
      this.ambiente = new Ambiente();
      this.path = this.ambiente.path; 

      this.route.queryParams.subscribe(params => {
        this.selectedUsuario = this.router.getCurrentNavigation().extras.state.usuario;
      });
  }
    
  ngOnInit() {
    this.usuarioLogueado = JSON.parse(this.storage.getUser());

    //INICIAR EL MAPA
    this.baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
      attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
      /*
      maxZoom: 20,
      tileSize: 512, 
      zoomOffset: -1
      */
    });

    this.mymap = new L.Map('mapid5', { layers: [this.baseLayer] });

  }

  ionViewDidEnter(){
    L.marker([this.selectedUsuario.punto.coordinates[1],this.selectedUsuario.punto.coordinates[0]]).addTo(this.mymap);
    this.mymap.setView([this.selectedUsuario.punto.coordinates[1], this.selectedUsuario.punto.coordinates[0]], 16);
  }

  invitarPartido(){
    this.router.navigateByUrl("newpartida/" + this.selectedUsuario.username);
  }

  goChat(){
    this.router.navigateByUrl('chatroom/' + `${this.selectedUsuario.username}`);
  }

  addAmigo(){
    this.usuarioService.addAmigo(this.usuarioLogueado._id, this.selectedUsuario._id)
    .subscribe(async (data) => {
      console.log(data);
      const toastAddAmigo = await this.toastController.create({
        message: `${data}`,
        duration: 3000,
        position: 'bottom',
        color: 'primary'
      });
      await toastAddAmigo.present();
    },
    (err) => {
      console.log(err);
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
