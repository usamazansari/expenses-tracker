import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { ContextService, FirestoreService } from '@expenses-tracker/core';
import { RoutePaths } from '@expenses-tracker/shared/common';
import { IFlag, INITIAL_FLAGS, ITransaction } from '@expenses-tracker/shared/interfaces';
import { catchError, of, tap } from 'rxjs';

export type TransactionListViewTypes = 'monthly' | 'daily' | 'weekly';

export type ComponentFlags = {
  transactionList: IFlag;
};

@Injectable({
  providedIn: 'root'
})
export class TransactionListService {
  #firestore = inject(FirestoreService);
  #router = inject(Router);
  #context = inject(ContextService);

  user = computed(() => this.#context.user());
  pocketbook = computed(() => this.#context.pocketbook());
  transactionList = signal<ITransaction<Date>[]>([]);

  flags = signal<ComponentFlags>({
    transactionList: { ...INITIAL_FLAGS }
  });

  fetchTransactionList$() {
    this.flags.update(value => ({
      ...value,
      transactionList: { ...value.transactionList, loading: true }
    }));
    return this.#firestore.watchTransactionList$().pipe(
      tap(transactionList => {
        this.transactionList.set(transactionList);
        this.flags.update(value => ({
          ...value,
          transactionList: { ...value.transactionList, loading: false, success: true, fail: false }
        }));
      }),
      catchError(error => {
        console.log({ error });
        this.flags.update(value => ({
          ...value,
          transactionList: { ...value.transactionList, loading: false, success: false, fail: true }
        }));
        return of([] as ITransaction<Date>[]);
      })
    );
  }

  gotoAddTransaction() {
    this.#router.navigate([RoutePaths.Pocketbook, this.pocketbook()?.id, RoutePaths.Transaction, RoutePaths.EntityAdd]);
  }
}
