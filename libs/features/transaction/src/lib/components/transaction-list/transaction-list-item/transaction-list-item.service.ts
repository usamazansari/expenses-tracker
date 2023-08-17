import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, distinctUntilChanged, switchMap, tap, throwError } from 'rxjs';

import { ContextService, FirestoreService } from '@expenses-tracker/core';
import { NotificationService, RoutePaths } from '@expenses-tracker/shared/common';
import { ITransaction } from '@expenses-tracker/shared/interfaces';

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
      RoutePaths.Pocketbook,
      // this.#context.getPocketbook()?.id,
      RoutePaths.Transaction,
      this.#context.getTransaction()?.id,
      RoutePaths.EntityEdit
    ]);
  }

  deleteTransaction$(transaction: ITransaction) {
    //   return this.#firestore.deleteTransaction$(transaction?.id ?? '').pipe(
    //     switchMap(() =>
    //       this.#context.watchPocketbook$().pipe(
    //         distinctUntilChanged(previous =>
    //           (previous?.transactionList ?? []).includes(transaction?.id ?? '')
    //         ),
    //         switchMap(pocketbook =>
    //           this.#firestore.updatePocketbook$({
    //             ...pocketbook,
    //             transactionList: pocketbook?.transactionList.filter(t => t !== transaction?.id),
    //             balance: this.#context.deleteTransactionCalculateBalance(transaction)
    //           })
    //         )
    //       )
    //     ),
    //     tap(() => {
    //       this.#notification.success({
    //         title: 'Deleted Successfully',
    //         description: 'Transaction successfully deleted'
    //       });
    //       this.#context.setTransaction(null);
    //       this.#router.navigate([
    //         RoutePaths.Pocketbook,
    //         this.#context.getPocketbook()?.id,
    //         RoutePaths.Transaction,
    //         RoutePaths.EntityList
    //       ]);
    //     }),
    //     catchError(error => {
    //       this.#notification.error({
    //         title: 'Delete Failed',
    //         description: 'Unable to delete the transaction'
    //       });
    //       return throwError(() => new Error(error));
    //     })
    //   );
  }
}
