import { Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { User } from 'firebase/auth';
import { catchError, map, switchMap, throwError } from 'rxjs';

import { Collections } from '@expenses-tracker/shared/common';
import { IPocketbook, ITransaction } from '@expenses-tracker/shared/interfaces';

import { ContextService } from '../context/context.service';
import { ErrorService } from '../error/error.service';

import { FirestorePocketbookService } from './firestore-pocketbook/firestore-pocketbook.service';
import { FirestoreUserService } from './firestore-user/firestore-user.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(
    private _firestore: AngularFirestore,
    private _context: ContextService,
    private _error: ErrorService,
    private _pocketbook: FirestorePocketbookService,
    private _user: FirestoreUserService
  ) {}

  watchOwnedPocketbookList$() {
    return this._pocketbook.watchOwnedPocketbookList$();
  }

  watchCollaboratedPocketbookList$() {
    return this._pocketbook.watchCollaboratedPocketbookList$();
  }

  watchPocketbook$(pocketbookId: string) {
    return this._pocketbook.watchPocketbook$(pocketbookId);
  }

  createPocketbook$(pocketbook: IPocketbook) {
    return this._pocketbook.createPocketbook$(pocketbook);
  }

  updatePocketbook$(pocketbook: Partial<IPocketbook>) {
    return this._pocketbook.updatePocketbook$(pocketbook);
  }

  deletePocketbook$(pocketbookId: string) {
    return this._pocketbook.deletePocketbook$(pocketbookId);
  }

  saveUser$(user: User) {
    return this._user.saveUser$(user);
  }

  updateUser$(user: Partial<User>) {
    return this._user.updateUser$(user);
  }

  watchUserList$() {
    return this._user.watchUserList$();
  }

  watchPocketbookOwner$(pocketbookOwner: string) {
    return this._user.watchPocketbookOwner$(pocketbookOwner);
  }

  watchPocketbookCollaboratorList$(pocketbookCollaboratorList: string[]) {
    return this._user.watchPocketbookCollaboratorList$(pocketbookCollaboratorList);
  }

  watchTransactionList$() {
    return this._context.watchPocketbook$().pipe(
      switchMap(pocketbook =>
        this._firestore
          .collection<ITransaction<Timestamp>>(Collections.Transaction, ref =>
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
          .collection<ITransaction>(Collections.Transaction)
          .doc(docId)
          .set({
            id: docId,
            timestamp: new Date(),
            amount: amount ?? 0,
            category: category ?? '',
            direction: direction ?? 'expense',
            message: message ?? '',
            pocketbook: pocketbook?.id ?? ''
          })
      )
    );
  }

  updateTransaction$(pocketbook: Partial<IPocketbook>) {
    return this._context.watchPocketbook$().pipe(
      switchMap(pb =>
        this._firestore
          .collection<IPocketbook>(Collections.Pocketbook, ref =>
            ref.where('id', '==', pb?.id ?? '')
          )
          .get()
          .pipe(
            map(ref => (ref.docs ?? [])[0]?.id ?? ''),
            switchMap(id =>
              this._firestore
                .collection<IPocketbook>(Collections.Pocketbook)
                .doc(id)
                .update({ ...pocketbook })
            )
          )
      )
    );
  }

  deleteTransaction$(pocketbook: Partial<IPocketbook>) {
    return this._context.watchUser$().pipe(
      switchMap(user =>
        this._firestore
          .collection<IPocketbook>(Collections.Pocketbook, ref =>
            ref.where('id', '==', pocketbook.id ?? '')
          )
          .get()
          .pipe(
            map(ref => ({
              id: (ref.docs ?? [])[0]?.id ?? '',
              data: (ref.docs ?? [])[0]?.data() ?? null
            })),
            switchMap(({ data, id }) => {
              if (data?.owner === user?.uid) {
                return this._firestore
                  .collection<IPocketbook>(Collections.Pocketbook)
                  .doc(id)
                  .delete();
              }
              return throwError(() => new Error('You cannot delete this pocketbook!'));
            })
          )
      )
    );
  }
}
