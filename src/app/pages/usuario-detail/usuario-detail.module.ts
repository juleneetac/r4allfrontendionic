import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuarioDetailPageRoutingModule } from './usuario-detail-routing.module';

import { UsuarioDetailPage } from './usuario-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuarioDetailPageRoutingModule
  ],
  declarations: [UsuarioDetailPage]
})
export class UsuarioDetailPageModule {}
