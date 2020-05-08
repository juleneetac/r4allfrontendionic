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
  private username;
  // socket: SocketIOClient.Socket;
  // userdestino: string;
  // myusername: string;

  constructor(private http: HttpClient) {
    this.ambiente = new Ambiente();
    console.log(this.ambiente.path) 
    //this.socket = io(this.ambiente.path);  //el path es el 'http://localhost:7000'
   }


   public connectSocket(username: string) {  //para conectar socket
    if (!this.socket) {
      this.username = username;
      this.socket = io(this.ambiente.path); //, {query: 'usuario=' + username});
      this.socket.emit('set-username', this.username);
      console.log('connection socket');
    }
  }

  public getList = () => {
    return new Observable((observer) => {
      this.socket.on('listaUsuarios', (data) => {
        observer.next(data);
      });
    });
  }

   //para enviar un mensaje al backend con socket
   public sendMessage(message, destination) {
    this.socket.emit('message', { message, destination});
  }

    public getMessages = () => {
      return Observable.create((observer) => {
          this.socket.on('message', (data) => {
              observer.next(data);
          });
      });
  }
}
