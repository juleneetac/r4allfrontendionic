import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
<<<<<<< HEAD:src/app/pages/partidas/partidas-routing.module.ts
import { AuthGuard } from 'src/app/services/serviceGuard/auth.guard';
import { PartidasPage } from './partidas.page';
=======

import { TorneoDetailPage } from './torneo-detail.page';
>>>>>>> develop:src/app/pages/torneo-detail/torneo-detail-routing.module.ts

const routes: Routes = [
  {
    path: '',
<<<<<<< HEAD:src/app/pages/partidas/partidas-routing.module.ts
    component: PartidasPage,
    canActivate: [AuthGuard]
    
=======
    component: TorneoDetailPage
>>>>>>> develop:src/app/pages/torneo-detail/torneo-detail-routing.module.ts
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TorneoDetailPageRoutingModule {}
