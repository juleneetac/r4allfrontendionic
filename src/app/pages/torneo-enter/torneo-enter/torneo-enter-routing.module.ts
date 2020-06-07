import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TorneoEnterPage } from './torneo-enter.page';

const routes: Routes = [
  {
    path: '',
    component: TorneoEnterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TorneoEnterPageRoutingModule {}
