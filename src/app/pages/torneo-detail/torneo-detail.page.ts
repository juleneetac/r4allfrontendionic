import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Modelusuario } from 'src/app/models/modelUsusario/modelusuario';
import { Modeltorneo } from 'src/app/models/modelTorneo/modeltorneo';
import { StorageComponent } from 'src/app/storage/storage.component';
import { UsuarioService } from 'src/app/services/serviceUsuario/usuario.service';
import { TorneoService } from 'src/app/services/serviceTorneo/torneo.service';
import { Participante } from 'src/app/models/modelParticipante/participante';
import * as L from 'leaflet';
import { ToastController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-torneo-detail',
  templateUrl: './torneo-detail.page.html',
  styleUrls: ['./torneo-detail.page.scss'],
})
export class TorneoDetailPage implements OnInit {

  usuarioLogueado: Modelusuario;          //Usuario logueado en la Aplicación (ha de venir del Login)
  selectedTorneo: any;                    //Torneo de esta página de Torneo
  listaParticipantes: Participante[];     //Lista de Participantes del Torneo

  listaParejas: Modelusuario[];           //Lista de posibles Parejas (Usuarios que no sean Participantes ni seas tú mismo)
  pareja;                                 //Pareja del Participante (en caso de Dobles)

  mymap: any;
  baseLayer: any;

  constructor(
    private usuariosService: UsuarioService,
    private torneosService: TorneoService,
    private route: ActivatedRoute,
    private router: Router,
    private storage: StorageComponent,
    public toastController: ToastController
  ) { 
    this.route.queryParams.subscribe(params => {
      this.selectedTorneo = this.router.getCurrentNavigation().extras.state.torneo;
    });
  }

