import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';

import {
  AccountGraphicComponent,
  AuthGraphicComponent,
  DashboardGraphicComponent,
  LogoGraphicComponent
} from '@expenses-tracker/shared/assets';

import { NavbarService } from './navbar.service';

@Component({
  selector: 'expenses-tracker-navbar',
  standalone: true,
  imports: [
    AccountGraphicComponent,
    AuthGraphicComponent,
    DashboardGraphicComponent,
    CommonModule,
    LogoGraphicComponent,
    MatRippleModule
  ],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  user$!: Observable<User | null>;

  @Output() gotoHome$ = new EventEmitter<void>();
  @Output() gotoAuth$ = new EventEmitter<void>();
  @Output() gotoDashboard$ = new EventEmitter<void>();

  constructor(private _service: NavbarService, private _router: Router) {}

  ngOnInit() {
    this.user$ = this._service.getUser$();
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

  gotoProfile() {
    this._router.navigate(['profile']);
  }
}
