import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/serviceAuth/auth.service';
import { StorageComponent } from 'src/app/storage/storage.component';
import { Modelusuario } from 'src/app/models/modelUsusario/modelusuario';
import { Ambiente } from 'src/app/services/ambiente';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  
  constructor(
    public auth: AuthService,  //se puede quitar creo
    private storage: StorageComponent,
    private ambiente: Ambiente
  ) { }

  localperfil: Modelusuario;
    
  ngOnInit() {
    this.localperfil = JSON.parse(this.storage.getUser());
  }

}
