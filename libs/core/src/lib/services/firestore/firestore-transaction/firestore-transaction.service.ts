import { Injectable, inject } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { catchError, from, map, of, switchMap, throwError } from 'rxjs';

import { Collections } from '@expenses-tracker/shared/common';
import { ITransaction } from '@expenses-tracker/shared/interfaces';

import { ContextService } from '../../context/context.service';
import { ErrorService } from '../../error/error.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreTransactionService {
  #firestore = inject(AngularFirestore);
  #context = inject(ContextService);
  #error = inject(ErrorService);

  watchTransactionList$() {
    return this.#context.watchPocketbook$().pipe(
      switchMap(pocketbook =>
        !pocketbook
          ? of([])
          : this.#firestore
              .collection<ITransaction<Timestamp>>(Collections.Transaction, ref =>
                ref
                  .where('pocketbookId', '==', pocketbook?.id ?? '')
                  .orderBy('timestamp', 'desc')
              )
              .valueChanges()
              .pipe(
                map(transactionList =>
                  transactionList.map(
                    t =>
                      ({
                        ...t,
                        timestamp: t.timestamp?.toDate()
                      } as ITransaction)
                  )
                ),
                catchError(({ code }: FirebaseError) =>
                  throwError(() => new Error(this.#error.getError(code)))
                )
              )
      )
    );
  }

  watchTransaction$(transactionId: string) {
    return this.#firestore
      .collection<ITransaction<Timestamp>>(Collections.Transaction, ref =>
        ref.where('id', '==', transactionId ?? '')
      )
      .valueChanges()
      .pipe(
        map(
          ([txn]) =>
            ({
              ...txn,
              timestamp: (txn?.timestamp as Timestamp)?.toDate()
            } as ITransaction)
        ),
        catchError(({ code }: FirebaseError) =>
          throwError(() => new Error(this.#error.getError(code)))
        )
      );
  }

  createTransaction$({ amount, category, direction, message }: Partial<ITransaction>) {
    const docId = this.#firestore.createId();
    const timestamp = new Date();
    return this.#context.watchPocketbook$().pipe(
      switchMap(pocketbook =>
        this.#firestore
          .collection<Partial<ITransaction>>(Collections.Transaction)
          .doc(docId)
          .set({
            id: docId,
            timestamp,
            amount: amount ?? 0,
            category: category ?? '',
            direction: direction ?? 'expense',
            message: message ?? '',
            pocketbookId: pocketbook?.id ?? ''
          })
      ),
      map(
        () =>
          ({
            amount,
            category,
            direction,
            id: docId,
            message,
            timestamp
          } as ITransaction)
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
      this.#firestore
        .collection<Partial<ITransaction>>(Collections.Transaction)
        .doc(transactionId)
        .delete()
    ).pipe(
      catchError(({ code }: FirebaseError) => {
        console.error({ code });
        return throwError(() => new Error(this.#error.getError(code)));
      })
    );
  }
}
