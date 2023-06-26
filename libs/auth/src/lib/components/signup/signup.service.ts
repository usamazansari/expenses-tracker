import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { BehaviorSubject, catchError, of, switchMap, tap } from 'rxjs';

import { AuthService, FirestoreService } from '@expenses-tracker/core';
import { NotificationService, RoutePaths } from '@expenses-tracker/shared/common';
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

  #auth = inject(AuthService);
  #firestore = inject(FirestoreService);
  #router = inject(Router);
  #notification = inject(NotificationService);

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

    return this.#auth.signup$({ email, password }).pipe(
      switchMap(({ user }) => this.#firestore.saveUser$(user as User)),
      tap(user => {
        this.#notification.success({
          description: `Registered successfully as ${user?.email}.`,
          title: 'Signup Successful!'
        });
        this.#resetFlags();
        this.#router.navigate([RoutePaths.Dashboard]);
      }),
      catchError(error => {
        this.#notification.error({
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
