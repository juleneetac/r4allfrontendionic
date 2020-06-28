import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TorneoEnterPageRoutingModule } from './torneo-enter-routing.module';

import { TorneoEnterPage } from './torneo-enter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TorneoEnterPageRoutingModule
  ],
  declarations: [TorneoEnterPage]
})
export class TorneoEnterPageModule {}
