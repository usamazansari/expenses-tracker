import { Injectable, inject } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { catchError, from, map, of, switchMap, throwError } from 'rxjs';

import { Collections } from '@expenses-tracker/shared/common';
import { IPocketbook } from '@expenses-tracker/shared/interfaces';

import { ContextService } from '../../context/context.service';
import { ErrorService } from '../../error/error.service';

@Injectable({
  providedIn: 'root'
})
export class FirestorePocketbookService {
  #firestore = inject(AngularFirestore);
  #context = inject(ContextService);
  #error = inject(ErrorService);

  watchOwnedPocketbookList$() {
    return this.#context.watchUser$().pipe(
      switchMap(user =>
        !user
          ? of([])
          : this.#firestore
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
                  throwError(() => new Error(this.#error.getError(code)))
                )
              )
      )
    );
  }

  watchCollaboratedPocketbookList$() {
    return this.#context.watchUser$().pipe(
      switchMap(user =>
        !user
          ? of([])
          : this.#firestore
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
                  throwError(() => new Error(this.#error.getError(code)))
                )
              )
      )
    );
  }

  watchPocketbook$(pocketbookId: string) {
    return this.#firestore
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
          throwError(() => new Error(this.#error.getError(code)))
        )
      );
  }

  createPocketbook$({ name, collaboratorList = [], transactionList = [] }: IPocketbook) {
    const docId = this.#firestore.createId();
    return this.#context.watchUser$().pipe(
      switchMap(user =>
        !user
          ? of([])
          : from(
              this.#firestore
                .collection<Partial<IPocketbook>>(Collections.Pocketbook)
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
              catchError(({ code }: FirebaseError) =>
                throwError(() => new Error(this.#error.getError(code)))
              )
            )
      )
    );
  }

  updatePocketbook$(pocketbook: Partial<IPocketbook>) {
    return from(
      this.#firestore
        .collection<IPocketbook>(Collections.Pocketbook)
        .doc(pocketbook?.id ?? '')
        .update({ ...pocketbook })
    ).pipe(
      catchError(({ code }: FirebaseError) => {
        console.error({ code });
        return throwError(() => new Error(this.#error.getError(code)));
      })
    );
  }

  deletePocketbook$(pocketbookId: string) {
    return from(
      this.#firestore.collection<IPocketbook>(Collections.Pocketbook).doc(pocketbookId).delete()
    ).pipe(
      catchError(({ code }: FirebaseError) => {
        console.log({ code });
        return throwError(() => new Error(this.#error.getError(code)));
      })
    );
  }
}
