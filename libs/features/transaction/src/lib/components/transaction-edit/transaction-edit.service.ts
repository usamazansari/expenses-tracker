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
import { NotificationService } from '@expenses-tracker/shared/common';
import {
  IFlag,
  INITIAL_FLAGS,
  ITransaction,
  TransactionDirection
} from '@expenses-tracker/shared/interfaces';

export interface ITransactionEditForm {
  category: string | null;
  amount: number | null;
  direction: TransactionDirection | null;
  message: string | null;
}

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

  patchValues$(): Observable<ITransactionEditForm> {
    return this.watchTransaction$().pipe(
      map(txn => ({
        category: txn?.category ?? null,
        amount: txn?.amount ?? null,
        direction: txn?.direction ?? null,
        message: txn?.message ?? null
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

    return this.#firestore.updateTransaction$(transaction).pipe(
      switchMap(response =>
        this.#context.watchPocketbook$().pipe(
          distinctUntilChanged(
            previous => !(previous?.transactionList ?? []).includes(transaction.id)
          ),
          switchMap(pocketbook =>
            this.#firestore.updatePocketbook$({
              ...pocketbook,
              transactionList: [...(pocketbook?.transactionList ?? []), response?.id ?? ''],
              balance: this.#context.calculateBalance(transaction)
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
          'pocketbook',
          this.#context.getPocketbook()?.id,
          'transaction',
          'list'
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
      'pocketbook',
      this.#context.getPocketbook()?.id,
      'transaction',
      'list'
    ]);
  }
}
