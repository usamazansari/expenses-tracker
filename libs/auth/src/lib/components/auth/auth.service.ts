import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export type AuthMode = 'login' | 'signup';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #authMode$ = new BehaviorSubject<AuthMode>('login');
  #authMode: AuthMode = 'login';

  constructor(private _router: Router) {}

  setAuthMode(authMode: AuthMode) {
    this.#authMode = authMode;
    this.#authMode$.next(this.#authMode);
  }

  watchAuthMode$() {
    return this.#authMode$.asObservable();
  }

  gotoLogin() {
    this.setAuthMode('login');
    this._router.navigate(['auth', 'login']);
  }

  gotoSignup() {
    this.setAuthMode('signup');
    this._router.navigate(['auth', 'signup']);
  }
}
