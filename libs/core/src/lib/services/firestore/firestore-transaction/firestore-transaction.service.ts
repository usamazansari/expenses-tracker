import { Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { catchError, from, map, switchMap, throwError } from 'rxjs';

import { Collections } from '@expenses-tracker/shared/common';
import { IPocketbook, ITransaction } from '@expenses-tracker/shared/interfaces';

import { ContextService } from '../../context/context.service';
import { ErrorService } from '../../error/error.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreTransactionService {
  constructor(
    private _firestore: AngularFirestore,
    private _context: ContextService,
    private _error: ErrorService
  ) {}

  watchTransactionList$() {
    return this._context.watchPocketbook$().pipe(
      switchMap(pocketbook =>
        this._firestore
          .collection<Partial<ITransaction<Timestamp>>>(Collections.Transaction, ref =>
            ref.where('pocketbook', '==', pocketbook?.id ?? '').orderBy('timestamp', 'desc')
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
              throwError(() => new Error(this._error.getError(code)))
            )
          )
      )
    );
  }

  createTransaction$({ amount, category, direction, message }: Partial<ITransaction>) {
    const docId = this._firestore.createId();
    return this._context.watchPocketbook$().pipe(
      switchMap(pocketbook =>
        this._firestore
          .collection<Partial<ITransaction>>(Collections.Transaction)
          .doc(docId)
          .set({
            id: docId,
            timestamp: new Date(),
            amount: amount ?? 0,
            category: category ?? '',
            direction: direction ?? 'expense',
            message: message ?? '',
            pocketbookId: pocketbook?.id ?? ''
          })
      )
    );
  }

  updateTransaction$(transaction: Partial<ITransaction>) {
    return from(
      this._firestore
        .collection<IPocketbook>(Collections.Pocketbook)
        .doc(transaction?.id)
        .update({ ...transaction })
    ).pipe(
      map(pb => {
        console.log({ pb });
        return pb;
      }),
      catchError(({ code }: FirebaseError) => {
        console.error({ code });
        return throwError(() => new Error(this._error.getError(code)));
      })
    );
  }

  deleteTransaction$(transactionId: string) {
    return from(
      this._firestore
        .collection<Partial<ITransaction>>(Collections.Transaction)
        .doc(transactionId)
        .delete()
    ).pipe(
      catchError(({ code }: FirebaseError) => {
        console.log({ code });
        return throwError(() => new Error(this._error.getError(code)));
      })
    );
  }
}
