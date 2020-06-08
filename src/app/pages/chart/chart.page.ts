import { Component, OnInit, ViewChild } from '@angular/core';
import { Modelusuario } from 'src/app/models/modelUsusario/modelusuario';
import { UsuarioService } from 'src/app/services/serviceUsuario/usuario.service';

 
@Component({
  selector: 'app-chart',
  templateUrl: './chart.page.html',
  styleUrls: ['./chart.page.scss'],
})
export class ChartPage implements OnInit {
  public googleChartLibrary;
  public usuarios: Modelusuario[];
  public itemsUsuarios = [];
  public values = [];
  public i: number;

  constructor(private usuariosService: UsuarioService, ) {  }

  ngOnInit() {
    this.getAllUsuarios();
    this.useVanillaJSLibrary();
  }



  useVanillaJSLibrary() {
    this.googleChartLibrary = (<any> window).google;
    // Load the Visualization API and the corechart package.
    this.googleChartLibrary.charts.load('current', { 'packages': ['corechart'] });

    // Set a callback to run when the Google Visualization API is loaded.
    this.googleChartLibrary.charts.setOnLoadCallback(this.DrawPieChart.bind(this));
  }

  DrawPieChart()
  {
    this.values.push(['ID', 'Partidos jugados', 'Torneos jugados', 'Género','Experiencia' ]), //le paso el nombre de cada cosa en el array
    this.i = 0;
    while (this.i < this.usuarios.length)  {
      this.itemsUsuarios = this.usuarios;
      //this.values.push([this.itemsUsuarios[this.i].username, this.itemsUsuarios[this.i].partidas.length, 9, this.itemsUsuarios[this.i].sexo, 67]),
      this.values.push([this.itemsUsuarios[this.i].username, 
                        this.itemsUsuarios[this.i].partidas.length, 
                        this.itemsUsuarios[this.i].torneos.length, 
                        this.itemsUsuarios[this.i].sexo, 
                        this.itemsUsuarios[this.i].exp
                      ]),
       //voy metiendo a cada user en su array
      this.i++;
      }
      console.log(this.values)
  

    var data = this.googleChartLibrary.visualization.arrayToDataTable(
      this.values,
      //['ID',                       'Partidos jugados',   'Torneos jugados',          'Género',           'Experiencia'],
      // [this.usuarios[1].username,          20,                20,              this.usuarios[1].sexo,          150],
      // [this.usuarios[0].username,           10,                3,               this.usuarios[0].sexo,          9],
    );

    var options = {
      title: 'Experciancia de los usuarios en función de los partidos y torneos jugados',
      hAxis: {title: 'Partidos jugados'},
      vAxis: {title: 'Torneos jugados'},
      bubble: {
          textStyle: {
            fontSize: 11,
            auraColor: 'none',
          }
        },
      legend : { position: "right", alignment: "center"},   
       };

    var chart = new this.googleChartLibrary.visualization.BubbleChart(document.getElementById('bubbleChart'));
    chart.draw(data, options);
  }

  public getAllUsuarios(){   //obtengo todos los usuarios
    this.usuariosService.getAllUsuarios().subscribe(
      (data) => {
        this.usuarios = data;
      },
      (err) => {
        console.log("err", err);
      }
    ) 
  }
}
