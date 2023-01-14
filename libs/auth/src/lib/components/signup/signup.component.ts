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
import { Subscription } from 'rxjs';

import { RegisterGraphicComponent } from '@expenses-tracker/shared/assets';

import { SignupService } from './signup.service';

type SignupForm = {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
};

@Component({
  selector: 'expenses-tracker-signup',
  standalone: true,
  imports: [
    CommonModule,
    RegisterGraphicComponent,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule
  ],
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup<SignupForm>;
  signup$!: Subscription;

  constructor(private _fb: FormBuilder, private _service: SignupService) {}

  ngOnInit() {
    this.formGroup = this._fb.group<SignupForm>({
      email: this._fb.control<string>('', {
        validators: [Validators.required, Validators.email]
      }),
      password: this._fb.control<string>('', {
        validators: [Validators.required]
      })
    });
  }

  signup() {
    if (this.formGroup.valid) {
      const { email, password } = this.formGroup.value;
      this.signup$ = this._service.signup$({ email, password }).subscribe();
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
    this.signup$?.unsubscribe();
  }
}
