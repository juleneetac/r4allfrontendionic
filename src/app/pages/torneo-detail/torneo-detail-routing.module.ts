import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TorneoDetailPage } from './torneo-detail.page';

const routes: Routes = [
  {
    path: '',
    component: TorneoDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TorneoDetailPageRoutingModule {}
