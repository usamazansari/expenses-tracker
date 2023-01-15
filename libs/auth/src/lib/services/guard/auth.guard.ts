import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs';

import { NotificationService } from '@expenses-tracker/layout';

import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _service: AuthService,
    private _router: Router,
    private _notification: NotificationService
  ) {}

  canActivate() {
    return this._service.getIsLoggedIn$().pipe(
      // switchMap(state => {
      map(state => {
        if (state) {
          return true;
        } else {
          this._notification.error({
            description: `Please login to continue.`,
            title: 'Not Logged In'
          });
          this._router.navigate(['auth'], { queryParams: { mode: 'login' } });
          return false;
        }
      })
    );
  }
}
