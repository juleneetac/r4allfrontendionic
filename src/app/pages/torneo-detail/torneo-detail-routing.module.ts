import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/services/serviceGuard/auth.guard';

import { TorneoDetailPage } from './torneo-detail.page';


const routes: Routes = [
  {
    path: '',
    component: TorneoDetailPage,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TorneoDetailPageRoutingModule {}
