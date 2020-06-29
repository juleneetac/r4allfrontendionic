import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChartPageRoutingModule } from './chart-routing.module';
import { ChartPage } from './chart.page';

//import { GoogleChartsModule } from 'angular-google-charts';  //para los graficos
// import { Ng2GoogleChartsModule } from 'ng2-google-charts';
//import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChartPageRoutingModule,
    //GoogleChartsModule.forRoot({ version: 'chart-version' }),
    //Ng2GoogleChartsModule
    //ChartsModule,
    
  ],
  declarations: [ChartPage]
})
export class ChartPageModule {}
