import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';

import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

import { AuthMode, AuthService } from './auth.service';

@Component({
  selector: 'expenses-tracker-auth',
  standalone: true,
  imports: [
    CommonModule,
    LoginComponent,
    MatIconModule,
    MatRippleModule,
    SignupComponent
  ],
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  mode$!: Observable<AuthMode>;

  constructor(private _service: AuthService) {}

  ngOnInit() {
    this.mode$ = this._service.getMode$();
  }

  gotoLogin() {
    this._service.gotoLogin();
  }

  gotoSignup() {
    this._service.gotoSignup();
  }
}
