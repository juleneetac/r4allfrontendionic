import { Injectable } from '@angular/core';
import { TouchSequence } from 'selenium-webdriver';
import * as io from 'socket.io-client' ;
import {Observable, Subject} from 'rxjs/Rx';
import { Ambiente } from '../ambiente';
import { HttpClient } from '@angular/common/http';
import { StorageComponent } from 'src/app/storage/storage.component';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  ambiente: Ambiente;
  //private urlpath = this.ambiente.path;   
  private socket; 
  private username;

  constructor(private http: HttpClient, private storage: StorageComponent) {
    this.ambiente = new Ambiente();
    console.log(this.ambiente.path) 
    //this.socket = io(this.ambiente.path);  //el path es el 'http://localhost:7000'
   }


   public connectSocket(username: string) {  //para conectar socket
    if (!this.socket) {
      this.username = username;
      this.socket = io(this.ambiente.path); //, {query: 'usuario=' + username});
      //this.storage.saveSocket(JSON.stringify(this.socket));   // probamos a guardar el socket en localstorage
      this.socket.emit('set-username', this.username);
      console.log('connection socket');
      console.log(this.socket)
    }
  }

  public getList = () => {
    console.log(this.socket)
    return new Observable((observer) => {
      this.socket.on('listaUsuarios', (data) => {
        observer.next(data);
      });
    });

  }
  public forceGetList() {
    this.socket.emit('giveMeUserList');
  }

   //para enviar un mensaje al backend con socket
   public sendMessage(message, destination) {
    console.log(this.socket)
    console.log(message, destination);
    this.socket.emit('message', { message, destination});
  }

  public getMessages = () => {
    //this.socket = JSON.parse(this.storage.getSocket()); // probamos a guardar el socket en localstorage
    console.log(this.socket)
      return Observable.create((observer) => {
          this.socket.on('message', (data) => {
            console.log('nos llega este mensaje: '+ data)
              observer.next(data);
          });
      });
  }

  public disconnectSocket() {  //para desconectar el socket, lo usamos en logout en el appcomponent
      this.socket.disconnect();
    }
}
