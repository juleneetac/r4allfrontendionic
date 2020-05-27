import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditfacebookPage } from './editfacebook.page';

const routes: Routes = [
  {
    path: '',
    component: EditfacebookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditfacebookPageRoutingModule {}
