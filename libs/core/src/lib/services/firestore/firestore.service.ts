import { Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { User } from 'firebase/auth';
import { catchError, from, map, of, switchMap, throwError } from 'rxjs';

import { Collections } from '@expenses-tracker/shared/common';
import { IPocketbook, ITransaction } from '@expenses-tracker/shared/interfaces';

import { ContextService } from '../context/context.service';
import { ErrorService } from '../error/error.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(
    private _firestore: AngularFirestore,
    private _context: ContextService,
    private _error: ErrorService
  ) {}

  watchOwnedPocketbookList$() {
    return this._context.watchUser$().pipe(
      switchMap(user =>
        this._firestore
          .collection<IPocketbook<Timestamp>>(Collections.Pocketbook, ref =>
            ref.where('owner', '==', user?.uid ?? '')
          )
          .valueChanges()
          .pipe(
            map(pocketbookList =>
              pocketbookList.map(
                pb =>
                  ({
                    ...pb,
                    createdAt: (pb.createdAt as Timestamp).toDate()
                  } as IPocketbook)
              )
            ),
            catchError(({ code }: FirebaseError) =>
              throwError(() => new Error(this._error.getError(code)))
            )
          )
      )
    );
  }

  watchCollaboratedPocketbookList$() {
    return this._context.watchUser$().pipe(
      switchMap(user =>
        this._firestore
          .collection<IPocketbook<Timestamp>>(Collections.Pocketbook, ref =>
            ref.where('collaboratorList', 'array-contains', user?.uid ?? '')
          )
          .valueChanges()
          .pipe(
            map(pocketbookList =>
              pocketbookList.map(
                pb =>
                  ({
                    ...pb,
                    createdAt: (pb.createdAt as Timestamp).toDate()
                  } as IPocketbook)
              )
            ),
            catchError(({ code }: FirebaseError) =>
              throwError(() => new Error(this._error.getError(code)))
            )
          )
      )
    );
  }

  watchPocketbook$(id: string) {
    return this._firestore
      .collection<IPocketbook<Timestamp>>(Collections.Pocketbook, ref =>
        ref.where('id', '==', id ?? '')
      )
      .valueChanges()
      .pipe(
        map(
          ([pb]) =>
            ({
              ...pb,
              createdAt: (pb?.createdAt as Timestamp)?.toDate()
            } as IPocketbook)
        ),
        catchError(({ code }: FirebaseError) =>
          throwError(() => new Error(this._error.getError(code)))
        )
      );
  }

  createPocketbook$({ name, collaboratorList = [], transactionList = [] }: IPocketbook) {
    const docId = this._firestore.createId();
    return this._context.watchUser$().pipe(
      switchMap(user =>
        from(
          this._firestore
            .collection<IPocketbook>(Collections.Pocketbook)
            .doc(docId)
            .set({
              id: docId,
              owner: user?.uid ?? '',
              name,
              collaboratorList,
              transactionList,
              createdAt: new Date(),
              balance: 0
            })
        ).pipe(
          map(pb => {
            console.log({ pb });
            return pb;
          }),
          catchError(({ code }: FirebaseError) =>
            throwError(() => new Error(this._error.getError(code)))
          )
        )
      )
    );
  }

  updatePocketbook$(pocketbook: Partial<IPocketbook>) {
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
              from(
                this._firestore
                  .collection<IPocketbook>(Collections.Pocketbook)
                  .doc(id)
                  .update({ ...pocketbook })
              ).pipe(
                map(pb => {
                  console.log({ pb });
                  return pb;
                }),
                catchError(({ code }: FirebaseError) => {
                  console.error({ code });
                  return throwError(() => new Error(this._error.getError(code)));
                })
              )
            )
          )
      )
    );
  }

  deletePocketbook$(pocketbook: Partial<IPocketbook>) {
    return this._firestore
      .collection<IPocketbook>(Collections.Pocketbook, ref =>
        ref.where('id', '==', pocketbook.id ?? '')
      )
      .get()
      .pipe(
        map(ref => (ref.docs ?? [])[0]?.id ?? ''),
        switchMap(id =>
          from(
            this._firestore.collection<IPocketbook>(Collections.Pocketbook).doc(id).delete()
          ).pipe(
            catchError(({ code }: FirebaseError) => {
              console.log({ code });
              return throwError(() => new Error(this._error.getError(code)));
            })
          )
        )
      );
  }

  saveUser$({ uid, displayName, email }: User) {
    return from(
      this._firestore
        .collection<Partial<User>>(Collections.User)
        .doc(uid)
        .set({ uid, displayName, email })
    ).pipe(
      map(() => ({ uid, displayName, email } as User)),
      catchError(({ code }: FirebaseError) =>
        throwError(() => new Error(this._error.getError(code)))
      )
    );
  }

  updateUser$({ displayName }: User) {
    return this._context.watchUser$().pipe(
      switchMap(user =>
        this._firestore
          .collection<User>(Collections.User, ref => ref.where('uid', '==', user?.uid ?? ''))
          .get()
          .pipe(
            map(ref => (ref.docs ?? [])[0]?.id ?? ''),
            switchMap(id =>
              from(
                this._firestore
                  .collection<User>(Collections.User)
                  .doc(id)
                  .update({ displayName })
              ).pipe(
                catchError(({ code }: FirebaseError) =>
                  throwError(() => new Error(this._error.getError(code)))
                )
              )
            )
          )
      )
    );
  }

  watchUserList$() {
    return this._firestore.collection<Partial<User>>(Collections.User).valueChanges();
  }

  watchOwner$(pocketbook: IPocketbook | null) {
    return this._firestore
      .collection<Partial<User>>(Collections.User, ref =>
        ref.where('uid', '==', pocketbook?.owner ?? '')
      )
      .valueChanges()
      .pipe(
        map(([owner]) => owner),
        catchError(({ code }: FirebaseError) =>
          throwError(() => new Error(this._error.getError(code)))
        )
      );
  }

  watchCollaboratorList$(pocketbook: IPocketbook | null) {
    return !pocketbook?.collaboratorList?.length
      ? of([] as User[])
      : this._firestore
          .collection<User>(Collections.User, ref =>
            ref.where('uid', 'in', pocketbook?.collaboratorList ?? [])
          )
          .valueChanges();
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
