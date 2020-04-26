import { Component, OnInit, NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  //rutas
  goLogin() {
    this.router.navigateByUrl("/login")
  }
  //rutas
  goRegister() {
    this.router.navigateByUrl("/register")
  }

}
