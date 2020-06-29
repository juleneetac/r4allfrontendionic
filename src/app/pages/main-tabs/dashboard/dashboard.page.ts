import { Component, OnInit } from '@angular/core';
import { StorageComponent } from 'src/app/storage/storage.component';
import { Modelusuario } from 'src/app/models/modelUsusario/modelusuario';
import { Ambiente } from 'src/app/services/ambiente';
import { Router, NavigationExtras } from '@angular/router';
import { Modelpartida } from 'src/app/models/modelPartida/modelpartida';
import { UsuarioService } from 'src/app/services/serviceUsuario/usuario.service';
import { PartidaService } from 'src/app/services/servicePartida/partida.service';
import { ToastController } from '@ionic/angular';
import { Modeltorneo } from 'src/app/models/modelTorneo/modeltorneo';
import { TorneoService } from 'src/app/services/serviceTorneo/torneo.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  ambiente: Ambiente; 
  path;
  constructor(
    private storage: StorageComponent,
    private usuarioService: UsuarioService,
    private partidaService: PartidaService,
    private torneoService: TorneoService,
    public toastController: ToastController,
    private router: Router
  ) {
    this.ambiente = new Ambiente();
    this.path = this.ambiente.path;
  }

  usuarioLogueado: Modelusuario;  //Usuario logueado en la Aplicación (ha de venir del Login)

  listaAmigos: Modelusuario[];

  listaPartidasActivas: Modelpartida[];  //Lista de Partidas
  ganador;                               //Determinará el ganador de la partida

  listaTorneosActivos: Modeltorneo[]; //Tus Torneos Activos

  async ngOnInit() {
    this.usuarioLogueado = JSON.parse(this.storage.getUser());

    this.listaPartidasActivas = [];
    this.ganador = undefined;

    this.listaTorneosActivos = [];
    
  }

  ionViewDidEnter(){
    this.refreshDashboard()
  }

  public async refreshDashboard(event?:any){
    await this.getAmigos(event);
    await this.getPartidas(event);
    await this.getTorneos(event);
  }

  public async getAmigos(event?:any){
    this.usuarioService.getAmigosde(this.usuarioLogueado._id)
    .subscribe((data) => {
      this.listaAmigos = data.amigos;
      console.log('Tus Amigos:', this.listaAmigos);
      if(event !== undefined){
        event.target.complete();
      }
    },
    (err) => {
      console.log("err", err);
      this.handleError(err);
    });
  }

  public async getPartidas(event?:any){
    this.usuarioService.getPartidasde(this.usuarioLogueado._id)
    .subscribe((data) => {
      this.listaPartidasActivas = [];
      data.partidas.forEach(partida => {
        if(partida.ganador === undefined){
          //Representamos solamente los Partidos que aún estén activos
          this.listaPartidasActivas.push(partida);
        }
      });
      console.log('Partidos activos:', this.listaPartidasActivas);
      if(event !== undefined){
        event.target.complete();
      }
      },
      (err) => {
        console.log("err", err);
        this.handleError(err);
      }
    );
  }

  goUsuario(usuario: Modelusuario){
    let navExtras: NavigationExtras = {
      state: {
        usuario: usuario
      }
    }
    this.router.navigate([`usuario-detail/${usuario.username}`], navExtras);
  }

  goTorneo(torneo: Modeltorneo){
    let navExtras: NavigationExtras = {
      state: {
        torneo: torneo
      }
    }
    this.router.navigate([`torneo-detail/${torneo.nombre}`], navExtras);
  }

  public getTorneos(event?:any){
    this.usuarioService.getTorneosde(this.usuarioLogueado._id)
    .subscribe((data) => {
      this.listaTorneosActivos = [];
      data.torneos.forEach(torneo => {
        if(torneo.ganador === undefined){
          //Representamos solamente los Torneos que aún estén activos
          this.torneoService.getParticipantesde(torneo._id)
          .subscribe((populatedTorneo) => {
            //Torneo con los Participantes (y parejas, en caso de Dobles) populados
            this.listaTorneosActivos.push(populatedTorneo);
          },
          (err) => {
            console.log(`No se ha podido cargar el Torneo ${torneo.nombre} `, err);
          });
        }
      });
      //this.listaTorneosActivos = torneosactivos;
      console.log('Torneos activos:', this.listaTorneosActivos);
      if(event !== undefined){
        event.target.complete();
      }
    },
    (err) => {
      console.log("err", err);
      this.handleError(err);
    });
  }

  public setGanador(i){
    let setganador = {
      ganador: this.ganador, 
    }
    this.partidaService.updateGanador(this.listaPartidasActivas[i]._id, setganador).subscribe(
      async res => {
        let partidamod = res as Modelpartida;
        console.log(partidamod);

        if(partidamod.ganador === this.ganador){
          const toastOK = await this.toastController.create({
            message: `Ha ganado: ${this.ganador}`,
            position: 'top',
            duration: 2000,
            color: 'warning',
          });
          await toastOK.present();
        }
        /* else{
          const toastERROR = await this.toastController.create({
            message: `Error al acabar la Partida`,
            position: 'top',
            duration: 2000,
            color: 'danger',
          });
          console.log(partidamod);
          await toastERROR.present();
        } */
        
        this.refreshDashboard();   //para refrescar la pagina

      },
      async (err) => {
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
