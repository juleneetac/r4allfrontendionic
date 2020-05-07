import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// import { TorneosComponent } from './components/torneos/torneos.component';
// import { LoginComponent } from './components/login/login.component';
// import { RegisterComponent } from './components/register/register.component';
// import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient  } from '@angular/common/http';
import { RouterModule } from '@angular/router';
// import { AdminComponent } from './components/admin/admin.component';
// import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageModule } from './pages/home/home.module';
import { StorageComponent } from './storage/storage.component';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AuthinterceptorService } from './services/serviceInterceptor/authinterceptor.service';
//import { MenubarPage } from './pages/menubar/menubar.page';
// import { Main } from './components/main/main.component';
//import {MatListModule} from "@angular/material/list";
// import { MainPage } from './pages/main/main.page';

//import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';  // tema sockets

 

@NgModule({
  declarations: [
    AppComponent,
    StorageComponent
    // UsuariosComponent,
    // TorneosComponent,
    // LoginComponent,
    // RegisterComponent,
    // MainPage
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    //MatListModule,
    ReactiveFormsModule,
    HomePageModule,
    //SocketIoModule.forRoot(config)
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ToastController,
    HttpClientModule,
    NativeStorage,
    StorageComponent,
    { 
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy 
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthinterceptorService,
      multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}

