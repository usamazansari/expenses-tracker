import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

import { AuthMode, AuthService } from './auth.service';

@Component({
  selector: 'expenses-tracker-auth',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatRippleModule,

    LoginComponent,
    SignupComponent
  ],
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  authMode$!: Observable<AuthMode>;

  constructor(private _service: AuthService) {}

  ngOnInit() {
    this._service.fetchAuthMode();
    this.authMode$ = this._service.watchAuthMode$();
  }

  gotoLogin() {
    this._service.gotoLogin();
  }

  gotoSignup() {
    this._service.gotoSignup();
  }
}
