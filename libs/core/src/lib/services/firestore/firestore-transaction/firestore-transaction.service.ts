import { Injectable, computed, inject } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { catchError, from, map, of, throwError } from 'rxjs';

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

  /**
   * @deprecated Use monthly fetch API instead
   */
  watchTransactionList$() {
    return !this.pocketbook()
      ? of([])
      : this.#firestore
          .collection<Partial<ITransaction<Timestamp>>>(Collections.Transaction, ref =>
            ref.where('pocketbookId', '==', this.pocketbook()?.id ?? '').orderBy('transactionDate', 'desc')
          )
          .valueChanges()
          .pipe(
            map(transactionList => transactionList.map(txn => TransactionMapper(txn as ITransaction<Timestamp>))),
            catchError(error => {
              console.error({ error });
              return throwError(() => new Error('Error fetching transaction list'));
            })
          );
  }

  watchTransactionListForDay$(date: Date = new Date()) {
    return !this.pocketbook()
      ? of([])
      : this.#firestore
          .collection<Partial<ITransaction<Timestamp>>>(Collections.Transaction, ref =>
            ref
              .where('pocketbookId', '==', this.pocketbook()?.id ?? '')
              .where('transactionDate', '==', date)
              .orderBy('transactionDate', 'desc')
          )
          .valueChanges()
          .pipe(
            map(transactionList => transactionList.map(txn => TransactionMapper(txn as ITransaction<Timestamp>))),
            catchError(error => {
              console.error({ error });
              return throwError(() => new Error('Error fetching transaction for day'));
            })
          );
  }

  watchTransactionListForWeek$(date: Date = new Date()) {
    const sunday = new Date(date.getFullYear(), date.getMonth(), date.getDate() + date.getDay() * -1);
    const saturday = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 6 - date.getDay());
    return !this.pocketbook()
      ? of([])
      : this.#firestore
          .collection<Partial<ITransaction<Timestamp>>>(Collections.Transaction, ref =>
            ref
              .where('pocketbookId', '==', this.pocketbook()?.id ?? '')
              .where('transactionDate', '>=', sunday)
              .where('transactionDate', '<=', saturday)
              .orderBy('transactionDate', 'desc')
          )
          .valueChanges()
          .pipe(
            map(transactionList => transactionList.map(txn => TransactionMapper(txn as ITransaction<Timestamp>))),
            catchError(error => {
              console.error({ error });
              return throwError(() => new Error('Error fetching transaction for week'));
            })
          );
  }

  watchTransactionListForMonth$(date: Date = new Date()) {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    return !this.pocketbook()
      ? of([])
      : this.#firestore
          .collection<Partial<ITransaction<Timestamp>>>(Collections.Transaction, ref =>
            ref
              .where('pocketbookId', '==', this.pocketbook()?.id ?? '')
              .where('transactionDate', '>=', startOfMonth)
              .where('transactionDate', '<', endOfMonth)
              .orderBy('transactionDate', 'desc')
          )
          .valueChanges()
          .pipe(
            map(transactionList => transactionList.map(txn => TransactionMapper(txn as ITransaction<Timestamp>))),
            catchError(error => {
              console.error({ error });
              return throwError(() => new Error('Error fetching transaction for month'));
            })
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

  createTransaction$({ amount, category, transactionType, description, paymentMode, transactionDate }: ITransaction) {
    const docId = this.#firestore.createId();

    return !this.pocketbook()
      ? throwError(() => new Error('No pocketbook set in context'))
      : from(
          this.#firestore
            .collection<ITransaction>(Collections.Transaction)
            .doc(docId)
            .set({
              id: docId,
              transactionDate,
              amount,
              category,
              transactionType,
              description,
              paymentMode,
              pocketbookId: this.pocketbook()?.id ?? ''
            })
        ).pipe(
          map(
            () =>
              ({
                amount,
                category,
                transactionType,
                id: docId,
                description,
                transactionDate,
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
