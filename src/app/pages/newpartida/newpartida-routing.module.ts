import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewpartidaPage } from './newpartida.page';

const routes: Routes = [
  {
    path: '',
    component: NewpartidaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewpartidaPageRoutingModule {}
