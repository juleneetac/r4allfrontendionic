import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Ambiente{
  
    path:string;
    constructor() { 
      this.configureRemoteServer()
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
    //this.urlParticipantest =  this.path +'prantes';
    this.urlMensaje =  this.path +'msg';
    this.urlChat = this.path + 'cht';
    }
    public configureRemoteServer() {
      console.log ("estas en " + location.hostname)
      if (location.hostname === '147.83.7.156') {
        this.path = 'https://147.83.7.156:8080/';
      }
      else if(location.hostname==='localhost'){
        this.path = 'https://localhost:7000/'
      }    
    }
}
