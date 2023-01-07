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
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  from,
  throwError
} from 'rxjs';

import { LoginGraphicComponent } from '@expenses-tracker/shared/assets';
import { FirebaseError } from '@angular/fire/app';

import { AuthService } from '../../services';

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
  errorMap = new Map<string, string>([
    ['email-required', 'Email is required'],
    ['email-email', 'Email is invalid'],
    ['password-required', 'Password is required'],
    ['auth/user-not-found', 'User with email not found'],
    ['auth/wrong-password', 'Incorrect / non-existent password']
  ]);

  constructor(
    private _fb: FormBuilder,
    private _afAuth: AngularFireAuth,
    private _service: AuthService
  ) {}

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
      const { email, password } = this.formGroup.value;
      from(this._afAuth.signInWithEmailAndPassword(email ?? '', password ?? ''))
        .pipe(
          catchError(({ code }: FirebaseError) =>
            throwError(() => new Error(code))
          )
        )
        .subscribe({
          next: ({ user }) => {
            this._service.isLoggedIn$.next(true);
            this._service.setUser(user);
          },
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
