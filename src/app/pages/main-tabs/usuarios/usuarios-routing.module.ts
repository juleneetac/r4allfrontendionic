import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/services/serviceGuard/auth.guard';
import { UsuariosPage } from './usuarios.page';

const routes: Routes = [
  {
    path: '',
    component: UsuariosPage,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosPageRoutingModule {}
