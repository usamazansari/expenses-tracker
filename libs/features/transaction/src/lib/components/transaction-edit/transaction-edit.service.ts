import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';

import { ContextService, FirestoreService } from '@expenses-tracker/core';
import { NotificationService, RoutePaths } from '@expenses-tracker/shared/common';
import { IFlag, INITIAL_FLAGS, TransactionDAO } from '@expenses-tracker/shared/interfaces';

export type ComponentFlags = {
  editTransaction: IFlag;
};

@Injectable({
  providedIn: 'root'
})
export class TransactionEditService {
  flags = signal<ComponentFlags>({ editTransaction: INITIAL_FLAGS });

  #context = inject(ContextService);
  #firestore = inject(FirestoreService);
  #notification = inject(NotificationService);
  #router = inject(Router);

  pocketbook = computed(() => this.#context.pocketbook());
  transaction = computed(() => this.#context.transaction());

  editTransaction$(transaction: Partial<TransactionDAO>) {
    this.flags.set({ editTransaction: INITIAL_FLAGS });
    this.flags.update(value => ({
      ...value,
      editTransaction: {
        ...value.editTransaction,
        loading: true
      }
    }));

    const t = this.transaction();
    this.#firestore
      .updateTransaction$({ ...t, ...transaction })
      .pipe(
        switchMap(() =>
          this.#firestore.updatePocketbook$({
            ...this.pocketbook(),
            balance: this.#context.calculateBalanceOnUpdate({
              old: t as TransactionDAO,
              new: transaction as TransactionDAO
            })
          })
        ),
        catchError(error => of(error))
      )
      .subscribe({
        next: () => {
          this.#notification.success({
            title: 'Transaction edited',
            description: 'The transaction has been updated successfully'
          });
          this.flags.update(value => ({
            ...value,
            editTransaction: { ...value.editTransaction, loading: false, success: true, fail: false }
          }));
          if (transaction.transactionDate) this.#context.setTransactionListView(transaction.transactionDate);
          this.gotoTransactionList();
        },
        error: error => {
          this.#notification.error({
            description: `${error}.`,
            title: 'Error adding transaction'
          });
          this.flags.update(value => ({
            ...value,
            editTransaction: { ...value.editTransaction, loading: false, success: false, fail: true }
          }));
        }
      });
  }

  gotoTransactionList() {
    this.#router.navigate([
      RoutePaths.Pocketbook,
      this.pocketbook()?.id,
      RoutePaths.Transaction,
      RoutePaths.EntityList
    ]);
  }
}
