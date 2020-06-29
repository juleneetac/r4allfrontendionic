import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Router} from "@angular/router";
import { AuthService } from './services/serviceAuth/auth.service';
import { ChatService } from './services/serviceChat/chat.service';
//import { StorageComponent } from './storage/storage.component';
import { Modelusuario } from './models/modelUsusario/modelusuario';
import { Ambiente } from './services/ambiente';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  usuarioLogueado: Modelusuario;

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Register',
      url: '/register',
      icon: 'create'
    },

    {
      title: 'Login',
      url: '/login',
      icon: 'finger-print'
    },

    {
      title: 'Go to Admin',
      url: '/admin',
      icon: 'flash-off'
    },

    // {
    //   title: 'Log out',
    //   url: '/home',
    //   icon: 'exit'

    // },
  ];
  
  public appOut = [

    {
      title: 'Main',
      url: '/main',
      icon: 'browsers'
     },

    {
      title: 'Perfil',
      url: '/profile',
      icon: 'person'
     },

     {
      title: 'Chat',
      url: '/chat',
      icon: 'chatbox-ellipses'
     },

     {
      title: 'Editar Perfil',
      url: '/perfil',
      icon: 'settings'
     },

     {
      title: 'Log out',
      url: '/home',
      icon: 'exit'
     },
];
constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private router: Router,
    //public storage: StorageComponent,
    private statusBar: StatusBar,
    public auth: AuthService,
    public chatService: ChatService,
    private ambiente: Ambiente
  ) 
  
  {
    this.initializeApp();
  }

  logout(){
    this.auth.logout();
    this.chatService.disconnectSocket();
  }

  checkButton(index :number){
    console.log()
    if (index==4){
      console.log(index)
      this.logout();
    }
  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      //this.usuarioLogueado = JSON.parse(this.storage.getUser());
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}

