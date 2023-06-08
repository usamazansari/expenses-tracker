import { Clipboard } from '@angular/cdk/clipboard';
import { Injectable, inject } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { BehaviorSubject, catchError, of, tap, throwError } from 'rxjs';

import { AuthService, ContextService } from '@expenses-tracker/core';
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

  #auth = inject(AuthService);
  #context = inject(ContextService);
  #notification = inject(NotificationService);
  #router = inject(Router);
  #clipboard = inject(Clipboard);

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
    return this.#context.watchUser$().pipe(
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
    return this.#auth.logout$().pipe(
      tap(() => {
        this.#notification.info({
          title: 'Logout Successful',
          description: 'User has been logged out successfully'
        });
        this.#resetFlags();
        this.#router.navigate(['auth', 'login']);
      }),
      catchError(error => {
        this.#notification.error({
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
        return of(error);
      })
    );
  }

  updateUserInfo$(user: User) {
    return this.#auth.updateUserInfo$(user);
  }

  copyUID(uid: string | null) {
    const copyState = this.#clipboard.copy(uid ?? '');
    if (copyState) {
      this.#notification.info({
        title: 'Success!',
        description: 'UID copied to the clipboard'
      });
    } else {
      this.#notification.info({
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
