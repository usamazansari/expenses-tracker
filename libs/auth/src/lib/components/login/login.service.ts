import { Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { FormGroup } from '@angular/forms';
import { UserInfo } from 'firebase/auth';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

import { NotificationService } from '@expenses-tracker/layout';
import { IFlag } from '@expenses-tracker/shared/interfaces';

import { AuthService } from '../../services';

export type LoginComponentFlags = {
  login: IFlag;
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  #errors$ = new BehaviorSubject<string[]>([]);
  #errors: string[] = [];

  constructor(
    private _authService: AuthService,
    private _notificationService: NotificationService
  ) {}

  login$({
    email,
    password
  }: {
    email: string | null | undefined;
    password: string | null | undefined;
  }) {
    return this._authService.login$({ email, password }).pipe(
      tap(({ user }) => {
        this.updateState();
        this.updateUser(user);
        this._notificationService.info({
          description: `Logged in successfully as ${user?.email}`,
          title: 'Login Successful'
        });
      }),
      catchError(({ code }: FirebaseError) => {
        const error = this._authService.getError(code);
        this._notificationService.error({
          description: `${error}`,
          title: 'Login failed'
        });
        return throwError(() => new Error(code));
      })
    );
  }

  updateState() {
    this._authService.setIsLoggedIn(true);
  }

  updateUser(user: UserInfo | null) {
    this._authService.setUser(user);
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
