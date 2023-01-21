import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, of, tap, throwError } from 'rxjs';

import { AuthService } from '@expenses-tracker/auth';
import { NotificationService } from '@expenses-tracker/layout';
import { IFlag, INITIAL_FLAGS } from '@expenses-tracker/shared/interfaces';
import { FirebaseError } from '@angular/fire/app';

export type ComponentFlags = {
  user: IFlag;
  logout: IFlag;
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  #flags$ = new BehaviorSubject<ComponentFlags>({
    user: INITIAL_FLAGS,
    logout: INITIAL_FLAGS
  });
  #flags: ComponentFlags = { user: INITIAL_FLAGS, logout: INITIAL_FLAGS };

  #editMode$ = new BehaviorSubject<boolean>(false);
  #editMode = false;

  constructor(
    private _authService: AuthService,
    private _notificationService: NotificationService,
    private _router: Router
  ) {}

  getUser$() {
    this.#flags = {
      ...this.#flags,
      user: {
        ...this.#flags.user,
        dirty: true,
        loading: true
      }
    };
    this.#setFlags(this.#flags);
    return this._authService.getUser$().pipe(
      tap(() => {
        this.#flags = {
          ...this.#flags,
          user: {
            ...this.#flags.user,
            success: true,
            loading: false,
            fail: false
          }
        };
        this.#setFlags(this.#flags);
      }),
      catchError(err => {
        this.#flags = {
          ...this.#flags,
          user: {
            ...this.#flags.user,
            fail: true,
            loading: false,
            success: false
          }
        };
        this.#setFlags(this.#flags);
        return of(err);
      })
    );
  }

  logout$() {
    this.#flags = {
      ...this.#flags,
      logout: {
        ...this.#flags.user,
        dirty: true,
        loading: true
      }
    };
    this.#setFlags(this.#flags);
    return this._authService.logout$().pipe(
      tap(() => {
        this._notificationService.info({
          title: 'Logout Successful',
          description: 'User has been logged out successfully'
        });
        this.#resetFlags();
        this._router.navigate(['auth'], { queryParams: { mode: 'login' } });
      }),
      catchError(({ code }: FirebaseError) => {
        const error = this._authService.getError(code);
        this._notificationService.error({
          description: `${error}.`,
          title: 'Login failed'
        });
        this.#flags = {
          ...this.#flags,
          logout: {
            ...this.#flags.logout,
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
      user: INITIAL_FLAGS,
      logout: INITIAL_FLAGS
    };
    this.#flags$.next(this.#flags);
  }

  #resetFlags() {
    this.#flags = {
      user: INITIAL_FLAGS,
      logout: INITIAL_FLAGS
    };
    this.#flags$.next(this.#flags);
  }

  watchFlags$() {
    return this.#flags$.asObservable();
  }

  #setEditMode(mode: boolean) {
    this.#editMode = mode;
    this.#editMode$.next(this.#editMode);
  }

  toggleEditMode() {
    this.#setEditMode(!this.#editMode);
  }

  watchEditMode$() {
    return this.#editMode$.asObservable();
  }
}
