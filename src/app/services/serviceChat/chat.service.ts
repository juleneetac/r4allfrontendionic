import { Injectable } from '@angular/core';
import { TouchSequence } from 'selenium-webdriver';
import * as io from 'socket.io-client' ;
import {Observable, Subject} from 'rxjs/Rx';
import { Ambiente } from '../ambiente';
import { HttpClient } from '@angular/common/http';
import { StorageComponent } from 'src/app/storage/storage.component';
import { Socket, SocketIoConfig, SocketIoModule } from 'ng-socket-io';
import { Modelmessage } from 'src/app/models/modelMessage/modelmessage';
import { Modeltorneo } from 'src/app/models/modelTorneo/modeltorneo';


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
      //if (!this.socket) {
      this.username = username;
      //this.socket = io(this.ambiente.path); //, {query: 'usuario=' + username});
      //this.storage.saveSocket(JSON.stringify(this.socket));   // probamos a guardar el socket en localstorage
      //console.log(this.socket)
      this.socket.emit('set-username', this.username);
      console.log('se conecto el usuario ' + this.username );
     // console.log(this.socket)
    //}
  }

  public setSocket(socketparam: Socket) {  //para conectar socket
   // if (!socketparam) {
      this.socket = socketparam;
      console.log('connection socket');
      //console.log(this.socket)
  
  }

  public getList = () => {
    console.log(this.socket)
    return new Observable((observer) => {
      this.socket.on('listaUsuarios', (data) => {
        console.log(data);
        observer.next(data);
        console.log(observer);
      });
    });

  }
  public forceGetList() {
    this.socket.emit('giveMeUserList');
  }
 

   //para enviar un mensaje al backend con socket
   public sendMessage(mensaje, destination) {
    console.log(mensaje, destination);
    this.socket.emit('message', { mensaje, destination});
    let body = {author: this.username, destination, mensaje};
    this.http.post(this.ambiente.urlMensaje + `/addmsg`, body).toPromise().catch((err) => console.log(err));
  }

  public getMessages = () => {
    //this.socket = JSON.parse(this.storage.getSocket()); // probamos a guardar el socket en localstorage
      return Observable.create((observer) => {
          this.socket.on('message', (data) => {
            console.log('nos llega este mensaje: '+ data)
              observer.next(data);
          });
      });
  }

  public getMessagesAlmacenados(destino) {
    return this.http.get<Modelmessage[]>(this.ambiente.urlMensaje + `/getmsg/${destino}`);
  }
  public unirseSala(nombresala){
    console.log("llega a unisres sala")
    this.socket.emit('joinSala',{nombresala})
  }

  public disconnectSocket() {  //para desconectar el socket, lo usamos en logout en el appcomponent
      this.socket.disconnect();
    }
}
