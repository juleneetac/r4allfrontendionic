import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditfacebookPageRoutingModule } from './editfacebook-routing.module';

import { EditfacebookPage } from './editfacebook.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditfacebookPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [EditfacebookPage]
})
export class EditfacebookPageModule {}
