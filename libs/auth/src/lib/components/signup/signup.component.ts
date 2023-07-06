import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { ComponentFlags, SignupService } from './signup.service';

type SignupForm = {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
};

@Component({
  selector: 'expenses-tracker-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup<SignupForm>;
  flags$!: Observable<ComponentFlags>;
  #signup$!: Subscription;
  #saveUser$!: Subscription;

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
    this.flags$ = this._service.watchFlags$();
  }

  signup() {
    if (this.formGroup.valid) {
      const { email, password } = this.formGroup.value;
      this.#signup$ = this._service.signup$({ email, password }).subscribe({
        next: () => {
          this.formGroup.reset();
        }
      });
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

  dismissError() {
    this._service.dismissError();
  }

  ngOnDestroy() {
    this.#signup$?.unsubscribe();
    this.#saveUser$?.unsubscribe();
  }
}
