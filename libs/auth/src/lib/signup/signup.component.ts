import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject, debounceTime } from 'rxjs';

import { RegisterGraphicComponent } from '@expenses-tracker/shared/assets';

type SignupForm = {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
};

@Component({
  selector: 'expenses-tracker-signup',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    RegisterGraphicComponent,
    ReactiveFormsModule,
    MatIconModule
  ],
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  #formErrors$ = new BehaviorSubject<string[]>([]);
  formGroup!: FormGroup<SignupForm>;
  formErrors: string[] = [];

  constructor(private _fb: FormBuilder) {}

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
      this.checkErrors();
    });

    this.#formErrors$.subscribe(e => {
      this.formErrors = [...e];
    });
  }

  signup() {
    if (this.formGroup.valid) {
      console.log('Registering with', this.formGroup.value);
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
