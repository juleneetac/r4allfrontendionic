import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Ambiente{

    constructor() { }
    path ='http://localhost:7000/'
    urlUsuario = this.path +'usr';  //deben ser las mismas rutas creadas
    urlTorneo = this.path + 'trn';  //en el backend
    urlPartida =  this.path +'prd';
    urlParticipantest =  this.path +'prantes';
    urlMensaje =  this.path +'msg';
    urlChat = this.path + 'cht';
}