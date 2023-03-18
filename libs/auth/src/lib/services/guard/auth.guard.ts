import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _auth: AngularFireAuth, private _router: Router) {}

  canActivate() {
    return this._auth.user.pipe(
      map(user => {
        if (!!user) {
          return true;
        } else {
          this._router.navigate(['auth', 'login']);
          return false;
        }
      })
    );
  }
}

@Injectable({
  providedIn: 'root'
})
export class ReverseAuthGuard implements CanActivate {
  constructor(private _auth: AngularFireAuth, private _router: Router) {}

  canActivate() {
    return this._auth.user.pipe(
      map(user => {
        if (!user) {
          return true;
        } else {
          this._router.navigate(['dashboard']);
          return false;
        }
      })
    );
  }
}
