import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  catchError,
  distinctUntilChanged,
  map,
  of,
  switchMap,
  tap
} from 'rxjs';

import { ContextService, FirestoreService } from '@expenses-tracker/core';
import { NotificationService, RoutePaths } from '@expenses-tracker/shared/common';
import { IFlag, INITIAL_FLAGS, ITransaction } from '@expenses-tracker/shared/interfaces';

import { TransactionFormFields } from '../../types';

export type ComponentFlags = {
  editTransaction: IFlag;
};

@Injectable({
  providedIn: 'root'
})
export class TransactionEditService {
  #flags$ = new BehaviorSubject<ComponentFlags>({ editTransaction: INITIAL_FLAGS });
  #flags: ComponentFlags = { editTransaction: INITIAL_FLAGS };

  #context = inject(ContextService);
  #firestore = inject(FirestoreService);
  #notification = inject(NotificationService);
  #router = inject(Router);

  #setFlags(flags: ComponentFlags) {
    this.#flags = flags;
    this.#flags$.next(this.#flags);
  }

  resetFlags() {
    this.#setFlags({ editTransaction: INITIAL_FLAGS });
  }

  watchFlags$() {
    return this.#flags$.asObservable();
  }

  watchTransaction$() {
    const transactionId = this.#router.url.match(/pocketbook\/(\w+)\//)?.at(1);
    return this.#context
      .watchTransaction$()
      .pipe(
        switchMap(txn =>
          !txn ? this.#firestore.watchTransaction$(transactionId ?? '') : of(txn)
        )
      );
  }

  patchValues$(): Observable<TransactionFormFields> {
    return this.watchTransaction$().pipe(
      map(txn => ({
        category: txn?.category ?? null,
        amount: txn?.amount ?? null,
        direction: txn?.direction ?? null,
        message: txn?.message ?? null,
        timestamp: txn?.timestamp ?? null,
        paymentMode: txn?.paymentMode ?? null
      }))
    );
  }

  editTransaction$(transaction: ITransaction) {
    this.resetFlags();
    this.#setFlags({
      ...this.#flags,
      editTransaction: {
        ...this.#flags.editTransaction,
        loading: true
      }
    });

    const t = this.#context.getTransaction();
    return this.#firestore.updateTransaction$({ ...t, ...transaction }).pipe(
      switchMap(() =>
        this.#context.watchPocketbook$().pipe(
          distinctUntilChanged(
            previous => !(previous?.transactionList ?? []).includes(transaction.id)
          ),
          switchMap(pocketbook =>
            this.#firestore.updatePocketbook$({
              ...pocketbook,
              balance: this.#context.updateTransactionCalculateBalance({
                old: t as ITransaction,
                new: transaction
              })
            })
          )
        )
      ),
      tap(() => {
        this.#notification.success({
          title: 'Transaction edited',
          description: 'The transaction has been updated successfully'
        });
        this.resetFlags();
        this.#router.navigate([
          RoutePaths.Pocketbook,
          this.#context.getPocketbook()?.id ?? 'null',
          RoutePaths.Transaction,
          RoutePaths.EntityList
        ]);
      }),
      catchError(error => {
        this.#notification.error({
          description: `${error}.`,
          title: 'Error adding transaction'
        });
        this.#setFlags({
          ...this.#flags,
          editTransaction: {
            ...this.#flags.editTransaction,
            loading: false,
            fail: true,
            visible: true
          }
        });
        return of(error);
      })
    );
  }

  cancelEditTransaction() {
    this.#router.navigate([
      RoutePaths.Pocketbook,
      this.#context.getPocketbook()?.id,
      RoutePaths.Transaction,
      RoutePaths.EntityList
    ]);
  }
}
