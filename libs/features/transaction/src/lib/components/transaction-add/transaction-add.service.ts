import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, distinctUntilChanged, of, switchMap, tap } from 'rxjs';

import { ContextService, FirestoreService } from '@expenses-tracker/core';
import { NotificationService, RoutePaths } from '@expenses-tracker/shared/common';
import { IFlag, INITIAL_FLAGS, ITransaction } from '@expenses-tracker/shared/interfaces';

export type ComponentFlags = {
  addTransaction: IFlag;
};

@Injectable({
  providedIn: 'root'
})
export class TransactionAddService {
  #flags$ = new BehaviorSubject<ComponentFlags>({ addTransaction: INITIAL_FLAGS });
  #flags: ComponentFlags = { addTransaction: INITIAL_FLAGS };

  #context = inject(ContextService);
  #firestore = inject(FirestoreService);
  #notification = inject(NotificationService);
  #router = inject(Router);

  #setFlags(flags: ComponentFlags) {
    this.#flags = flags;
    this.#flags$.next(this.#flags);
  }

  resetFlags() {
    this.#setFlags({ addTransaction: INITIAL_FLAGS });
  }

  watchFlags$() {
    return this.#flags$.asObservable();
  }

  addTransaction$(transaction: ITransaction) {
    this.resetFlags();
    this.#setFlags({
      ...this.#flags,
      addTransaction: {
        ...this.#flags.addTransaction,
        loading: true
      }
    });

    // return this.#firestore.createTransaction$(transaction).pipe(
    //   switchMap(response =>
    //     this.#context.watchPocketbook$().pipe(
    //       distinctUntilChanged(previous => !(previous?.transactionList ?? []).includes(transaction.id)),
    //       switchMap(pocketbook =>
    //         this.#firestore.updatePocketbook$({
    //           ...pocketbook,
    //           transactionList: [...(pocketbook?.transactionList ?? []), response?.id ?? ''],
    //           balance: this.#context.addTransactionCalculateBalance(transaction)
    //         })
    //       )
    //     )
    //   ),
    //   tap(() => {
    //     this.#notification.success({
    //       title: 'Transaction added',
    //       description: 'The transaction has been added successfully'
    //     });
    //     this.resetFlags();
    //     this.#router.navigate([
    //       RoutePaths.Pocketbook,
    //       this.#context.getPocketbook()?.id,
    //       RoutePaths.Transaction,
    //       RoutePaths.EntityList
    //     ]);
    //   }),
    //   catchError(error => {
    //     this.#notification.error({
    //       description: `${error}.`,
    //       title: 'Error adding transaction'
    //     });
    //     this.#setFlags({
    //       ...this.#flags,
    //       addTransaction: {
    //         ...this.#flags.addTransaction,
    //         loading: false,
    //         fail: true,
    //         visible: true
    //       }
    //     });
    //     return of(error);
    //   })
    // );
  }

  cancelAddTransaction() {
    this.#router.navigate([
      RoutePaths.Pocketbook,
      // this.#context.getPocketbook()?.id,
      RoutePaths.Transaction,
      RoutePaths.EntityList
    ]);
  }
}
