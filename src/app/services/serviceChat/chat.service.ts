import { Injectable } from '@angular/core';
import { TouchSequence } from 'selenium-webdriver';
import * as io from 'socket.io-client' ;
import {Observable, Subject} from 'rxjs/Rx';
import { Ambiente } from '../ambiente';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  ambiente: Ambiente;
  //private urlpath = this.ambiente.path;   
  private socket; 
  // socket: SocketIOClient.Socket;
  // userdestino: string;
  // myusername: string;

  constructor(private http: HttpClient) {
    this.ambiente = new Ambiente();
    console.log(this.ambiente.path) 
    this.socket = io(this.ambiente.path);  //el path es el 'http://localhost:7000'
   }

   //para enviar un mensaje al backend con socket
   public sendMessage(message) {
    this.socket.emit('new-message', message);
  }
  
    public getMessages = () => {
      return Observable.create((observer) => {
          this.socket.on('new-message', (message) => {
              observer.next(message);
          });
      });
  }
}
