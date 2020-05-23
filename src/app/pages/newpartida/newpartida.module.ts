import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewpartidaPageRoutingModule } from './newpartida-routing.module';

import { NewpartidaPage } from './newpartida.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewpartidaPageRoutingModule
  ],
  declarations: [NewpartidaPage]
})
export class NewpartidaPageModule {}
