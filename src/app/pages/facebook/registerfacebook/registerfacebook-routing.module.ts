import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterfacebookPage } from './registerfacebook.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterfacebookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterfacebookPageRoutingModule {}
