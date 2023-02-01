import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

export type AuthMode = 'login' | 'signup';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _router: Router, private _route: ActivatedRoute) {}

  getMode$() {
    return this._route.queryParams.pipe(map(({ mode }) => mode as AuthMode));
  }

  gotoLogin() {
    this._router.navigate([], { queryParams: { mode: 'login' } });
  }

  gotoSignup() {
    this._router.navigate([], { queryParams: { mode: 'signup' } });
  }
}
