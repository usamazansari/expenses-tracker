import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { AuthService } from '@expenses-tracker/auth';
import {
  AccountGraphicComponent,
  AuthGraphicComponent,
  LogoGraphicComponent
} from '@expenses-tracker/shared/assets';

@Component({
  selector: 'expenses-tracker-navbar',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    AccountGraphicComponent,
    LogoGraphicComponent,
    AuthGraphicComponent
  ],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  #isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn = false;

  @Output() gotoHome$ = new EventEmitter<void>();
  @Output() gotoAuth$ = new EventEmitter<void>();

  constructor(private _auth: AuthService) {}

  ngOnInit() {
    this._auth.isLoggedIn$.subscribe(state => {
      this.#isLoggedIn$.next(state);
    });

    this.#isLoggedIn$.subscribe(state => {
      this.isLoggedIn = state;
    });
  }

  gotoHome() {
    this.gotoHome$.emit();
  }

  gotoAuth() {
    this.gotoAuth$.emit();
  }
}
