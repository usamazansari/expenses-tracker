import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _service: AuthService, private _router: Router) {}

  canActivate() {
    return this._service.getUser$().pipe(
      map(user => {
        console.log({ user });
        if (!!user) {
          return true;
        } else {
          this._router.navigate(['auth'], { queryParams: { mode: 'login' } });
          return false;
        }
      })
    );
  }
}
