import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

import { ITransaction } from '@expenses-tracker/shared/interfaces';
import { ContextService, FirestoreService } from '@expenses-tracker/core';
import { catchError, distinctUntilChanged, switchMap, tap, throwError } from 'rxjs';
import { NotificationService } from '@expenses-tracker/shared/common';

@Injectable({
  providedIn: 'root'
})
export class TransactionListItemService {
  #context = inject(ContextService);
  #router = inject(Router);
  #firestore = inject(FirestoreService);
  #notification = inject(NotificationService);

  gotoEditTransaction(transaction: ITransaction) {
    this.#context.setTransaction(transaction);
    this.#router.navigate([
      'pocketbook',
      this.#context.getPocketbook()?.id,
      'transaction',
      this.#context.getTransaction()?.id,
      'edit'
    ]);
  }

  deleteTransaction$(transaction: ITransaction) {
    return this.#firestore.deleteTransaction$(transaction?.id ?? '').pipe(
      switchMap(() =>
        this.#context.watchPocketbook$().pipe(
          distinctUntilChanged(previous =>
            (previous?.transactionList ?? []).includes(transaction?.id ?? '')
          ),
          switchMap(pocketbook =>
            this.#firestore.updatePocketbook$({
              ...pocketbook,
              transactionList: pocketbook?.transactionList.filter(t => t !== transaction?.id),
              balance: this.#context.deleteTransactionCalculateBalance(transaction)
            })
          )
        )
      ),
      tap(() => {
        this.#notification.success({
          title: 'Deleted Successfully',
          description: 'Transaction successfully deleted'
        });
        this.#context.setTransaction(null);
        this.#router.navigate([
          'pocketbook',
          this.#context.getPocketbook()?.id,
          'transaction',
          'list'
        ]);
      }),
      catchError(error => {
        this.#notification.error({
          title: 'Delete Failed',
          description: 'Unable to delete the transaction'
        });
        return throwError(() => new Error(error));
      })
    );
  }
}
