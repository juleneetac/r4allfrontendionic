import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/services/serviceGuard/auth.guard';
import { NewpartidaPage } from './newpartida.page';

const routes: Routes = [
  {
    path: '',
    component: NewpartidaPage,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewpartidaPageRoutingModule {}
