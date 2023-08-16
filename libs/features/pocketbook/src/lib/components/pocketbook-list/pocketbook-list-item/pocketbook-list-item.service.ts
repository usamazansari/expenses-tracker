import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { catchError, of, tap, throwError } from 'rxjs';

import { ContextService, FirestoreService } from '@expenses-tracker/core';
import { NotificationService, RoutePaths } from '@expenses-tracker/shared/common';
import { IFlag, INITIAL_FLAGS, IPocketbook } from '@expenses-tracker/shared/interfaces';

export type ComponentFlags = {
  owner: IFlag;
  collaboratorList: IFlag;
  deletePocketbook: IFlag;
};

@Injectable({
  providedIn: 'root'
})
export class PocketbookListItemService {
  #router = inject(Router);
  #firestore = inject(FirestoreService);
  #context = inject(ContextService);
  #notification = inject(NotificationService);
  owner = signal<User | null>(null);
  collaboratorList = signal<User[]>([]);
  flags = signal<ComponentFlags>({
    owner: INITIAL_FLAGS,
    collaboratorList: INITIAL_FLAGS,
    deletePocketbook: INITIAL_FLAGS
  });

  watchPocketbookOwner$(owner: string) {
    this.flags.update(value => ({ ...value, owner: { ...value.owner, loading: true } }));
    return this.#firestore.watchPocketbookOwner$(owner).pipe(
      tap(owner => {
        this.flags.update(value => ({
          ...value,
          owner: { ...value.owner, loading: false, success: true, fail: false }
        }));
        this.owner.set(owner as User);
      }),
      catchError(error => {
        console.error({ error });
        this.flags.update(value => ({
          ...value,
          owner: { ...value.owner, loading: false, success: false, fail: true }
        }));
        return of(null);
      })
    );
  }

  watchPocketbookCollaboratorList$(collaboratorList: string[]) {
    this.flags.update(value => ({ ...value, collaboratorList: { ...value.collaboratorList, loading: true } }));
    return this.#firestore.watchPocketbookCollaboratorList$(collaboratorList).pipe(
      tap(collaboratorList => {
        this.flags.update(value => ({
          ...value,
          collaboratorList: { ...value.collaboratorList, loading: false, success: true, fail: false }
        }));
        this.collaboratorList.set(collaboratorList as User[]);
      }),
      catchError(error => {
        console.error({ error });
        this.flags.update(value => ({
          ...value,
          collaboratorList: { ...value.collaboratorList, loading: false, success: false, fail: true }
        }));
        return of([]);
      })
    );
  }

  gotoEditPocketbook(pocketbook: IPocketbook) {
    this.#context.setPocketbook(pocketbook);
    this.#router.navigate([RoutePaths.Pocketbook, pocketbook.id, RoutePaths.EntityEdit]);
  }

  gotoPocketbook(id: string) {
    this.#router.navigate([RoutePaths.Pocketbook, id]);
  }

  deletePocketbook$(pocketbookId: string) {
    return this.#firestore.deletePocketbook$(pocketbookId).pipe(
      tap(() => {
        this.#notification.success({
          title: 'Deleted Successfully',
          description: 'Pocketbook successfully deleted'
        });
        this.#context.setPocketbook(null);
      }),
      catchError(e => {
        this.#notification.error({
          title: 'Delete Failed',
          description: 'Unable to delete the pocketbook'
        });
        return throwError(() => new Error(e));
      })
    );
  }
}
