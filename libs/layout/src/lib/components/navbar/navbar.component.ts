import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, computed, inject } from '@angular/core';

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
    AccountGraphicComponent,
    AuthGraphicComponent,
    DashboardGraphicComponent,
    LogoGraphicComponent,
    PocketbookGraphicComponent
  ],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  #service = inject(NavbarService);
  user = computed(() => this.#service.user());
  @Output() gotoHome$ = new EventEmitter<void>();
  @Output() gotoAuth$ = new EventEmitter<void>();
  @Output() gotoDashboard$ = new EventEmitter<void>();
  @Output() gotoPocketbook$ = new EventEmitter<void>();

  gotoHome() {
    this.#service.gotoHome();
  }

  gotoAuth() {
    this.#service.gotoAuth();
  }

  gotoDashboard() {
    this.#service.gotoDashboard();
  }

  gotoPocketbook() {
    this.#service.gotoPocketbook();
  }

  gotoProfile() {
    this.#service.gotoProfile();
  }
}
