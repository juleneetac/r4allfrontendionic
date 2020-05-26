import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterfacebookPageRoutingModule } from './registerfacebook-routing.module';

import { RegisterfacebookPage } from './registerfacebook.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterfacebookPageRoutingModule
  ],
  declarations: [RegisterfacebookPage]
})
export class RegisterfacebookPageModule {}
