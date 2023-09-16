import { Injectable, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, switchMap, tap, throwError } from 'rxjs';

import { formatDate } from '@angular/common';
import { ContextService, FirestoreService } from '@expenses-tracker/core';
import { RoutePaths } from '@expenses-tracker/shared/common';
import { IFlag, INITIAL_FLAGS, ITransaction, TransactionListViewTypes } from '@expenses-tracker/shared/interfaces';

export type ComponentFlags = {
  transactionList: IFlag;
};

@Injectable({
  providedIn: 'root'
})
export class TransactionListService {
  #firestore = inject(FirestoreService);
  #router = inject(Router);
  #route = inject(ActivatedRoute);
  #context = inject(ContextService);

  user = computed(() => this.#context.user());
  pocketbook = computed(() => this.#context.pocketbook());
  transactionList = signal<ITransaction<Date>[]>([]);
  transactionListViewMode = computed(() => this.#context.transactionListViewMode());
  transactionListView = computed(() => this.#context.transactionListView());

  flags = signal<ComponentFlags>({
    transactionList: { ...INITIAL_FLAGS }
  });

  #fetchTransactionListForDay$(date: Date) {
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
        return throwError(() => new Error(error));
      })
    );
  }

  fetchTransactionListForDay$(date: Date) {
    this.flags.update(value => ({
      ...value,
      transactionList: { ...value.transactionList, loading: true, success: false, fail: false }
    }));
    return !this.pocketbook()
      ? this.#context.fetchPocketbook$().pipe(switchMap(() => this.#fetchTransactionListForDay$(date)))
      : this.#fetchTransactionListForDay$(date);
  }

  #fetchTransactionListForWeek$(date: Date) {
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
        return throwError(() => new Error(error));
      })
    );
  }

  fetchTransactionListForWeek$(date: Date) {
    this.flags.update(value => ({
      ...value,
      transactionList: { ...value.transactionList, loading: true, success: false, fail: false }
    }));
    return !this.pocketbook()
      ? this.#context.fetchPocketbook$().pipe(switchMap(() => this.#fetchTransactionListForWeek$(date)))
      : this.#fetchTransactionListForWeek$(date);
  }

  #fetchTransactionListForMonth$(date: Date) {
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
        return throwError(() => new Error(error));
      })
    );
  }

  fetchTransactionListForMonth$(date: Date) {
    this.flags.update(value => ({
      ...value,
      transactionList: { ...value.transactionList, loading: true, success: false, fail: false }
    }));
    return !this.pocketbook()
      ? this.#context.fetchPocketbook$().pipe(switchMap(() => this.#fetchTransactionListForMonth$(date)))
      : this.#fetchTransactionListForMonth$(date);
  }

  gotoView(view: Date) {
    this.#context.setTransactionListView(view);
    this.#router.navigate(
      [
        RoutePaths.Pocketbook,
        this.pocketbook()?.id,
        RoutePaths.Transaction,
        RoutePaths.EntityList,
        formatDate(view, 'yyyy-MM-dd', 'en-US')
      ],
      {
        queryParams: { viewMode: this.transactionListViewMode() }
      }
    );
  }

  gotoViewMode(transactionListViewMode: TransactionListViewTypes) {
    this.#context.setTransactionListViewMode(transactionListViewMode);
    this.#router.navigate([], { relativeTo: this.#route, queryParams: { viewMode: transactionListViewMode } });
  }

  gotoAddTransaction() {
    this.#router.navigate([RoutePaths.Pocketbook, this.pocketbook()?.id, RoutePaths.Transaction, RoutePaths.EntityAdd]);
  }
}
