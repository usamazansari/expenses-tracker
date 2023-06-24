import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

import { ContextService } from '@expenses-tracker/core';
import { RoutePaths } from '@expenses-tracker/shared/common';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  #context = inject(ContextService);
  #router = inject(Router);

  getUser$() {
    return this.#context.watchUser$();
  }

  gotoHome() {
    this.#router.navigate([RoutePaths.Home]);
  }

  gotoAuth() {
    this.#router.navigate([RoutePaths.Auth]);
  }

  gotoDashboard() {
    this.#router.navigate([RoutePaths.Dashboard]);
  }

  gotoPocketbook() {
    this.#router.navigate([RoutePaths.Pocketbook]);
  }

  gotoProfile() {
    this.#router.navigate([RoutePaths.Profile]);
  }
}
