import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/serviceAuth/auth.service';
import { StorageComponent } from 'src/app/storage/storage.component';
import { Modelusuario } from 'src/app/models/modelUsusario/modelusuario';
import { Ambiente } from 'src/app/services/ambiente';
import * as L from 'leaflet';
import { Modeltorneo } from 'src/app/models/modelTorneo/modeltorneo';
import { TorneoService } from 'src/app/services/serviceTorneo/torneo.service';
import { UsuarioService } from 'src/app/services/serviceUsuario/usuario.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  
  ganadores = [];
  username
  ambiente: Ambiente; 
  path;

  mymap: any;
  baseLayer: any;

  historialTorneos: Modeltorneo[]; 
 
  idotro: Modelusuario;
  user?:Modelusuario;  

  constructor(
    public auth: AuthService,  //se puede quitar creo 
    private storage: StorageComponent,
    private torneosService: TorneoService,
    private usuarioService: UsuarioService
  ) { 
      this.ambiente = new Ambiente();
      this.path=this.ambiente.path; 
  }

  localperfil: Modelusuario;
    
  ngOnInit() {
    this.localperfil = JSON.parse(this.storage.getUser());
    console.log("mi id",this.localperfil._id);
    this.historialTorneos = [];
    


    //INICIAR EL MAPA
    this.baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
      attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
      /*
      maxZoom: 20,
      tileSize: 512, 
      zoomOffset: -1
      */
    });

    this.mymap = new L.Map('mapid3', { layers: [this.baseLayer] });

    //L.marker([this.localperfil.punto.coordinates[0],this.localperfil.punto.coordinates[1]]).bindPopup(this.localperfil.username).addTo(this.mymap).openPopup();
    //this.mymap.setView([this.localperfil.punto.coordinates[0], this.localperfil.punto.coordinates[1]], 18);
    this.getmisTorneos(this.localperfil._id);
   /* this.getalgodeuser(); */
  }

  ionViewDidEnter(){
    L.marker([this.localperfil.punto.coordinates[1],this.localperfil.punto.coordinates[0]]).bindPopup(this.localperfil.username).addTo(this.mymap).openPopup();
    this.mymap.setView([this.localperfil.punto.coordinates[1], this.localperfil.punto.coordinates[0]], 16);
  }


  public async getmisTorneos(id:string){
    this.usuarioService.getTorneos(id)
    .subscribe((res) =>{
      let torneos = res.torneos;
      torneos.forEach((torneos)=>{
        if(torneos.ganador !== undefined){         
          this.historialTorneos.push(torneos);
         /*  let pop = this.historialTorneos.pop();
          console.log("NAUYUSI",pop.ganador) */
          this.idotro = torneos.ganador;
          let id2 = this.idotro.toString();
          console.log("aquiiiiiiiiiiiii",torneos.ganador);
          console.log("id2",id2);
          this.usuarioService.getUsuario(id2)
          .subscribe((res)=>{
            this.user = res as Modelusuario;
            this.username = this.user.username;
            
            console.log("lacreedence", this.user.username);
            
            
            this.ganadores.push(this.username);             
            console.log("Clearwater", this.ganadores);
            console.log("el index", this.ganadores.indexOf);
            
          })
        }
      })
      console.log("los trns",this.historialTorneos);
      
          /* this.historialTorneos.forEach((torneo)=>{
            this.idotro = torneo.ganador;
            this.usuarioService.getUsuario(torneo.ganador)
            .subscribe((res)=>{
              torneo.ganador = res as Modelusuario;
            })
          
        })  */  
       
        /* this.historialTorneos.forEach((torneo)=>{
        if (torneo.ganador !== undefined)
        { 
          this.idotro = torneo.ganador._id;
          this.usuarioService.getUsuario(torneo.ganador._id)
          .subscribe((res)=>{
            torneo.ganador = res as Modelusuario;
          })
        }
      })  */ 
    
    },
    (err) => {
      console.log(err);
    });
  }

  /* public async getalgodeuser(){
  console.log("bbbbbbbb",this.historialTorneos);

    this.historialTorneos.forEach((torneos)=>{
      if (torneos.ganador !== undefined)
      {
        let idotro = torneos.ganador._id;
        console.log("idotro",idotro)
        this.usuarioService.getUsuario(idotro)
        .subscribe((res)=>{
          torneos.ganador = res as Modelusuario;
          console.log("AAaaaaaayyy",torneos.ganador);
        }),
        (err)=>{
          console.log(err)
        }
      }
    })
  } */
  

}
