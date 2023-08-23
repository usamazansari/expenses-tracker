import { Location } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { RoutePaths } from '@expenses-tracker/shared/common';

type AuthMode = 'login' | 'signup';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authMode = signal<AuthMode>('login');

  #router = inject(Router);
  #location = inject(Location);

  fetchAuthMode() {
    this.authMode.set(this.#location.path().split('/').at(-1) as AuthMode);
  }

  gotoLogin() {
    this.authMode.set('login');
    this.#router.navigate([RoutePaths.Auth, RoutePaths.AuthLogin]);
  }

  gotoSignup() {
    this.authMode.set('signup');
    this.#router.navigate([RoutePaths.Auth, RoutePaths.AuthSignup]);
  }
}
