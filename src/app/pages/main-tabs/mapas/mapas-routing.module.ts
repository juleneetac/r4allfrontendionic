import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapasPage } from './mapas.page';

const routes: Routes = [
  {
    path: '',
    component: MapasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapasPageRoutingModule {}
