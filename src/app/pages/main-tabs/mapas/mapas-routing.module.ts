import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/services/serviceGuard/auth.guard';
import { MapasPage } from './mapas.page';

const routes: Routes = [
  {
    path: '',
    component: MapasPage,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapasPageRoutingModule {}
