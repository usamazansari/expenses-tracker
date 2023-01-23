import { Clipboard } from '@angular/cdk/clipboard';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, switchMap, tap, throwError } from 'rxjs';

import { FirebaseError } from '@angular/fire/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '@expenses-tracker/auth';
import { NotificationService } from '@expenses-tracker/layout';

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
    private _firestore: AngularFirestore,
    private _authService: AuthService,
    private _notificationService: NotificationService,
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

  updateUserDetails$({ name }: { name: string | null }) {
    return this.getUser$().pipe(
      switchMap(user => {
        if (!user) {
          return throwError(() => new Error('user not found'));
        }
        const { uid } = user;
        return this._authService.getUserFromFirestore$(uid).pipe(
          switchMap(data => {
            if (!data) {
              return throwError(() => new Error('No data!'));
            }
            return data.ref.update({ displayName: name });
          })
        );
      })
    );
  }

  copyUID(uid: string | null) {
    const copyState = this._clipboard.copy(uid ?? '');
    if (copyState) {
      this._notificationService.info({
        title: 'Success!',
        description: 'UID copied to the clipboard'
      });
    } else {
      this._notificationService.info({
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
