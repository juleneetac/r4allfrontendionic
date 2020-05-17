import { Component, OnInit } from '@angular/core';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { Geoposition, Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})

export class MainPage {


  constructor(
    public geolocation: Geolocation
  ) {  }

  lat?: any;
  lon?: any;

  selectedPunto;  //Variable donde se guarda la Ubicación (Punto) del Torneo, Usuario, etc. que se ha pulsado en la Lista
  
  ngOnInit() {
    this.geolocalizacion();
  }

  geolocalizacion(){
    this.geolocation.getCurrentPosition().then((geoposition: Geoposition) => {
      console.log(geoposition);
  
      this.lat = geoposition.coords.latitude;
      this.lon = geoposition.coords.longitude;
  
      localStorage.setItem("milatitud", JSON.stringify(this.lat));
      localStorage.setItem("milongitud", JSON.stringify(this.lon));
  
      console.log(this.lat);
      console.log(this.lon);

    });
  }

  selectPunto(punto:any){ 
    //Para guardar el punto seleccionado, y luego mostrarlo en el Tab de Mapas
    this.selectedPunto = punto;
  }

}
