import { Component,NgModule, OnInit } from '@angular/core';

import {NativeStorage} from "@ionic-native/native-storage/ngx";
import {Platform} from "@ionic/angular";

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss'],
})
export class StorageComponent implements OnInit {

    constructor(
        private nativeStorage: NativeStorage,
        public platform: Platform) {}

    ngOnInit() {}

    async saveToken(token){
        localStorage.setItem('token', token);
    }

    getToken(){
        return localStorage.getItem('token');
    }

    async saveUser(user){
        localStorage.setItem('user', user);
    }

    getUser(){
        return localStorage.getItem('user');
    }

    saveSocket(socket){
        localStorage.setItem('socket', socket);
    }

    getSocket(){
        return localStorage.getItem('socket');
    }

    clearStorage(){
        return localStorage.clear();
    }

}