import { Component, OnInit } from '@angular/core';
import { StorageComponent } from 'src/app/storage/storage.component'
import { Modelusuario } from 'src/app/models/modelUsusario/modelusuario';
import { Ambiente } from 'src/app/services/ambiente';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
ambiente: Ambiente; 
  path;
  constructor(
    private storage: StorageComponent
  ) {
    this.ambiente = new Ambiente();
    this.path=this.ambiente.path;
    }

  usuarioLogueado: Modelusuario;  //Usuario logueado en la Aplicación (ha de venir del Login)

  ngOnInit() {
    this.usuarioLogueado = JSON.parse(this.storage.getUser());
  }

}
