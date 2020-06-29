import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/services/serviceGuard/auth.guard';
import { EditfacebookPage } from './editfacebook.page';

const routes: Routes = [
  {
    path: '',
    component: EditfacebookPage,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditfacebookPageRoutingModule {}
