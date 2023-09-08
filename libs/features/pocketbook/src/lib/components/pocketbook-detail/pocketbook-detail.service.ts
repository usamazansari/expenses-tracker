import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { catchError, map, of, switchMap, tap, throwError } from 'rxjs';

import { ContextService, FirestoreService } from '@expenses-tracker/core';
import { RoutePaths } from '@expenses-tracker/shared/common';
import { IFlag, INITIAL_FLAGS, IPocketbook } from '@expenses-tracker/shared/interfaces';

export type ComponentFlags = {
  contributorsFetch: IFlag;
  pocketbookFetch: IFlag;
  recalculateBalance: IFlag;
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
    pocketbookFetch: INITIAL_FLAGS,
    recalculateBalance: { ...INITIAL_FLAGS, success: true }
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
      pocketbookFetch: INITIAL_FLAGS,
      recalculateBalance: { ...INITIAL_FLAGS, success: true }
    });
  }

  recalculateBalance() {
    if (!this.pocketbook()) return of(0);
    this.resetFlags();
    this.flags.update(value => ({
      ...value,
      recalculateBalance: { ...value.recalculateBalance, loading: true, success: false, fail: false }
    }));
    return this.#firestore.watchTransactionList$().pipe(
      map(transactionList =>
        transactionList.reduce(
          (acc, transaction) =>
            transaction.transactionType === 'expense' ? acc - transaction.amount : acc + transaction.amount,
          0
        )
      ),
      switchMap(balance =>
        this.#firestore.updatePocketbook$({ balance }).pipe(
          map(pocketbook => (pocketbook as IPocketbook).balance),
          tap(() => {
            this.flags.update(value => ({
              ...value,
              recalculateBalance: { ...value.recalculateBalance, loading: false, success: true, fail: false }
            }));
          }),
          catchError(error => {
            console.error({ error });
            this.flags.update(value => ({
              ...value,
              recalculateBalance: { ...value.recalculateBalance, loading: false, success: false, fail: true }
            }));
            return throwError(() => new Error(error));
          })
        )
      )
    );
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
