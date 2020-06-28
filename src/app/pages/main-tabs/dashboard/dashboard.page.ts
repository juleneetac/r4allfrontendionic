import { Component, OnInit } from '@angular/core';
import { StorageComponent } from 'src/app/storage/storage.component';
import { Modelusuario } from 'src/app/models/modelUsusario/modelusuario';
import { Ambiente } from 'src/app/services/ambiente';
import { Router } from '@angular/router';
import { Modelpartida } from 'src/app/models/modelPartida/modelpartida';
import { UsuarioService } from 'src/app/services/serviceUsuario/usuario.service';
import { PartidaService } from 'src/app/services/servicePartida/partida.service';
import { ToastController } from '@ionic/angular';
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
    public toastController: ToastController,
    private router: Router
  ) {
    this.ambiente = new Ambiente();
    this.path=this.ambiente.path;
  }

  usuarioLogueado: Modelusuario;  //Usuario logueado en la Aplicación (ha de venir del Login)

  listaPartidas: Modelpartida[];  //Lista de Partidas
  ganador;                        //Determinará el ganador de la partida


  async ngOnInit() {
    this.usuarioLogueado = JSON.parse(this.storage.getUser());

    this.listaPartidas = [];
    this.ganador = undefined;

  }

  ionViewDidEnter(){
    this.refreshDashboard()
  }

  public async refreshDashboard(event?:any){
    await this.getPartidas(event);
  }

  public async getPartidas(event?:any){
    this.usuarioService.getPartidasde(this.usuarioLogueado._id)
    .subscribe((data) => {
      this.listaPartidas = data.partidas;   //este data.partidas se refiere al apartado torneos que hay en el model de usuario
      console.log('Partidas:', this.listaPartidas);
      if(event !== undefined){
        event.target.complete();
      }
      },
      (err) => {
        console.log("err", err);
        this.handleError(err);
      }
    )
  }

  public setGanador(i){
    let setganador = {
      ganador: this.ganador, 
    }
    this.partidaService.updateGanador(this.listaPartidas[i]._id, setganador).subscribe(
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
