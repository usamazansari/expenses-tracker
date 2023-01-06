import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject, debounceTime } from 'rxjs';

import { LoginGraphicComponent } from '@expenses-tracker/shared/assets';

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
export class LoginComponent implements OnInit {
  #formErrors$ = new BehaviorSubject<string[]>([]);
  formGroup!: FormGroup<LoginForm>;
  formErrors: string[] = [];

  constructor(private _fb: FormBuilder) {}

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
      this.checkErrors();
    });

    this.#formErrors$.subscribe(e => {
      this.formErrors = [...e];
    });
  }

  login() {
    if (this.formGroup.valid) {
      console.log('Logging in with', this.formGroup.value);
    } else {
      this.checkErrors();
    }
  }

  private checkErrors() {
    this.#formErrors$.next([]);
    if (this.formGroup.invalid) {
      for (const controlName in this.formGroup.controls) {
        const control = this.formGroup.get(controlName);
        for (const error in control?.errors) {
          this.#formErrors$.next([
            ...this.formErrors,
            `Error in field ${controlName} - ${error}`
          ]);
        }
      }
    }
  }
}
