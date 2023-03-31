import { Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'firebase/auth';
import { catchError, from, map, of, switchMap, throwError } from 'rxjs';

import { Collections } from '@expenses-tracker/shared/common';

import { ContextService } from '../../context/context.service';
import { ErrorService } from '../../error/error.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreUserService {
  constructor(
    private _firestore: AngularFirestore,
    private _context: ContextService,
    private _error: ErrorService
  ) {}

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

  updateUser$({ displayName }: Partial<User>) {
    return this._context.watchUser$().pipe(
      switchMap(user =>
        this._firestore
          .collection<Partial<User>>(Collections.User, ref =>
            ref.where('uid', '==', user?.uid ?? '')
          )
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

  watchPocketbookOwner$(pocketbookOwner: string) {
    return this._firestore
      .collection<Partial<User>>(Collections.User, ref =>
        ref.where('uid', '==', pocketbookOwner ?? '')
      )
      .valueChanges()
      .pipe(
        map(([owner]) => owner),
        catchError(({ code }: FirebaseError) =>
          throwError(() => new Error(this._error.getError(code)))
        )
      );
  }

  watchPocketbookCollaboratorList$(pocketbookCollaboratorList: string[]) {
    return !pocketbookCollaboratorList?.length
      ? of([] as User[])
      : this._firestore
          .collection<User>(Collections.User, ref =>
            ref.where('uid', 'in', pocketbookCollaboratorList ?? [])
          )
          .valueChanges()
          .pipe(
            catchError(({ code }: FirebaseError) =>
              throwError(() => new Error(this._error.getError(code)))
            )
          );
  }
}
