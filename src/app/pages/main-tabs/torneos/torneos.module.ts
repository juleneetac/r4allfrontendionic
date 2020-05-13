import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TorneosPageRoutingModule } from './torneos-routing.module';

import { TorneosPage } from './torneos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TorneosPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TorneosPage]
})
export class TorneosPageModule {}
