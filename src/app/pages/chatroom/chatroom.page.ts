import { Component, OnInit } from '@angular/core';
//import {Observable} from "rxjs";
//import { Observable } from 'rxjs/Observable';
import { NavController, NavParams, ToastController } from '@ionic/angular';
//import { Socket } from 'ng-socket-io';
import * as io from 'socket.io-client' ;
import { UsuarioService } from 'src/app/services/serviceUsuario/usuario.service';
import { StorageComponent } from 'src/app/storage/storage.component';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Ambiente } from 'src/app/services/ambiente';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.page.html',
  styleUrls: ['./chatroom.page.scss'],
})
export class ChatroomPage implements OnInit {
  messages = [];
  message = '';
  user = JSON.parse(this.storage.getUser());
  username = this.user.username;
  ambiente: Ambiente;
  private socket;

  constructor(
    private usuariosSevice: UsuarioService,
    private storage: StorageComponent,
    private router: Router,
    public navCtrl: NavController, 
    //private socket: Socket,
    private toastCtrl: ToastController
  ) { 
    this.ambiente = new Ambiente(); //para coger la url del backend y que reconozca el socket
    console.log(this.ambiente.path) 
    this.socket = io(this.ambiente.path);


    this.getMessages().subscribe(message => {
      this.messages.push(message);
    });
 
    this.getUsers().subscribe(data => {
      let user = data['user'];
      if (data['event'] === 'left') {
        this.showToast('User left: ' + user);
      } else {
        this.showToast('User joined: ' + user);
      }
    });
  }

  ngOnInit() {
  }

  getUsers() {
    let observable = new Observable(observer => {
      this.socket.on('users-changed', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  sendMessage() {
    this.socket.emit('add-message', { text: this.message, from: this.username });
    this.message = '';
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }

  async showToast(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }



}

