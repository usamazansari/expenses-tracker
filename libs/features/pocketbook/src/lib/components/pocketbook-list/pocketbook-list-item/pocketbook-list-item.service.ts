import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { catchError, combineLatest, tap, throwError } from 'rxjs';

import { ContextService, FirestoreService } from '@expenses-tracker/core';
import { NotificationService, RoutePaths } from '@expenses-tracker/shared/common';
import { IFlag, INITIAL_FLAGS, IPocketbook } from '@expenses-tracker/shared/interfaces';

export type ComponentFlags = {
  contributorsFetch: IFlag;
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
    contributorsFetch: INITIAL_FLAGS,
    deletePocketbook: INITIAL_FLAGS
  });

  #watchPocketbookOwner$(owner: string) {
    return this.#firestore.watchPocketbookOwner$(owner);
  }

  #watchPocketbookCollaboratorList$(collaboratorList: string[]) {
    return this.#firestore.watchPocketbookCollaboratorList$(collaboratorList);
  }

  resetPocketbookContributors() {
    this.owner.set(null);
    this.collaboratorList.set([]);
  }

  resetFlags() {
    this.flags.set({
      contributorsFetch: INITIAL_FLAGS,
      deletePocketbook: INITIAL_FLAGS
    });
  }

  watchContributors$({ owner, collaboratorList }: IPocketbook) {
    this.flags.update(value => ({ ...value, contributorsFetch: { ...value.contributorsFetch, loading: true } }));
    return combineLatest([
      this.#watchPocketbookOwner$(owner),
      this.#watchPocketbookCollaboratorList$(collaboratorList)
    ]).pipe(
      tap(([o, cList]) => {
        this.flags.update(value => ({
          ...value,
          contributorsFetch: { ...value.contributorsFetch, loading: false, success: true, fail: false }
        }));
        this.owner.set(o as User);
        this.collaboratorList.set(cList as User[]);
      }),
      catchError(error => {
        console.error({ error });
        this.flags.update(value => ({
          ...value,
          contributorsFetch: { ...value.contributorsFetch, loading: false, success: false, fail: true }
        }));
        return throwError(() => new Error(error));
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
