import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';
import { AuthGuard } from 'src/app/services/serviceGuard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
