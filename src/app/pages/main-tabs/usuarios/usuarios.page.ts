import { Component, OnInit } from '@angular/core';
import { Modelusuario } from 'src/app/models/modelUsusario/modelusuario';
import { UsuarioService } from 'src/app/services/serviceUsuario/usuario.service';
import { Ambiente } from 'src/app/services/ambiente';
import { MapsService } from 'src/app/services/serviceMaps/maps.service';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { StorageComponent } from 'src/app/storage/storage.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  ambiente: Ambiente; 
  path;

  constructor(
    private usuarioService: UsuarioService,
    private mapsService: MapsService,
    private router: Router,
    private storage: StorageComponent,
    public alertController: AlertController,
<<<<<<< HEAD
  ) { 
=======
    public toastController: ToastController
  ) 
  { 
>>>>>>> develop
    this.ambiente = new Ambiente();
    this.path = this.ambiente.path;
  }

  usuarioLogueado: Modelusuario;      //Usuario logueado en la Aplicación

  listaUsuarios: Modelusuario[];      //Lista de Usuarios
  lastListaUsuarios: Modelusuario[];  //Guarda el estado de la última búsqueda
  
  visibleFilters: boolean;  //Indica si la lista de filtros está visible o no
  listaUsuariosFlags = [];  //Flags para filtrar la lista de Usuarios (indican si buscar por ese filtro o no)

  ubicacionValue;     //Valor del Range de ubicacion
  generoValue;        //Valor del Segment de sexo del Usuario (m/f)
  edadValue: any = {  //Valor del Range de edad
    upper:0,
    lower:100
  };        
  expValue: any = {   //Valor del Range de exp
    upper:0,
    lower:1000
  };         
  valoracionValue: any = { //Valor del Range de valoracion
    upper:0,
    lower:1000
  };  

  ngOnInit() {
    this.usuarioLogueado = JSON.parse(this.storage.getUser());

    this.lastListaUsuarios = [];
    
    this.listaUsuariosFlags = [Boolean];
    for (let i = 0; i < 5; i++){
      //Por defecto, seleccionar todos como no marcados
      this.listaUsuariosFlags[i] = false;
    }

    this.visibleFilters = false;

    this.generoValue = 'm';
  }

  ionViewDidEnter(){
    this.getAllUsuarios();
  }

  public async getAllUsuarios(event?:any){
    //Reiniciar Filtros
    for (let i = 0; i < 5; i++){
      this.listaUsuariosFlags[i] = false;
    }

    this.generoValue = 'm';
    this.ubicacionValue = 0;
    this.edadValue = {
      upper:0,
      lower:100
    };        
    this.expValue = {   
      upper:0,
      lower:1000
    };         
    this.valoracionValue = { 
      upper:0,
      lower:1000
    }

    this.usuarioService.getAllUsuarios()
    .subscribe(usrs => {
      this.listaUsuarios = usrs as Modelusuario[];
      console.log(this.listaUsuarios);
      if(event !== undefined){
        event.target.complete();
      }

      this.lastListaUsuarios = this.listaUsuarios;
    },
    (err) => {
      console.log("Error", err);
      this.handleError(err);
    });
  }

  goPerfil() {
    this.router.navigateByUrl("profile")
  }

  public async getUsuarios(){

    let position;
    await this.mapsService.getCurrentPosition().then(pos => { position = pos as [number]; });

    let query = {
      'flags': this.listaUsuariosFlags,
      'punto': { 'type': "Point", 'coordinates': position },
      'radio': (this.ubicacionValue * 1000),
      'sexo': this.generoValue,
      'edad': [this.edadValue.lower, this.edadValue.upper],
      'exp': [this.expValue.lower, this.expValue.upper],
      'valoracion': [this.valoracionValue.lower, this.valoracionValue.upper]
    };

    console.log("query", query);

    this.usuarioService.getUsuarios(query)
    .subscribe((usrs) => {
        this.listaUsuarios = usrs as Modelusuario[];
        console.log(this.listaUsuarios);

        this.lastListaUsuarios = this.listaUsuarios;
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
    this.getAllUsuarios();
    for (let i = 0; i < 5; i++){
      this.listaUsuariosFlags[i] = false;
    }

    this.generoValue = 'm';
    this.ubicacionValue = 0;
    this.edadValue = {
      upper:0,
      lower:100
    };        
    this.expValue = {   
      upper:0,
      lower:1000
    };         
    this.valoracionValue = { 
      upper:0,
      lower:1000
    }

    this.toggleVisibleFilters();
  }

  searchUserName(ev: any){
    this.listaUsuarios = this.lastListaUsuarios;   //Reinicia la lista de Usuarios con la última que se ha buscado

    let val = ev.target.value.toLowerCase();

    if(val && val.trim() != ''){
      this.listaUsuarios = this.listaUsuarios.filter((usuario) => {
        return (usuario.username.toLowerCase().indexOf(val) > -1);
      })
    }
  }

  generoSegmentChanged(event){
    this.generoValue = event.detail.value;
  }

  updateUbicacionRangeValue(event){
    this.ubicacionValue = event.detail.value;
  }

  goUsuario(usuario: Modelusuario){
    let navExtras: NavigationExtras = {
      state: {
        usuario: usuario
      }
    }
    this.router.navigate([`usuario-detail/${usuario.username}`], navExtras);
  }
  
  /* async presentAlert(usuario: Modelusuario){
    const alert = await this.alertController.create({
      animated: true,
      backdropDismiss: true, 
      keyboardClose: true,
      translucent: true,
      header: usuario.username,
      subHeader: 'Usuario',
      buttons: [
        {
          text: 'Invitar a un Partido',
          handler: () => {
            this.router.navigateByUrl("newpartida/" + usuario.username);
          }
        }, 
        {
          text: 'Abrir chat',
          handler: () => {
            console.log(`Abrir chat a ${usuario.username}`);
          }
        },
        {
          text: 'Añadir a Amigos',
          handler: () => {
            console.log(`Añadir a ${usuario.username} a Amigos`);
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            alert.dismiss();
          }
        }
      ]
    });

    await alert.present();
    
  } */

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
