import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/services/serviceGuard/auth.guard';
import { PartidasPage } from './partidas.page';

const routes: Routes = [
  {
    path: '',
    component: PartidasPage,
    canActivate: [AuthGuard]
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartidasPageRoutingModule {}
