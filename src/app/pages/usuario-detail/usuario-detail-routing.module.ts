import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioDetailPage } from './usuario-detail.page';

const routes: Routes = [
  {
    path: '',
    component: UsuarioDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioDetailPageRoutingModule {}
