import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';

import {
  AccountGraphicComponent,
  AuthGraphicComponent,
  DashboardGraphicComponent,
  LogoGraphicComponent,
  PocketbookGraphicComponent
} from '@expenses-tracker/shared/assets';

import { NavbarService } from './navbar.service';

@Component({
  selector: 'expenses-tracker-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatRippleModule,

    AccountGraphicComponent,
    AuthGraphicComponent,
    DashboardGraphicComponent,
    LogoGraphicComponent,
    PocketbookGraphicComponent
  ],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  user$!: Observable<User | null>;

  @Output() gotoHome$ = new EventEmitter<void>();
  @Output() gotoAuth$ = new EventEmitter<void>();
  @Output() gotoDashboard$ = new EventEmitter<void>();
  @Output() gotoPocketbook$ = new EventEmitter<void>();

  constructor(private _service: NavbarService) {}

  ngOnInit() {
    this.user$ = this._service.getUser$();
  }

  gotoHome() {
    this._service.gotoHome();
  }

  gotoAuth() {
    this._service.gotoAuth();
  }

  gotoDashboard() {
    this._service.gotoDashboard();
  }

  gotoPocketbook() {
    this._service.gotoPocketbook();
  }

  gotoProfile() {
    this._service.gotoProfile();
  }
}
