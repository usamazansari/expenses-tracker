import { Clipboard } from '@angular/cdk/clipboard';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';

import { AuthService, ContextService, FirestoreService } from '@expenses-tracker/core';
import { NotificationService, RoutePaths } from '@expenses-tracker/shared/common';
import { IFlag } from '@expenses-tracker/shared/interfaces';

export type ComponentFlags = {
  user: IFlag;
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

  watchUser$() {
    return this.#context.watchUser$();
  }

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

  gotoOwnedPocketbookList() {
    this.#router.navigate([RoutePaths.Pocketbook, RoutePaths.EntityList, RoutePaths.PocketbookOwner]);
  }

  gotoCollaboratedPocketbookList() {
    this.#router.navigate([RoutePaths.Pocketbook, RoutePaths.EntityList, RoutePaths.PocketbookCollaborator]);
  }
}