  ngOnInit() {

    this.usuarioLogueado = JSON.parse(this.storage.getUser());

    this.listaParejas = [];

    this.pareja= undefined;

    //INICIAR EL MAPA
    this.baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
      attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
      /*
      maxZoom: 20,
      tileSize: 512, 
      zoomOffset: -1
      */
    });

    this.mymap = new L.Map('mapid4', { layers: [this.baseLayer] });

    /* this.activatedRoute.queryParams.subscribe(params => {
      this.selectedTorneo = JSON.parse(params['torneo']);
      console.log(this.selectedTorneo)
    }) */
  }

  ionViewDidEnter(){

    /* let torneoID = this.activatedRoute.snapshot.paramMap.get('torneo');
    console.log(torneoID);

    this.torneosService.getTorneo(torneoID)
    .subscribe((res) => {
      this.selectedTorneo = res as Modeltorneo;
      console.log(`Inscripción en el Torneo: `, this.selectedTorneo)
    },
    (err) => {
      console.log("err", err);
    }); */

    this.torneosService.getParticipantesde(this.selectedTorneo._id)
    .subscribe((data) => {

      this.listaParticipantes = data.participantes as Participante[];

      console.log(`Participantes del Torneo ${this.selectedTorneo.nombre}`, this.listaParticipantes);

      if(this.selectedTorneo.modo == 'd'){
        this.usuariosService.getAllUsuarios()
        .subscribe((usrs) => {
        let listaUsuarios = usrs as Modelusuario[];

        //Llenamos la lista de Parejas con los Usuarios candidatos a Pareja
        listaUsuarios.forEach((usuario) => {
          if((usuario.username !== this.usuarioLogueado.username) && (usuario.sexo === this.selectedTorneo.genero)){ 

            let checkRegistered:boolean = false;
            usuario.torneos.forEach(torneoID => {
              if(torneoID === this.selectedTorneo._id){
                checkRegistered = true;
              }
            });
            if(!checkRegistered){
              //El Usuario no es participante ya del Torneo
              this.listaParejas.push(usuario);
            }

          }
        });

        console.log("Posibles parejas: ", this.listaParejas);

      },
      (err) => {
        console.log("err", err);
      }); 
      }
    },
    (err) => {
      console.log("err", err);
    });

      this.mymap.setView([this.selectedTorneo.punto.coordinates[1], this.selectedTorneo.punto.coordinates[0]], 15);

      L.marker([this.selectedTorneo.punto.coordinates[1], this.selectedTorneo.punto.coordinates[0]])
      .bindPopup("<ion-chip color=\"primary\"><ion-label>"+ this.selectedTorneo.nombre +"</ion-label></ion-chip><br><p>" + this.selectedTorneo.ubicacion + "</p>", {minWidth: 200, closeOnClick: true, autoClose: true})
      .addTo(this.mymap);

  }

  goMain(){
    this.router.navigateByUrl("main/torneos");
  }

  openLink(){
    window.open(`${this.selectedTorneo.sitioweb}`, "_blank");
  }

  public async inscribirse(){
    //Te añades al Torneo (y a la Pareja en caso de Dobles)

    let newParticipante1:Participante = new Participante();
    newParticipante1._idUsuario = this.usuarioLogueado._id;
    newParticipante1._idTorneo = this.selectedTorneo._id;
    newParticipante1.nombre = this.usuarioLogueado.username;

    if(this.selectedTorneo.genero === this.usuarioLogueado.sexo){
      if(this.selectedTorneo.modo == 'd'){

        if(this.pareja !== undefined){
          
          //Añadir a los dos Participantes

          let newParticipante2: Participante = new Participante();
          newParticipante2._idTorneo = this.selectedTorneo._id;
          newParticipante2._idUsuario = this.pareja._id;
          newParticipante2.nombre = this.pareja.username;
          
          let participantes = {
            'participante1': newParticipante1,
            'participante2': newParticipante2
          };

          this.torneosService.addParticipantes(participantes)
          .subscribe(async (res) => {
            if(res.participante1._idUsuario === newParticipante1._idUsuario && res.participante1._idTorneo === newParticipante1._idTorneo 
              && res.participante2._idUsuario === newParticipante2._idUsuario && res.participante2._idTorneo === newParticipante2._idTorneo){

                const toastOKd = await this.toastController.create({
                  message: `Usuarios ${newParticipante1.nombre} y ${newParticipante2.nombre} inscritos correctamente en el Torneo ${this.selectedTorneo.nombre}`,
                  duration: 3000,
                  position: 'bottom',
                  color: 'primary'
                });

                toastOKd.present();
                  this.goMain();
            }
          },
          async (err) => {
            this.handleError(err);
          });
        }
        else{
          if(this.listaParticipantes.length = 0){
            const toastERRORd = await this.toastController.create({
              message: `No hay más posibles Participantes`,
              duration: 4000,
              position: 'bottom',
              color: 'danger'
            });
            await toastERRORd.present();
          }
          else{
            const toastERRORd = await this.toastController.create({
              message: `Has de seleccionar una Pareja con la que apuntarte`,
              duration: 4000,
              position: 'bottom',
              color: 'danger'
            });
            await toastERRORd.present();
          }
        }
      }

      else if(this.selectedTorneo.modo == 'i'){
        this.torneosService.addParticipante(newParticipante1)
        .subscribe(async (res) => {
          if(res._idUsuario === newParticipante1._idUsuario && res._idTorneo === newParticipante1._idTorneo){
            const toastOKi = await this.toastController.create({
              message: `Inscrito correctamente en el Torneo ${this.selectedTorneo.nombre}`,
              duration: 3000,
              position: 'bottom',
              color: 'primary'
            });
  
            toastOKi.present();
            this.goMain();
          }
        },
        async (err) => {
          this.handleError(err);
        });
      }
    }

    else{
      if(this.selectedTorneo.genero == 'm'){
        const toastERRORm = await this.toastController.create({
          message: `Lo sentimos, es un Torneo Masculino`,
          duration: 4000,
          position: 'bottom',
          color: 'danger'
        });
        await toastERRORm.present();
      }
      else{
        const toastERRORf = await this.toastController.create({
          message: `Lo sentimos, es un Torneo Femenino`,
          duration: 4000,
          position: 'bottom',
          color: 'danger'
        });
        await toastERRORf.present();
      }
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

  setPareja(i){
    this.pareja = this.listaParejas[i];
    console.log(this.pareja);
  }

}
