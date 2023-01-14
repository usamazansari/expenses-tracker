import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

type AuthMode = 'login' | 'signup';

@Component({
  selector: 'expenses-tracker-auth',
  standalone: true,
  imports: [
    CommonModule,
    LoginComponent,
    SignupComponent,
    MatIconModule,
    MatRippleModule
  ],
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  #mode = new BehaviorSubject<AuthMode>('login');
  mode!: AuthMode;

  constructor(private _route: ActivatedRoute, private _router: Router) {}

  ngOnInit() {
    this._route.queryParams.subscribe(({ mode }) => {
      this.#mode.next(mode);
    });
    this.#mode.subscribe(mode => {
      this.mode = mode;
    });
  }

  gotoLogin() {
    this._router.navigate([], { queryParams: { mode: 'login' } });
  }

  gotoSignup() {
    this._router.navigate([], { queryParams: { mode: 'signup' } });
  }
}
