import { Injectable, computed, inject } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { catchError, combineLatest, from, map, of, throwError } from 'rxjs';

import { Collections } from '@expenses-tracker/shared/common';
import { IPocketbook } from '@expenses-tracker/shared/interfaces';

import { ContextService } from '../../context/context.service';
import { ErrorService } from '../../error/error.service';
import { PocketbookMapper } from '../firestore.utils';

@Injectable({
  providedIn: 'root'
})
export class FirestorePocketbookService {
  #firestore = inject(AngularFirestore);
  #context = inject(ContextService);
  #error = inject(ErrorService);
  user = computed(() => this.#context.user());

  watchOwnedPocketbookList$() {
    return !this.user()
      ? of([])
      : this.#firestore
          .collection<IPocketbook<Timestamp>>(Collections.Pocketbook, ref =>
            ref.where('owner', '==', this.user()?.uid ?? '').orderBy('createdAt', 'desc')
          )
          .valueChanges()
          .pipe(
            map(pocketbookList => pocketbookList.map(pb => PocketbookMapper(pb))),
            catchError(({ code }: FirebaseError) => throwError(() => new Error(this.#error.getError(code))))
          );
  }

  watchOwnedPocketbookListCount$() {
    return !this.user()
      ? of(0)
      : this.#firestore
          .collection<IPocketbook<Timestamp>>(Collections.Pocketbook, ref =>
            ref.where('owner', '==', this.user()?.uid ?? '')
          )
          .snapshotChanges()
          .pipe(
            map(snapshot => snapshot.length),
            catchError(({ code }: FirebaseError) => throwError(() => new Error(this.#error.getError(code))))
          );
  }

  watchCollaboratedPocketbookList$() {
    return !this.user()
      ? of([])
      : this.#firestore
          .collection<IPocketbook<Timestamp>>(Collections.Pocketbook, ref =>
            ref.where('collaboratorList', 'array-contains', this.user()?.uid ?? '').orderBy('createdAt', 'desc')
          )
          .valueChanges()
          .pipe(
            map(pocketbookList => pocketbookList.map(pb => PocketbookMapper(pb))),
            catchError(({ code }: FirebaseError) => throwError(() => new Error(this.#error.getError(code))))
          );
  }

  watchCollaboratedPocketbookListCount$() {
    return !this.user()
      ? of(0)
      : this.#firestore
          .collection<IPocketbook<Timestamp>>(Collections.Pocketbook, ref =>
            ref.where('collaboratorList', 'array-contains', this.user()?.uid ?? '')
          )
          .snapshotChanges()
          .pipe(
            map(snapshot => snapshot.length),
            catchError(({ code }: FirebaseError) => throwError(() => new Error(this.#error.getError(code))))
          );
  }

  watchPocketbookList$() {
    return combineLatest([this.watchOwnedPocketbookList$(), this.watchCollaboratedPocketbookList$()]).pipe(
      map(([watchOwnedPocketbookList, watchCollaboratedPocketbookList]) => [
        ...watchOwnedPocketbookList,
        ...watchCollaboratedPocketbookList
      ])
    );
  }

  watchPocketbook$(pocketbookId: string) {
    return this.#firestore
      .collection<IPocketbook<Timestamp>>(Collections.Pocketbook, ref => ref.where('id', '==', pocketbookId ?? ''))
      .valueChanges()
      .pipe(
        map(([pb]) => PocketbookMapper(pb)),
        catchError(({ code }: FirebaseError) => throwError(() => new Error(this.#error.getError(code))))
      );
  }

  createPocketbook$({ name, collaboratorList = [], transactionList = [] }: IPocketbook) {
    const docId = this.#firestore.createId();
    const createdAt = new Date();
    return !this.user()
      ? throwError(() => new Error('User not logged in'))
      : from(
          this.#firestore
            .collection<Partial<IPocketbook>>(Collections.Pocketbook)
            .doc(docId)
            .set({
              id: docId,
              owner: this.user()?.uid ?? '',
              name,
              collaboratorList,
              transactionList,
              createdAt,
              balance: 0
            })
        ).pipe(
          map(
            () =>
              ({
                id: docId,
                owner: this.user()?.uid,
                name,
                collaboratorList,
                transactionList,
                createdAt,
                balance: 0
              }) as IPocketbook
          ),
          catchError(({ code }: FirebaseError) => throwError(() => new Error(this.#error.getError(code))))
        );
  }

  updatePocketbook$(pocketbook: Partial<IPocketbook>) {
    return from(
      this.#firestore
        .collection<IPocketbook>(Collections.Pocketbook)
        .doc(pocketbook?.id ?? '')
        .update({ ...pocketbook })
    ).pipe(
      map(() => {
        this.#context.setPocketbook({ ...(this.#context.pocketbook() as IPocketbook), ...pocketbook });
        return this.#context.pocketbook();
      }),
      catchError(({ code }: FirebaseError) => {
        console.error({ code });
        return throwError(() => new Error(this.#error.getError(code)));
      })
    );
  }

  deletePocketbook$(pocketbookId: string) {
    return from(this.#firestore.collection<IPocketbook>(Collections.Pocketbook).doc(pocketbookId).delete()).pipe(
      catchError(({ code }: FirebaseError) => {
        console.error({ code });
        return throwError(() => new Error(this.#error.getError(code)));
      })
    );
  }
}
