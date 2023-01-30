import { Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

import { NotificationService } from '@expenses-tracker/shared/common';
import { IFlag, INITIAL_FLAGS } from '@expenses-tracker/shared/interfaces';

import { AuthService } from '../../services';

export type ComponentFlags = {
  login: IFlag;
  saveUser: IFlag;
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  #flags$ = new BehaviorSubject<ComponentFlags>({
    login: INITIAL_FLAGS,
    saveUser: INITIAL_FLAGS
  });
  #flags: ComponentFlags = { login: INITIAL_FLAGS, saveUser: INITIAL_FLAGS };

  constructor(
    private _router: Router,
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
    this.#flags = {
      ...this.#flags,
      login: {
        ...this.#flags.login,
        dirty: true,
        loading: true
      }
    };
    this.#setFlags(this.#flags);

    return this._authService.login$({ email, password }).pipe(
      tap(({ user }) => {
        this._notificationService.success({
          description: `Logged in as ${user?.displayName ?? user?.email}`,
          title: 'Login successful!'
        });
        this.#resetFlags();
        this._router.navigate(['dashboard']);
      }),
      catchError(({ code }: FirebaseError) => {
        const error = this._authService.getError(code);
        this._notificationService.error({
          description: `${error}.`,
          title: 'Login failed'
        });
        this.#flags = {
          ...this.#flags,
          login: {
            ...this.#flags.login,
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
      login: INITIAL_FLAGS,
      saveUser: INITIAL_FLAGS
    };
    this.#flags$.next(this.#flags);
  }

  #resetFlags() {
    this.#flags = { login: INITIAL_FLAGS, saveUser: INITIAL_FLAGS };
    this.#flags$.next(this.#flags);
  }

  watchFlags$() {
    return this.#flags$.asObservable();
  }

  dismissError() {
    this.#resetFlags();
  }
}
