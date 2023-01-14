import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { UserInfo } from 'firebase/auth';
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
  isLoggedIn$!: Observable<boolean>;
  user$!: Observable<UserInfo | null>;

  @Output() gotoHome$ = new EventEmitter<void>();
  @Output() gotoAuth$ = new EventEmitter<void>();
  @Output() gotoDashboard$ = new EventEmitter<void>();

  constructor(private _service: NavbarService) {}

  ngOnInit() {
    this.isLoggedIn$ = this._service.getIsLoggedIn$();
    this.user$ = this._service.getUser$();
  }

  gotoHome() {
    this.gotoHome$.emit();
  }

  gotoAuth() {
    this.gotoAuth$.emit();
  }

  gotoDashboard() {
    this.gotoDashboard$.emit();
  }
}
