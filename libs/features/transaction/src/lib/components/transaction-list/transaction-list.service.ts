import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { ContextService, FirestoreService } from '@expenses-tracker/core';
import { RoutePaths } from '@expenses-tracker/shared/common';
import { IFlag, INITIAL_FLAGS, ITransaction } from '@expenses-tracker/shared/interfaces';
import { catchError, of, tap } from 'rxjs';

export type TransactionListViewTypes = 'monthly' | 'daily' | 'weekly';

export type DatePipeArgs = 'MMMM YYYY' | 'ww' | 'longDate';

export type TransactionListSummary = {
  income: number;
  expense: number;
  cashIncome: number;
  cashExpense: number;
  cardIncome: number;
  cardExpense: number;
};

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

  /**
   * @deprecated Use monthly fetch API instead
   */
  fetchTransactionList$() {
    this.flags.update(value => ({
      ...value,
      transactionList: { ...value.transactionList, loading: true, success: false, fail: false }
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
        console.error({ error });
        this.flags.update(value => ({
          ...value,
          transactionList: { ...value.transactionList, loading: false, success: false, fail: true }
        }));
        return of([] as ITransaction<Date>[]);
      })
    );
  }

  fetchTransactionListForDay$(date: Date) {
    this.flags.update(value => ({
      ...value,
      transactionList: { ...value.transactionList, loading: true, success: false, fail: false }
    }));
    return this.#firestore.watchTransactionListForDay$(date).pipe(
      tap(transactionList => {
        this.transactionList.set(transactionList);
        this.flags.update(value => ({
          ...value,
          transactionList: { ...value.transactionList, loading: false, success: true, fail: false }
        }));
      }),
      catchError(error => {
        console.error({ error });
        this.flags.update(value => ({
          ...value,
          transactionList: { ...value.transactionList, loading: false, success: false, fail: true }
        }));
        return of([] as ITransaction<Date>[]);
      })
    );
  }

  fetchTransactionListForWeek$(date: Date) {
    this.flags.update(value => ({
      ...value,
      transactionList: { ...value.transactionList, loading: true, success: false, fail: false }
    }));
    return this.#firestore.watchTransactionListForWeek$(date).pipe(
      tap(transactionList => {
        this.transactionList.set(transactionList);
        this.flags.update(value => ({
          ...value,
          transactionList: { ...value.transactionList, loading: false, success: true, fail: false }
        }));
      }),
      catchError(error => {
        console.error({ error });
        this.flags.update(value => ({
          ...value,
          transactionList: { ...value.transactionList, loading: false, success: false, fail: true }
        }));
        return of([] as ITransaction<Date>[]);
      })
    );
  }

  fetchTransactionListForMonth$(date: Date) {
    this.flags.update(value => ({
      ...value,
      transactionList: { ...value.transactionList, loading: true, success: false, fail: false }
    }));
    return this.#firestore.watchTransactionListForMonth$(date).pipe(
      tap(transactionList => {
        this.transactionList.set(transactionList);
        this.flags.update(value => ({
          ...value,
          transactionList: { ...value.transactionList, loading: false, success: true, fail: false }
        }));
      }),
      catchError(error => {
        console.error({ error });
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
