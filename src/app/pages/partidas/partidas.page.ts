import { Component, OnInit } from '@angular/core';
import { PartidaService } from 'src/app/services/servicePartida/partida.service';
import { Modelpartida } from 'src/app/models/modelPartida/modelpartida';
import { StorageComponent } from 'src/app/storage/storage.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partidas',
  templateUrl: './partidas.page.html',
  styleUrls: ['./partidas.page.scss'],
})
export class PartidasPage implements OnInit {

  listapartidas: Modelpartida[];
  localperfil = JSON.parse(this.storage.getUser());
  usuario = this.localperfil.username;
  jugadoresList: string[] = [];
  ganador: string;
  myIndex: number;

  constructor(
    private partidaService: PartidaService,
    private storage: StorageComponent,
    public toastController: ToastController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getPartidasde(this.localperfil._id)
    this.jugadoresList[0]="Lel";
    this.jugadoresList[1]="Grupoea";
  }

  public getPartidasde(id:string){  //obtengo los estudiantes de una asignatura en concreto
    this.partidaService.getPartidasde(id).subscribe(
      (data) => {
        this.listapartidas = data.partidas;   //este data.partidas se refiere al apartado students que hay en el model de usuarios
        console.log("getparetidasde", this.listapartidas);
      },
      (err) => {
        console.log("err", err);
      }
    )  //el subject service es el declarado arriba en private
  }

  detGanador(event2){
    let index = this.myIndex;
    console.log(index)
    event.preventDefault()
    console.log(event2)
    //this.jugadoresList.push(this.listapartidas[].organizador)
      
      let setganador = {
        ganador: this.ganador, 
      }
  
      this.partidaService.updateGanador(this.listapartidas[1]._id, setganador).subscribe( //NO COGE EL ID
        async res => {
          const toast = await this.toastController.create({
            message: 'Partida modificada correctamente',
            position: 'top',
            duration: 2000,
            color: 'success',
          });
        let partidamod = res as Modelpartida;
        console.log(partidamod);

        //window.location.reload();   //para refrescar la pagina

        await toast.present();
  
    },
    err => {
      console.log(err);
      this.handleError(err);
    });
  }

  private async handleError(err: HttpErrorResponse) {
    if (err.status == 500) {
      console.log('Error')
      const toast = await this.toastController.create({
        message: 'Some error',
        position: 'bottom',
        duration: 2000,
      });
      await toast.present();
    } 
  }

}