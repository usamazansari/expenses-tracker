import { Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { catchError, from, map, switchMap, throwError } from 'rxjs';

import { Collections } from '@expenses-tracker/shared/common';
import { IPocketbook } from '@expenses-tracker/shared/interfaces';

import { ContextService } from '../../context/context.service';
import { ErrorService } from '../../error/error.service';

@Injectable({
  providedIn: 'root'
})
export class FirestorePocketbookService {
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

  watchPocketbook$(pocketbookId: string) {
    return this._firestore
      .collection<IPocketbook<Timestamp>>(Collections.Pocketbook, ref =>
        ref.where('id', '==', pocketbookId ?? '')
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
          .collection<IPocketbook>(Collections.Pocketbook)
          .doc(pb?.id)
          .get()
          .pipe(
            map(ref => ref.data()?.id ?? ''),
            switchMap(pocketbookId =>
              from(
                this._firestore
                  .collection<IPocketbook>(Collections.Pocketbook)
                  .doc(pocketbookId)
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

  deletePocketbook$(pocketbookId: string) {
    return from(
      this._firestore.collection<IPocketbook>(Collections.Pocketbook).doc(pocketbookId).delete()
    ).pipe(
      catchError(({ code }: FirebaseError) => {
        console.log({ code });
        return throwError(() => new Error(this._error.getError(code)));
      })
    );
  }
}