import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleChartInterface} from 'ng2-google-charts';
//import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
// import {
//   ChartErrorEvent,
//   ChartMouseLeaveEvent,
//   ChartMouseOverEvent,
//   ChartSelectionChangedEvent,
//   ChartType,
//   Column,
//   GoogleChartComponent
// } from 'angular-google-charts';
// import {Platform} from '@ionic/angular';  //NO HACE FALTA IMPORTAR NADA SI SE HACE DE ESTA FORMA
// declare var google;                       //SOLO PEGAR EL SCRIPT EN EL index.html
 
@Component({
  selector: 'app-chart',
  templateUrl: './chart.page.html',
  styleUrls: ['./chart.page.scss'],
})
export class ChartPage implements OnInit {
  // public columnChart1: GoogleChartInterface;// = google.visualization.arrayToDataTable;
  // public columnChart2;// GoogleChartInterface;
  // public barChart; //GoogleChartInterface;
  public googleChartLibrary;

  constructor() {   //public platform:Platform
    // this.platform.ready().then(()=>{
    //   google.charts.load('current', {'packages':['corechart']});
    //   //this.DrawPieChart(); porque no se hace¿?
    // })
  }

  ngOnInit() {
    this.useVanillaJSLibrary();
  }

  useVanillaJSLibrary() {
    this.googleChartLibrary = (<any>window).google;
    // Load the Visualization API and the corechart package.
    this.googleChartLibrary.charts.load('current', { 'packages': ['corechart'] });

    // Set a callback to run when the Google Visualization API is loaded.
    this.googleChartLibrary.charts.setOnLoadCallback(this.DrawPieChart.bind(this));
  }

  DrawPieChart()
  {
    var data = this.googleChartLibrary.visualization.arrayToDataTable([
      ['ID', 'Partidos jugados', 'Torneos jugados', 'Género', 'Experiencia'],
      ['Goku',    20,              4,            'Masculino',            15],
      ['Lel',    10,             3,            'Masculino',            9],
      ['Marc',    5,               9,            'Masculino',            2],
      ['Antonia',    4,             3,            'Femenino',            4],
      ['Alex',    29,              2,               'Masculino',            23],
      // ['',    72.49,              1.7,             'f',            7],
      // ['IRQ',    68.09,              4.77,            'm',            3],
      // ['ISR',    81.55,              2.96,            'm',            7],
      // ['RUS',    68.6,               1.54,            'm',            14],
      // ['USA',    78.09,              2.05,            'f',            20]
    ]);

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
      legend : { position:"right", alignment:"center"},   
       };

    var chart = new this.googleChartLibrary.visualization.BubbleChart(document.getElementById('bubbleChart'));
    chart.draw(data, options);

  }

  // public barChartOptions = {
  //   scaleShowVerticalLines: false,
  //   responsive: true
  // };
  // public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  // public barChartType = 'bar';
  // public barChartLegend = true;
  // public barChartData = [
  //   {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
  //   {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  // ];



}
