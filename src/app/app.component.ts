import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Router} from "@angular/router";

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
   
  ];
constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private router: Router,
    //public storage: StorageComponent,
    private statusBar: StatusBar
  ) 
  
  {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  // logOff(){
  //   this.storage.clearStorage();
  //   this.router.navigateByUrl('/login');
  // }
}

