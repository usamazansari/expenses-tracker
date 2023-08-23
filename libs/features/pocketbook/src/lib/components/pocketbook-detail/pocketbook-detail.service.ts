import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';

import { ContextService, FirestoreService } from '@expenses-tracker/core';
import { RoutePaths } from '@expenses-tracker/shared/common';
import { IFlag, INITIAL_FLAGS, IPocketbook } from '@expenses-tracker/shared/interfaces';
import { catchError, map, of, tap, throwError } from 'rxjs';

export type ComponentFlags = {
  contributorsFetch: IFlag;
  pocketbookFetch: IFlag;
};

export type ViewMode = RoutePaths.Transaction | RoutePaths.EntitySettings;

@Injectable({
  providedIn: 'root'
})
export class PocketbookDetailService {
  #context = inject(ContextService);
  #router = inject(Router);
  #firestore = inject(FirestoreService);
  pocketbook = computed(() => this.#context.pocketbook());
  collaboratorList = signal<User[]>([]);
  owner = signal<User | null>(null);
  viewMode = signal<ViewMode>(RoutePaths.Transaction);
  flags = signal<ComponentFlags>({
    contributorsFetch: INITIAL_FLAGS,
    pocketbookFetch: INITIAL_FLAGS
  });

  gotoTransactionList() {
    this.viewMode.set(RoutePaths.Transaction);
    this.#router.navigate([RoutePaths.Pocketbook, this.pocketbook()?.id, RoutePaths.Transaction]);
  }

  gotoSettings() {
    this.viewMode.set(RoutePaths.EntitySettings);
    this.#router.navigate([RoutePaths.Pocketbook, this.pocketbook()?.id, RoutePaths.EntitySettings]);
  }

  addTransaction() {
    this.#router.navigate([RoutePaths.Pocketbook, this.pocketbook()?.id, RoutePaths.Transaction, RoutePaths.EntityAdd]);
  }

  resetPocketbookContributors() {
    this.owner.set(null);
    this.collaboratorList.set([]);
  }

  resetFlags() {
    this.flags.set({
      contributorsFetch: INITIAL_FLAGS,
      pocketbookFetch: INITIAL_FLAGS
    });
  }

  watchPocketbookContributors$() {
    if (!this.#context.pocketbook()) return of({ o: null as Partial<User> | null, cList: [] as User[] });
    const { owner, collaboratorList } = this.#context.pocketbook() as IPocketbook;
    this.resetFlags();
    this.resetPocketbookContributors();
    this.flags.update(value => ({ ...value, contributorsFetch: { ...value.contributorsFetch, loading: true } }));
    return this.#firestore.watchPocketbookContributors$({ owner, collaboratorList } as IPocketbook).pipe(
      map(([o, cList]) => ({ o, cList })),
      tap(({ o, cList }) => {
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
}
