import { Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { Router } from '@angular/router';
import firebase from 'firebase/compat';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

import { NotificationService } from '@expenses-tracker/layout';
import { IFlag, INITIAL_FLAGS } from '@expenses-tracker/shared/interfaces';

import { AuthService } from '../../services';

export type ComponentFlags = {
  signup: IFlag;
  saveUser: IFlag;
};

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  #flags$ = new BehaviorSubject<ComponentFlags>({
    signup: INITIAL_FLAGS,
    saveUser: INITIAL_FLAGS
  });
  #flags: ComponentFlags = { signup: INITIAL_FLAGS, saveUser: INITIAL_FLAGS };

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _notificationService: NotificationService
  ) {}

  signup$({
    email,
    password
  }: {
    email: string | null | undefined;
    password: string | null | undefined;
  }) {
    this.#flags = {
      ...this.#flags,
      signup: {
        ...this.#flags.signup,
        dirty: true,
        loading: true
      }
    };
    this.#setFlags(this.#flags);

    return this._authService.signup$({ email, password }).pipe(
      tap(({ user }) => {
        this._notificationService.success({
          description: `Registered successfully as ${user?.email}.`,
          title: 'Signup Successful!'
        });
      }),
      catchError(({ code }: FirebaseError) => {
        const error = this._authService.getError(code);
        this._notificationService.error({
          description: `${error}.`,
          title: 'Signup failed'
        });
        this.#flags = {
          ...this.#flags,
          signup: {
            ...this.#flags.signup,
            loading: false,
            fail: true,
            visible: true
          }
        };
        this.#setFlags(this.#flags);
        return throwError(() => new Error(code));
      })
    );
  }

  saveUser$(user: firebase.User) {
    this.#flags = {
      ...this.#flags,
      saveUser: {
        ...this.#flags.saveUser,
        dirty: true,
        loading: true
      }
    };
    this.#setFlags(this.#flags);
    return this._authService.saveUser$(user).pipe(
      tap(() => {
        this._notificationService.success({
          description: `User with email ${user?.email} successfully saved. Please login to continue.`,
          title: 'User Registered!'
        });
        this._router.navigate(['auth'], { queryParams: { mode: 'login' } });
      }),
      catchError(({ code }: FirebaseError) => {
        const error = this._authService.getError(code);
        this._notificationService.error({
          description: `${error}.`,
          title: `Unable to save the user with email: ${user?.email}`
        });
        this.#flags = {
          ...this.#flags,
          saveUser: {
            ...this.#flags.saveUser,
            loading: false,
            fail: true,
            visible: true
          }
        };
        this.#setFlags(this.#flags);
        return throwError(() => new Error(code));
      })
    );
  }

  #setFlags(flags: ComponentFlags) {
    this.#flags = { ...flags } ?? {
      signup: INITIAL_FLAGS,
      saveUser: INITIAL_FLAGS
    };
    this.#flags$.next(this.#flags);
  }

  #resetFlags() {
    this.#flags = { signup: INITIAL_FLAGS, saveUser: INITIAL_FLAGS };
    this.#flags$.next(this.#flags);
  }

  watchFlags$() {
    return this.#flags$.asObservable();
  }

  dismissError() {
    this.#resetFlags();
  }
}
