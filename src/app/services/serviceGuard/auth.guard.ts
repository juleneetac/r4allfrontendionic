import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../serviceAuth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router : Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean|UrlTree> | boolean {

    if(!this.auth.authenticationState){
      console.log(String(this.auth.authenticationState))
      return this.auth.isAuthenticated$.pipe(
        tap(loggedIn => {
         console.log("test")
          if (!loggedIn) {
          // this.auth.login();
          console.log("no puedes entrar")
          this.router.navigateByUrl("login")
          }
        })
      );
    }
    else return true;
} 
  /* canActivate2(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean|UrlTree> | boolean {
    if (this.auth.authenticationState)
      return true
      else return false
    
  } */
}
