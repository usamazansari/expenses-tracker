import { CommonModule } from '@angular/common';
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
    MatIconModule
  ],
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup<SignupForm>;
  errors$!: Observable<string[]>;
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

    this.formGroup.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      this._service.updateErrors(this.formGroup);
    });

    this.errors$ = this._service.getErrors$();
  }

  signup() {
    if (this.formGroup.valid) {
      const { email, password } = this.formGroup.value;
      this.signup$ = this._service.signup$({ email, password }).subscribe();
    } else {
      this._service.updateErrors(this.formGroup);
    }
  }

  clearErrors() {
    this._service.clearErrors();
  }

  ngOnDestroy() {
    this.signup$?.unsubscribe();
  }
}
