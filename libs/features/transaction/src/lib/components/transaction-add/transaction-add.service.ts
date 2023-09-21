import { formatDate } from '@angular/common';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';

import { ContextService, FirestoreService } from '@expenses-tracker/core';
import { NotificationService, RoutePaths } from '@expenses-tracker/shared/common';
import { IFlag, INITIAL_FLAGS, TransactionDAO, TransactionFormSaveMode } from '@expenses-tracker/shared/interfaces';

export type ComponentFlags = {
  addTransaction: IFlag;
};

@Injectable({
  providedIn: 'root'
})
export class TransactionAddService {
  #context = inject(ContextService);
  #firestore = inject(FirestoreService);
  #notification = inject(NotificationService);
  #router = inject(Router);
  pocketbook = computed(() => this.#context.pocketbook());
  transactionListView = computed(() => this.#context.transactionListView());
  transactionListViewMode = computed(() => this.#context.transactionListViewMode());
  flags = signal<ComponentFlags>({ addTransaction: INITIAL_FLAGS });

  resetFlags() {
    this.flags.set({ addTransaction: INITIAL_FLAGS });
  }

  addTransaction$({ transaction, saveMode }: { transaction: TransactionDAO; saveMode: TransactionFormSaveMode }) {
    this.resetFlags();
    this.flags.update(value => ({ ...value, addTransaction: { ...value.addTransaction, loading: true } }));

    this.#firestore
      .createTransaction$(transaction)
      .pipe(
        switchMap(response =>
          this.#firestore.updatePocketbook$({
            ...this.pocketbook(),
            transactionList: [...(this.pocketbook()?.transactionList ?? []), response?.id ?? ''],
            balance: this.#context.calculateBalanceOnAdd(transaction)
          })
        ),
        catchError(error => throwError(() => new Error(error)))
      )
      .subscribe({
        next: () => {
          this.#notification.success({
            title: 'Transaction added',
            description: 'The transaction has been added successfully'
          });
          this.flags.update(value => ({
            ...value,
            addTransaction: { ...value.addTransaction, loading: false, success: true, fail: false }
          }));
          this.#context.setTransactionListView(transaction.transactionDate);
          if (saveMode !== 'add-another') this.gotoTransactionList();
        },
        error: error => {
          this.#notification.error({
            description: `${error}.`,
            title: 'Error adding transaction'
          });
          this.flags.update(value => ({
            ...value,
            addTransaction: { ...value.addTransaction, loading: false, success: false, fail: true }
          }));
        }
      });
  }

  gotoTransactionList() {
    this.#router.navigate(
      [
        RoutePaths.Pocketbook,
        this.pocketbook()?.id,
        RoutePaths.Transaction,
        RoutePaths.EntityList,
        formatDate(this.transactionListView() ?? new Date(), 'yyyy-MM-dd', 'en-US')
      ],
      {
        queryParams: {
          viewMode: this.transactionListViewMode() ?? 'monthly'
        }
      }
    );
  }

  getState() {
    return (this.#router.lastSuccessfulNavigation?.extras?.state as { transactionDate: Date })?.transactionDate;
  }
}
