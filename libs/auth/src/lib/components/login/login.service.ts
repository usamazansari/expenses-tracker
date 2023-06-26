import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';

import { AuthService } from '@expenses-tracker/core';
import { NotificationService, RoutePaths } from '@expenses-tracker/shared/common';
import { IFlag, INITIAL_FLAGS } from '@expenses-tracker/shared/interfaces';

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

  #router = inject(Router);
  #auth = inject(AuthService);
  #notification = inject(NotificationService);

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

    return this.#auth.login$({ email, password }).pipe(
      tap(({ user }) => {
        this.#notification.success({
          description: `Logged in as ${user?.displayName ?? user?.email}`,
          title: 'Login successful!'
        });
        this.#resetFlags();
        this.#router.navigate([RoutePaths.Profile]);
      }),
      catchError(error => {
        this.#notification.error({
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
        return of(error);
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
