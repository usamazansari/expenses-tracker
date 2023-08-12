import { Clipboard } from '@angular/cdk/clipboard';
import { Injectable, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';

import { AuthService, ContextService, FirestoreService } from '@expenses-tracker/core';
import { NotificationService, RoutePaths } from '@expenses-tracker/shared/common';
import { IFlag } from '@expenses-tracker/shared/interfaces';

export type ComponentFlags = {
  logout: IFlag;
  ownedPocketbookListCount: IFlag;
  collaboratedPocketbookListCount: IFlag;
};

@Injectable({
  providedIn: 'root'
})
export class ProfileViewService {
  #auth = inject(AuthService);
  #clipboard = inject(Clipboard);
  #context = inject(ContextService);
  #firestore = inject(FirestoreService);
  #notification = inject(NotificationService);
  #router = inject(Router);
  user = computed(() => this.#context.user());

  watchOwnedPocketbookListCount$() {
    return this.#firestore.watchOwnedPocketbookListCount$();
  }

  watchCollaboratedPocketbookListCount$() {
    return this.#firestore.watchCollaboratedPocketbookListCount$();
  }

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
          title: 'Logout failed'
        });
        return of(error);
      })
    );
  }

  copyEmail(email = '') {
    const copyState = !email ? false : this.#clipboard.copy(email);
    if (copyState) {
      this.#notification.info({
        title: 'Success!',
        description: 'Email copied to the clipboard'
      });
    } else {
      this.#notification.info({
        title: 'Fail!',
        description: 'Email cannot be copied to the clipboard'
      });
    }
  }

  gotoEditProfile() {
    this.#router.navigate([RoutePaths.Profile, RoutePaths.EntityEdit]);
  }

  gotoOwnedPocketbookList() {
    this.#router.navigate([RoutePaths.Pocketbook, RoutePaths.EntityList, RoutePaths.PocketbookOwner]);
  }

  gotoCollaboratedPocketbookList() {
    this.#router.navigate([RoutePaths.Pocketbook, RoutePaths.EntityList, RoutePaths.PocketbookCollaborator]);
  }
}
