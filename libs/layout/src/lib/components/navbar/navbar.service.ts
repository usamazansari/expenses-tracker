import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ContextService } from '@expenses-tracker/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  constructor(private _context: ContextService, private _router: Router) {}

  getUser$() {
    return this._context.getUser$();
  }

  gotoHome() {
    this._router.navigate(['']);
  }

  gotoAuth() {
    this._router.navigate(['auth'], { queryParams: { mode: 'login' } });
  }

  gotoDashboard() {
    this._router.navigate(['dashboard']);
  }

  gotoPocketbook() {
    this._router.navigate(['pocketbook']);
  }

  gotoProfile() {
    this._router.navigate(['profile']);
  }
}
