import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartidasPage } from './partidas.page';

const routes: Routes = [
  {
    path: '',
    component: PartidasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartidasPageRoutingModule {}
