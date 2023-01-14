import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BehaviorSubject, Subscription } from 'rxjs';

import { LoginGraphicComponent } from '@expenses-tracker/shared/assets';

import { LoginService } from './login.service';

type LoginForm = {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
};

@Component({
  selector: 'expenses-tracker-login',
  standalone: true,
  imports: [
    CommonModule,

    LoginGraphicComponent,
    ReactiveFormsModule,
    MatRippleModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup<LoginForm>;
  error$ = new BehaviorSubject<string>('');
  login$!: Subscription;

  constructor(private _fb: FormBuilder, private _service: LoginService) {}

  ngOnInit() {
    this.formGroup = this._fb.group<LoginForm>({
      email: this._fb.control<string>('', {
        validators: [Validators.required, Validators.email]
      }),
      password: this._fb.control<string>('', {
        validators: [Validators.required]
      })
    });
  }

  login() {
    if (!this.formGroup.invalid) {
      const { email, password } = this.formGroup.value;
      this.login$ = this._service.login$({ email, password }).subscribe();
    }
  }

  getError(formControlName = '') {
    if (this.formGroup.get(formControlName)?.hasError('required')) {
      return `${
        formControlName.charAt(0).toUpperCase() + formControlName.slice(1)
      } is required`;
    }

    if (this.formGroup.get(formControlName)?.hasError('email')) {
      return 'Invalid Email';
    }

    return '';
  }

  ngOnDestroy() {
    this.login$?.unsubscribe();
  }
}
