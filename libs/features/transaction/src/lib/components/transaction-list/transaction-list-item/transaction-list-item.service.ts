import { Injectable, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';

import { ContextService, FirestoreService } from '@expenses-tracker/core';
import { NotificationService, RoutePaths } from '@expenses-tracker/shared/common';
import { ITransaction, TransactionDAO } from '@expenses-tracker/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TransactionListItemService {
  #context = inject(ContextService);
  #router = inject(Router);
  #firestore = inject(FirestoreService);
  #notification = inject(NotificationService);
  pocketbook = computed(() => this.#context.pocketbook());

  gotoTransactionList() {
    this.#router.navigate([
      RoutePaths.Pocketbook,
      this.pocketbook()?.id,
      RoutePaths.Transaction,
      RoutePaths.EntityList
    ]);
  }

  gotoEditTransaction(transaction: ITransaction) {
    this.#context.setTransaction(transaction);
    this.#router.navigate([
      RoutePaths.Pocketbook,
      this.pocketbook()?.id,
      RoutePaths.Transaction,
      this.#context.transaction()?.id,
      RoutePaths.EntityEdit
    ]);
  }

  deleteTransaction$(transaction: ITransaction) {
    const pb = this.pocketbook();
    this.#firestore
      .deleteTransaction$(transaction?.id)
      .pipe(
        switchMap(() =>
          this.#firestore.updatePocketbook$({
            ...pb,
            transactionList: (pb?.transactionList ?? []).filter(t => t !== transaction?.id),
            balance: this.#context.calculateBalanceOnDelete(transaction as TransactionDAO)
          })
        ),
        catchError(error => throwError(() => new Error(error)))
      )
      .subscribe({
        next: () => {
          this.#notification.success({
            title: 'Deleted Successfully',
            description: 'Transaction successfully deleted'
          });
          this.gotoTransactionList();
        },
        error: () => {
          this.#notification.error({
            title: 'Delete Failed',
            description: 'Unable to delete the transaction'
          });
        }
      });
  }
}
