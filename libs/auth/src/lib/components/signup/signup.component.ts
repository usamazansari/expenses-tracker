import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject, debounceTime, from, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { FirebaseError } from '@angular/fire/app';
import { RegisterGraphicComponent } from '@expenses-tracker/shared/assets';

import { AuthService } from '../../services';

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
export class SignupComponent implements OnInit {
  #formErrors$ = new BehaviorSubject<string[]>([]);
  formGroup!: FormGroup<SignupForm>;
  formErrors: string[] = [];
  errorMap = new Map<string, string>([
    ['email-required', 'Email is required'],
    ['email-email', 'Email is invalid'],
    ['password-required', 'Password is required'],
    ['auth/email-already-in-use', 'Email is already in use'],
    ['auth/weak-password', 'Password is too weak']
  ]);

  constructor(
    private _fb: FormBuilder,
    private _afAuth: AngularFireAuth,
    private _auth: AuthService
  ) {}

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
      const { email, password } = this.formGroup.value;
      from(
        this._afAuth.createUserWithEmailAndPassword(email ?? '', password ?? '')
      )
        .pipe(
          catchError(({ code }: FirebaseError) =>
            throwError(() => new Error(code))
          )
        )
        .subscribe({
          error: ({ message }: Error) => {
            this.#formErrors$.next([this.errorMap.get(message) ?? '']);
          }
        });
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
            this.errorMap.get(`${controlName}-${error}`) ?? ''
          ]);
        }
      }
    }
  }

  clearErrors() {
    this.#formErrors$.next([]);
  }
}
