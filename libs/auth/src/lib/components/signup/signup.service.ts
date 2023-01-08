import { Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

import { NotificationService } from '@expenses-tracker/layout';

import { AuthService } from '../../services';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  #errors$ = new BehaviorSubject<string[]>([]);
  #errors: string[] = [];

  constructor(
    private _authService: AuthService,
    private _notificationService: NotificationService
  ) {}

  signup$({
    email,
    password
  }: {
    email: string | null | undefined;
    password: string | null | undefined;
  }) {
    return this._authService.signup$({ email, password }).pipe(
      tap(({ user }) => {
        this._notificationService.success({
          description: `Registered successfully as ${user?.email}`,
          title: 'Signup Successful'
        });
      }),
      catchError(({ code }: FirebaseError) => {
        const error = this._authService.getError(code);
        this._notificationService.error({
          description: `${error}`,
          title: 'Signup failed'
        });
        return throwError(() => new Error(code));
      })
    );
  }

  setErrors(errors: string[]) {
    this.#errors = errors;
    this.#errors$.next(errors);
  }

  getErrors$() {
    return this.#errors$.asObservable();
  }

  clearErrors() {
    this.setErrors([]);
  }

  updateErrors(formGroup: FormGroup) {
    this.setErrors([]);
    if (formGroup.invalid) {
      for (const controlName in formGroup.controls) {
        const control = formGroup.get(controlName);
        for (const error in control?.errors) {
          this.setErrors([
            ...this.#errors,
            this._authService.getError(`${controlName}-${error}`)
          ]);
        }
      }
    }
  }
}
