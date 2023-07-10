import { Clipboard } from '@angular/cdk/clipboard';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { catchError, of, tap } from 'rxjs';

import { AuthService } from '@expenses-tracker/core';
import { NotificationService, RoutePaths } from '@expenses-tracker/shared/common';
import { IFlag } from '@expenses-tracker/shared/interfaces';

export type ComponentFlags = {
  user: IFlag;
  logout: IFlag;
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  #auth = inject(AuthService);
  #notification = inject(NotificationService);
  #router = inject(Router);
  #clipboard = inject(Clipboard);

  logout$() {
    return this.#auth.logout$().pipe(
      tap(() => {
        this.#notification.info({
          title: 'Logout Successful',
          description: 'User has been logged out successfully'
        });
        this.#router.navigate([RoutePaths.Auth, RoutePaths.AuthLogin]);
      }),
      catchError(error => {
        this.#notification.error({
          description: `${error}.`,
          title: 'Login failed'
        });
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
}
