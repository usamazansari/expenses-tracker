import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { BehaviorSubject, catchError, of, switchMap, tap, throwError } from 'rxjs';

import { AuthService, ErrorService, FirestoreService } from '@expenses-tracker/core';
import { NotificationService } from '@expenses-tracker/shared/common';
import { IFlag, INITIAL_FLAGS } from '@expenses-tracker/shared/interfaces';

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
    private _auth: AuthService,
    private _error: ErrorService,
    private _firestore: FirestoreService,
    private _router: Router,
    private _notification: NotificationService
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

    return this._auth.signup$({ email, password }).pipe(
      tap(({ user }) => {
        this._notification.success({
          description: `Registered successfully as ${user?.email}.`,
          title: 'Signup Successful!'
        });
        this.#resetFlags();
        this._router.navigate(['dashboard']);
      }),
      switchMap(({ user }) =>
        !user
          ? throwError(() => new Error(`Cannot Register user with email ${email}!`))
          : this._firestore.saveUser$(user as User)
      ),
      catchError(error => {
        this._notification.error({
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
        return of(error);
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
