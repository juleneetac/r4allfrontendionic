import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class Ambiente{
    //path:string;
    public path = environment.apiUri;
    //public platform: Platform
    constructor(
      ) { 
        console.log(environment.mensaje)
      //this.configureRemoteServer()
      this.prepareAmbiente()
      
    }
    urlUsuario;  //deben ser las mismas rutas creadas
    urlTorneo;  //en el backend
    urlPartida ;
    urlParticipantest ;
    urlMensaje;
    urlChat;
   
    
    public prepareAmbiente(){
      this.urlUsuario = this.path +'usr';  //deben ser las mismas rutas creadas
      this.urlTorneo = this.path + 'trn';  //en el backend
      this.urlPartida =  this.path +'prd';
      this.urlParticipantest =  this.path +'prantes';
      this.urlMensaje =  this.path +'msg';
      this.urlChat = this.path + 'cht';
    }

    // public configureRemoteServer() {
    //   console.log ("estas en " + location.hostname)
    //   if (location.hostname === '147.83.7.156') {
    //     this.path = 'https://147.83.7.156:8080/';
    //   }
    //   else if(location.hostname==='localhost'){
    //     this.path = 'https://localhost:7000/'
    //   }    
    // }

    //ESTE ES PARA cuando use cordova para pasarlo a la app pero PONE QUE CORDOVA ES UNDEFINED

    // private configureRemoteServer() {
    //   if (this.platform.is('cordova') || location.hostname === '147.83.7.156') {
    //     this.path = 'https://147.83.7.156:8080/'; // http://147.83.x.x
    //   } 
    //   else if (location.hostname === 'localhost') {
    //     this.path = 'https://localhost:7000/';
    //   } 
    //   else {
    //     this.path = 'https://localhost:7000/';
    //   }
    // }

    // private configureRemoteServer() {
    //   console.log(this.platform)
    //   if (location.hostname === '147.83.7.156' || this.platform.is('cordova')) {
    //     this.path = 'https://147.83.7.156:8080/'; // http://147.83.x.x
    //   } 
    //   else if (location.hostname === 'localhost') {
    //     this.path = 'https://localhost:7000/';
    //   } 
    //   else {
    //     this.path = 'https://localhost:7000/';
    //   }
    // }
}
