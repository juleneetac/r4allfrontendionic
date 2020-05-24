import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/serviceUsuario/usuario.service';
import { Modelusuario } from 'src/app/models/modelUsusario/modelusuario';
import { ActivatedRoute } from '@angular/router';
import { StorageComponent } from 'src/app/storage/storage.component';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { Modelpartida } from 'src/app/models/modelPartida/modelpartida';
import { ToastController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
import { PartidaService } from 'src/app/services/servicePartida/partida.service';

@Component({
  selector: 'app-newpartida',
  templateUrl: './newpartida.page.html',
  styleUrls: ['./newpartida.page.scss'],
})
export class NewpartidaPage implements OnInit {
  
  listaUsuarios: Modelusuario[];
  invitado: string[] = [];
  invitado0:string;
  modo: string;
  ubicacion: string;
  punto = {
    "type": "Point",
    "coordinates": [1.9780778999999997, 41.2713734]
    }
  localperfil = JSON.parse(this.storage.getUser());
  organizador = this.localperfil.username;
  listapartidas: Modelpartida[];

  constructor(
    // private formBuilder: FormBuilder,
    // private router: Router,
    private geolocation: Geolocation,
    private storage: StorageComponent,
    public toastController: ToastController,
    private usuarioService: UsuarioService,
    private partidaService: PartidaService,
    // public auth: AuthService, 
    // //private socket: Socket,
    // private chatService: ChatService,
    private route: ActivatedRoute,
  ) { 
   
  }

  ngOnInit() {
    this.invitado[0] = this.route.snapshot.paramMap.get('invitado'); 
    this.getPartidasde(this.localperfil._id)
  }

  addPartida(event){
    event.preventDefault()
    console.log(event)
    let credencialP: Modelpartida = new Modelpartida(this.modo, this.ubicacion, this.organizador, this.invitado, "encurso", this.punto)
    this.partidaService.addPartida(credencialP).subscribe(
      async res =>{
        console.log(res);    
        const toast = await this.toastController.create({
          message: 'partida exitosamente creada',
          position: 'top',
          duration: 2000,
          color: 'success',
        });
  
  
        //rutas
        //await this.goMain();
  
        //send socket username
        //this.chatService.connectSocket(this.username)
  
        //presentacion del toast
        await toast.present();
      },
      async err => {
        console.log(err);
        this.handleError(err);
      });
  }

  private async handleError(err: HttpErrorResponse) {
    if (err.status == 500) {
      console.log('entra')
      const toast = await this.toastController.create({
        message: 'Error',
        position: 'bottom',
        duration: 2000,
      });
      await toast.present();
    } 
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



}

