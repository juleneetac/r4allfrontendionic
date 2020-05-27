import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Geolocation } = Plugins;
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  constructor(
    private http: HttpClient
  ) { }

  async getCurrentPosition() {
    try{
      let coordinates = await Geolocation.getCurrentPosition();
      return [coordinates.coords.longitude, coordinates.coords.latitude]; //Formato GeoJSON
    }
    catch(GeolocationPositionError){
      return [1.9872382,41.2755526];  //Si no se han aceptado los permisos de ubicación, se pone como ubicación por defecto la EETAC
    }
  }

  async getCurrentLongitude() {
    try{
      let coordinates = await Geolocation.getCurrentPosition();
      return coordinates.coords.longitude;
    }
    catch(GeolocationPositionError){
      return 1.9872382;  //Si no se han aceptado los permisos de ubicación, se pone como ubicación por defecto la EETAC
    }
  }

  async getCurrentLatitude() {
    try{
      let coordinates = await Geolocation.getCurrentPosition();
      return coordinates.coords.latitude;
    }
    catch(GeolocationPositionError){
      return 41.2755526;  //Si no se han aceptado los permisos de ubicación, se pone como ubicación por defecto la EETAC
    }
  }

  getReverseGeocode(latitude:number, longitude:number): Observable<any> {
    //Using the OpenStreetMap Nominatim API:
    //https://nominatim.org/release-docs/develop/api/Reverse/
    return this.http.get<any>(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`, {responseType: 'json'});
  }
}
