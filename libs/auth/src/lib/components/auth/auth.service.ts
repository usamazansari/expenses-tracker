import { Injectable, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

import { RoutePaths } from '@expenses-tracker/shared/common';

export type AuthMode = 'login' | 'signup';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #authMode$ = new BehaviorSubject<AuthMode>('login');
  #authMode: AuthMode = 'login';

  #router = inject(Router);

  fetchAuthMode() {
    this.#router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(e => {
      const { url, urlAfterRedirects } = e as NavigationEnd;
      this.setAuthMode((urlAfterRedirects ?? url)?.split('/').at(-1) as AuthMode);
    });
  }

  setAuthMode(authMode: AuthMode) {
    this.#authMode = authMode;
    this.#authMode$.next(this.#authMode);
  }

  watchAuthMode$() {
    return this.#authMode$.asObservable();
  }

  gotoLogin() {
    this.setAuthMode('login');
    this.#router.navigate([RoutePaths.Auth, RoutePaths.AuthLogin]);
  }

  gotoSignup() {
    this.setAuthMode('signup');
    this.#router.navigate([RoutePaths.Auth, RoutePaths.AuthSignup]);
  }
}
