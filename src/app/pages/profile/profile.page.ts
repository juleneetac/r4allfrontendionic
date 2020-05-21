import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/serviceAuth/auth.service';
import { StorageComponent } from 'src/app/storage/storage.component';
import { Modelusuario } from 'src/app/models/modelUsusario/modelusuario';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  ambiente: Ambiente; 
  path;
  constructor(
    public auth: AuthService,  //se puede quitar creo
    private storage: StorageComponent
  ) { 
    this.ambiente = new Ambiente();
      this.path=this.ambiente.path; 
    }

  localperfil: Modelusuario;
    
  ngOnInit() {
    this.localperfil = JSON.parse(this.storage.getUser());
  }

}
