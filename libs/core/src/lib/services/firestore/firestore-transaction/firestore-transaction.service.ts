import { Injectable, computed, inject } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { catchError, from, map, of, switchMap, throwError } from 'rxjs';

import { Collections } from '@expenses-tracker/shared/common';
import { ITransaction } from '@expenses-tracker/shared/interfaces';

import { ContextService } from '../../context/context.service';
import { ErrorService } from '../../error/error.service';
import { TransactionMapper } from '../firestore.utils';

@Injectable({
  providedIn: 'root'
})
export class FirestoreTransactionService {
  #firestore = inject(AngularFirestore);
  #context = inject(ContextService);
  #error = inject(ErrorService);
  user = computed(() => this.#context.user());
  pocketbook = computed(() => this.#context.pocketbook());

  watchTransactionList$() {
    return !this.pocketbook()
      ? of([])
      : this.#firestore
          .collection<Partial<ITransaction<Timestamp>>>(Collections.Transaction, ref =>
            ref.where('pocketbookId', '==', this.pocketbook()?.id ?? '').orderBy('timestamp', 'desc')
          )
          .valueChanges()
          .pipe(
            map(transactionList => transactionList.map(txn => TransactionMapper(txn as ITransaction<Timestamp>))),
            catchError(({ code }: FirebaseError) => throwError(() => new Error(this.#error.getError(code))))
          );
  }

  watchTransaction$(transactionId: string) {
    return this.#firestore
      .collection<ITransaction<Timestamp>>(Collections.Transaction, ref => ref.where('id', '==', transactionId ?? ''))
      .valueChanges()
      .pipe(
        map(([txn]) => TransactionMapper(txn as ITransaction<Timestamp>)),
        catchError(({ code }: FirebaseError) => throwError(() => new Error(this.#error.getError(code))))
      );
  }

  createTransaction$({
    amount,
    category,
    direction,
    message,
    paymentMode,
    timestamp = new Date()
  }: Partial<ITransaction>) {
    const docId = this.#firestore.createId();

    return !this.pocketbook()
      ? throwError(() => new Error('No pocketbook set in context'))
      : from(
          this.#firestore
            .collection<Partial<ITransaction>>(Collections.Transaction)
            .doc(docId)
            .set({
              id: docId,
              timestamp,
              amount: amount ?? 0,
              category: category ?? 'other',
              direction: direction ?? 'expense',
              message: message ?? '',
              pocketbookId: this.pocketbook()?.id ?? ''
            })
        ).pipe(
          map(
            () =>
              ({
                amount,
                category,
                direction,
                id: docId,
                message,
                timestamp,
                pocketbookId: this.pocketbook()?.id
              }) as ITransaction
          )
        );
  }

  updateTransaction$(transaction: Partial<ITransaction>) {
    return from(
      this.#firestore
        .collection<ITransaction>(Collections.Transaction)
        .doc(transaction?.id)
        .update({ ...transaction })
    ).pipe(
      map(() => transaction),
      catchError(({ code }: FirebaseError) => {
        console.error({ code });
        return throwError(() => new Error(this.#error.getError(code)));
      })
    );
  }

  deleteTransaction$(transactionId: string) {
    return from(
      this.#firestore.collection<Partial<ITransaction>>(Collections.Transaction).doc(transactionId).delete()
    ).pipe(
      catchError(({ code }: FirebaseError) => {
        console.error({ code });
        return throwError(() => new Error(this.#error.getError(code)));
      })
    );
  }
}
