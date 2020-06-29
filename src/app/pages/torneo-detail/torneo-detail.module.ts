import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TorneoDetailPageRoutingModule } from './torneo-detail-routing.module';

import { TorneoDetailPage } from './torneo-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TorneoDetailPageRoutingModule
  ],
  declarations: [TorneoDetailPage]
})
export class TorneoDetailPageModule {}
