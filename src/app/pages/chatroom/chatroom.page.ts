import { Component, OnInit } from '@angular/core';
//import {Observable} from "rxjs";
//import { Observable } from 'rxjs/Observable';
import { NavController, NavParams, ToastController } from '@ionic/angular';
//import { Socket } from 'ng-socket-io';
import * as io from 'socket.io-client' ;
import { UsuarioService } from 'src/app/services/serviceUsuario/usuario.service';
import { StorageComponent } from 'src/app/storage/storage.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Ambiente } from 'src/app/services/ambiente';
import { Modelusuario } from 'src/app/models/modelUsusario/modelusuario';
import { Modelmessage } from 'src/app/models/modelMessage/modelmessage';
import { ChatService } from 'src/app/services/serviceChat/chat.service';
import { Socket } from 'ng-socket-io';
import { element } from 'protractor';
import { Modeltorneo } from 'src/app/models/modelTorneo/modeltorneo';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.page.html',
  styleUrls: ['./chatroom.page.scss'],
})
export class ChatroomPage implements OnInit {
  
  // message = '';
  user = JSON.parse(this.storage.getUser());
  username = this.user.username;
  ambiente: Ambiente;
  usuario: Modelusuario; 
  message: string;
  messages = [];
  torneos:Modeltorneo[];
  namedestino: string;
  //messages: SchemaM[];
  torneocheck:boolean=false;
  constructor(
    private usuariosSevice: UsuarioService,
    private chatService: ChatService,
    private storage: StorageComponent,
    private router: Router,
    private toastCtrl: ToastController,
    private route: ActivatedRoute,
    private socket: Socket,
  ) { 

    this.namedestino = this.route.snapshot.paramMap.get('username');
    //setTimeout(() => this.scrollToBottom(), 500);

    console.log(socket);
    this.chatService.setSocket(socket); //para pasar el socket en las diferentes paginas


    // this.getMessages().subscribe(message => {
    //   this.messages.push(message);
    // });
 
    // this.getUsers().subscribe(data => {
    //   let user = data['user'];
    //   if (data['event'] === 'left') {
    //     this.showToast('User left: ' + user);
    //   } else {
    //     this.showToast('User joined: ' + user);
    //   }
    // });
  }

  async ngOnInit() {
    this.usuariosSevice.getTorneosde(this.user._id).subscribe(
      async res =>{
        this.torneos = await res.torneos
        console.log("torneos: " + this.torneos)
      },
       err=>{
        console.log("error")
      }
    )


    await this.chatService.getMessagesAlmacenados(this.namedestino).toPromise().then((data) => {  //coger los mensajes de la colecions mensajes
      // tslint:disable-next-line:max-line-length
      this.torneos.forEach(element => { //Esto es para mirar si es un torneo o no, chapuza pero mejor idea que he tenido
        if (element._id===this.namedestino){
       this.torneocheck=true
        return
        }
      });
      if(!this.torneocheck)
      this.messages =  data.filter((item) => (item.author === this.username || item.destination === this.username));
      else
      this.messages=data 
    });
    console.log("es torneo ?"+this.torneocheck)
    if(this.torneocheck){ //para unirse a la sala de torneo
        this.chatService.unirseSala(this.namedestino);
        console.log("se ha unido a la sala " + this.namedestino)
    }
    this.chatService.getMessages().subscribe((data: {message, username2}) => {
        if (data.username2 === this.namedestino) {
          this.messages.push(new Modelmessage(data.username2, this.namedestino, data.message, new Date()));
          setTimeout(() => 50);
        }
        if(this.torneocheck && data.username2 !== this.username){
          console.log("ha entrado ?")
          this.messages.push(new Modelmessage(data.username2, this.namedestino, data.message, new Date()));
          setTimeout(() => 50);
        }
        
      
    });
  }


  sendMessage(text: string) {
    this.message = text;
    if (this.message.replace(/\s/g, '').length) {
     
        this.messages.push(new Modelmessage(this.username, this.namedestino,this.message, new Date()));
        this.chatService.sendMessage(this.message, this.namedestino);
        //setTimeout(() => this.scrollToBottom(), 50);
      }
    }


  // ionViewWillLeave() {
  //   this.socket.disconnect();
  // }

}

// getUsers() {
  //   let observable = new Observable(observer => {
  //     this.socket.on('users-changed', (data) => {
  //       observer.next(data);
  //     });
  //   });
  //   return observable;
  // }


  // async showToast(msg) {
  //   let toast = await this.toastCtrl.create({
  //     message: msg,
  //     duration: 2000
  //   });
  //   toast.present();
  // }
