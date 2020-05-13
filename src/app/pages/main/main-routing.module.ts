import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';
import { UsuariosPageModule } from '../main-tabs/usuarios/usuarios.module';
import { TorneosPageModule } from '../main-tabs/torneos/torneos.module';
import { MapasPageModule } from '../main-tabs/mapas/mapas.module';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../main-tabs/dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'usuarios',
        loadChildren: () => import('../main-tabs/usuarios/usuarios.module').then(m => UsuariosPageModule)
      },
      {
        path: 'torneos',
        loadChildren: () => import('../main-tabs/torneos/torneos.module').then(m => TorneosPageModule)
      },
      {
        path:'mapas',
        loadChildren: () => import('../main-tabs/mapas/mapas.module').then(m => MapasPageModule)
      },
      {
        path: '',
        redirectTo: '/main/dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/main/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
