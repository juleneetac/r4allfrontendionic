import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})

export class MainPage {

  constructor() {  }

  selectedPunto;  //Variable donde se guarda la Ubicación (Punto) del Torneo, Usuario, etc. que se ha pulsado en la Lista
  
  ngOnInit() {

  }

  selectPunto(punto:any){ 
    //Para guardar el punto seleccionado, y luego mostrarlo en el Tab de Mapas
    this.selectedPunto = punto;
  }

}
