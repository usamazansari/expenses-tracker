import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

import { AuthService } from './auth.service';

@Component({
  selector: 'expenses-tracker-auth',
  standalone: true,
  imports: [CommonModule, RouterModule, LoginComponent, SignupComponent],
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  #service = inject(AuthService);
  authMode = computed(() => this.#service.authMode());

  ngOnInit() {
    this.#service.fetchAuthMode();
  }

  gotoLogin() {
    this.#service.gotoLogin();
  }

  gotoSignup() {
    this.#service.gotoSignup();
  }
}
