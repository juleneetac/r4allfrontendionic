import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/serviceAuth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  PerfilLocal: String //ESTO NO SERA UN STRING EN EL FUTURO, SERA UN USER
  constructor(
    public auth: AuthService,
    ) { }

    
  ngOnInit() {
    this.PerfilLocal = localStorage.getItem("Usuario");
  }

}
