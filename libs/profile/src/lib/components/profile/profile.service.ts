import { Clipboard } from '@angular/cdk/clipboard';
import { Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

import { AuthService, ContextService, ErrorService } from '@expenses-tracker/core';
import { NotificationService } from '@expenses-tracker/shared/common';
import { IFlag, INITIAL_FLAGS } from '@expenses-tracker/shared/interfaces';

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
    private _auth: AuthService,
    private _context: ContextService,
    private _error: ErrorService,
    private _notification: NotificationService,
    private _router: Router,
    private _clipboard: Clipboard
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
    return this._context.getUser$().pipe(
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
      catchError(({ code }: FirebaseError) => {
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
        return throwError(() => new Error(code));
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
    return this._auth.logout$().pipe(
      tap(() => {
        this._notification.info({
          title: 'Logout Successful',
          description: 'User has been logged out successfully'
        });
        this.#resetFlags();
        this._router.navigate(['auth'], { queryParams: { mode: 'login' } });
      }),
      catchError(({ code }: FirebaseError) => {
        const error = this._error.getError(code);
        this._notification.error({
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

  editUserInfo$({ displayName }: { displayName: string }) {
    return this._auth.editUserInfo$({ displayName });
  }

  copyUID(uid: string | null) {
    const copyState = this._clipboard.copy(uid ?? '');
    if (copyState) {
      this._notification.info({
        title: 'Success!',
        description: 'UID copied to the clipboard'
      });
    } else {
      this._notification.info({
        title: 'Fail!',
        description: 'UID cannot be copied to the clipboard'
      });
    }
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
