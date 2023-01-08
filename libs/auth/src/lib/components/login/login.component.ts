import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime, Observable, Subscription } from 'rxjs';

import { LoginGraphicComponent } from '@expenses-tracker/shared/assets';

import { LoginComponentFlags, LoginService } from './login.service';

type LoginForm = {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
};

@Component({
  selector: 'expenses-tracker-login',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    LoginGraphicComponent,
    ReactiveFormsModule,
    MatIconModule
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup<LoginForm>;
  errors$!: Observable<string[]>;
  flags$!: Observable<LoginComponentFlags>;
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

    this.formGroup.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      this._service.updateErrors(this.formGroup);
    });

    this.errors$ = this._service.getErrors$();
  }

  login() {
    if (this.formGroup.valid) {
      const { email, password } = this.formGroup.value;
      this.login$ = this._service.login$({ email, password }).subscribe();
    } else {
      this._service.updateErrors(this.formGroup);
    }
  }

  clearErrors() {
    this._service.clearErrors();
  }

  ngOnDestroy() {
    this.login$.unsubscribe();
  }
}
