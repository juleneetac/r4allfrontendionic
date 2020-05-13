import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/serviceAuth/auth.service';
import { StorageComponent } from 'src/app/storage/storage.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  //PerfilLocal: String //ESTO NO SERA UN STRING EN EL FUTURO, SERA UN USER
  
  identificador:string;  //ESTO NO SERA UN STRING EN EL FUTURO, SERA UN USER

  localperfil: string;


  constructor(
    public auth: AuthService,  //se puede quitar creo
    private storage: StorageComponent,

    ) { }

    
  ngOnInit() {
    this.localperfil =  JSON.parse(this.storage.getUser());
    //this.PerfilLocal = localStorage.getItem("Usuario");
    console.log(this.localperfil);
  }

}
