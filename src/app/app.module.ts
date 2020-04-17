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
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
// import { AdminComponent } from './components/admin/admin.component';
// import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageModule } from './pages/home/home.module';
// import { Main } from './components/main/main.component';
//import {MatListModule} from "@angular/material/list";
// import { MainPage } from './pages/main/main.page';


@NgModule({
  declarations: [
    AppComponent
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
    HomePageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ToastController,
    HttpClientModule,
    { 
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
