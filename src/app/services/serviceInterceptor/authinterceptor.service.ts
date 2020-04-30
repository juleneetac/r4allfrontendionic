import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
//import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AuthinterceptorService implements HttpInterceptor {

  constructor(
    private router: Router,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('token');
        let request = req;
        if (token) {
            request = req.clone({
                setHeaders: {
                    authorization: `Token ${ token }`
                }
            });
        }
        return next.handle(request).pipe(
          catchError((err: HttpErrorResponse) => {
              if (err.status === 401) {
                  localStorage.clear();
                  this.router.navigateByUrl('/login');
                  //this.snackBar.open('Session has expired, log in again');
              }
              return throwError( err );
          })
      );
  }
  
}
