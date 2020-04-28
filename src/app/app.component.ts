import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Router} from "@angular/router";
import { AuthService } from './services/serviceAuth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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
      icon: 'desktop'
     },

    {
      title: 'Perfil',
      url: '/profile',
      icon: 'person'
     },

     {
      title: 'Chat',
      //url: '/chat',
      icon: 'chatbox-ellipses'
     },

    {
      title: 'Map',
      //url: '/mapa',
      icon: 'location'
     },

     {
      title: 'Settings (Editar Perfil provisional)',
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
  ) 
  
  {
    this.initializeApp();
  }

  logout(){
    this.auth.logout();
  }
  checkButton(index :number){
    console.log("incorrecto" + index)
    if (index==5){
      console.log(index)
    this.logout();
    }

  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}

