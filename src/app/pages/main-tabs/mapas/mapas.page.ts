import { Component, OnInit } from '@angular/core';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { Map, tileLayer, marker, polyline } from 'leaflet';
import * as L from 'leaflet';
import { Geoposition, Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-mapas',
  templateUrl: './mapas.page.html',
  styleUrls: ['./mapas.page.scss'],
})
export class MapasPage implements OnInit {

  constructor(
    public geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder
  ) { }

  mymap: Map;
  marker: any;
  popup: any;

  clubs = [];

  lat?: number;
  lon?: number;

  milat?:any
  milon?: any

    /* tilesProvider = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  myMap = L.map('myMap').setView([51.505,-0.09],10); */

/*   L.tileLayer(tilesProvider, {
    maxZoom:18,
  }).addTo(myMap); */
  /* 
  tilesProvider = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  myMap = L.map('myMap').setView([51.505,-0.09],10); */

  /* map:Map;
  marker: any;
  latlong = []; */

  /* private map; */

/*   mymap = L.map('mapid').setView([51.505, -0.09], 13);
 */
 /*  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
}).addTo(mymap); */

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
  
  /* 
      console.log(this.milat);
      console.log(this.milon); */
    });
  }

  /* getGeolocation (){
  this.geolocation.getCurrentPosition().then((geoposition:Geoposition)=>{
    this.lat= geoposition.coords.latitude;
    this.lon= geoposition.coords.longitude;
    });
  } */

  /* 
  ionViewDidLoad(){
    this.geolocation.getCurrentPosition().then((resp)=>{
      console.log("Mi ubicación", resp.coords);

    }).catch((error) =>{
      console.log("Error",error)
    });
  } */

  ionViewDidEnter(){
    /*   this.geolocalizacion();
    */
      this.milat = JSON.parse(localStorage.getItem("milatitud"));
      this.milon = JSON.parse(localStorage.getItem("milongitud"));
    
      console.log(this.milat);
      console.log(this.milon);
      /* console.log(this.lat);
      console.log(this.lon); */
    
    
    
      this.loadMap();
    
    
    /*   https://edupala.com/how-to-add-leaflet-map-in-ionic/
    */  
    
    /*  fetch('./assets/data.json').then(res => res.json())
      .then(json => {
        this.clubs = json.properties;
        this.leafletMap();
      });
    }
    
    leafletMap() {
      for (const clubs of this.clubs) {
        marker([clubs.lat, clubs.long]).addTo(this.map)
          .bindPopup(clubs.city)
          .openPopup();
      } */
  }
  

  loadMap(){
    this.mymap = L.map('mapid').setView([this.milat,this.milon], 16);
    
  
     /*this.marker = L.circle([41.3887901,2.1589899],{
      color:'red',
      radius:500
    }).addTo(this.mymap); */
  
    /* marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup(); */
     /*  this.popup.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
      this.popup = L.popup()
      .setLatLng([45.3887901,2.1589899])
      .setContent("I am a standalone popup")
      .openOn(this.mymap)
      .addTo(this.mymap);
   */
    /* this.popup = L.popup()
    .setLatLng([41.3887901,2.1589899])
    .setContent("I am a standalone popup.")
    .openOn(this.mymap);
    this.popup.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup(); */
  
     marker([this.milat,this.milon],{
    }).addTo(this.mymap)
    .bindPopup("<b>Mi ubicación</b><br>la usaremos para determinar tus rivales, etc.").openPopup();
   
  
    /* var custom = new L.Icon ({
      iconUrl: '../../../assets/images3.png',
      iconSize: [50, 50],
      iconAnchor: [25, 50]
    })
  
    L.marker([this.milat,this.milon],{icon:custom}).addTo(this.mymap); */
  
  
  
  
  
    /* marker([41.40,2.1589899],{
    }).addTo(this.mymap)
    .bindPopup("<b>Jugónnnn</b><br>ratatatatatatatatatata").openPopup() */
    
    /* 'https://image.flaticon.com/icons/svg/854/854866.svg'   icono-removebg-preview(1) */
    
    
    /* .on('click', function(e){
      e = this.latLng;
      console.log(e);
    }) */;
  
  
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
      attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      /* maxZoom: 18,
      tileSize: 512,
    zoomOffset: -1 */
    }).addTo(this.mymap);
    
    function onMapClick(e) {
      alert("You clicked the map at " + e.latlng);
    }
  
    this.mymap.on('click', onMapClick);
    
  }

  /* 
 locatePosition(){
  this.mymap.locate({setView:true}).on("locationfound", (e: any)=> {
    this.newMarker = marker([e.latitude,e.longitude], {draggable: 
    true}).addTo(this.mymap);
    this.newMarker.bindPopup("You are located here!").openPopup();
   
    this.newMarker.on("dragend", ()=> {
      const position = this.newMarker.getLatLng();
     });
  });
}  */
  /* private initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });
  } */


 /*  getAddress(lat: number, long: number) {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.geocoder.reverseGeocode(lat, long, options).then(results => {
      this.address = Object.values(results[0]).reverse();
      
    });
  }
 */
  /*ionViewDidEnter(){
    this.showMap();
  }

  showMap(){
    this.map = new Map('myMap').setView([41.3718427,2.162842],10); //el zoom es 10
    tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(this.map);

  }
  
  getPositions(){
    this.geolocation.getCurrentPosition({
      enableHighAccuracy:true
    }).then((res)=>{
      return this.latlong = [
        res.coords.latitude,
        res.coords.longitude
      ]
    }).then((latlng)=>{
      this.showMarker(latlng);
    })
  }

  showMarker(latLong){
    this.marker = marker(latLong);
    this.marker.addTo(this.map)
    .bindPopup('Estás aqui');
  }
  */


 /* ionViewWillLeave() {
  this.mymap.remove();
} */

}
