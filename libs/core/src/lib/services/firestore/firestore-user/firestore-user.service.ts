import { Injectable, computed, inject } from '@angular/core';
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
  #firestore = inject(AngularFirestore);
  #context = inject(ContextService);
  #error = inject(ErrorService);
  user = computed(() => this.#context.user());

  saveUser$({ uid, displayName, email }: User) {
    return from(
      this.#firestore.collection<Partial<User>>(Collections.User).doc(uid).set({ uid, displayName, email })
    ).pipe(
      map(() => ({ uid, displayName, email } as User)),
      catchError(({ code }: FirebaseError) => throwError(() => new Error(this.#error.getError(code))))
    );
  }

  updateUser$({ displayName }: Partial<User>) {
    return !this.user()
      ? of()
      : this.#firestore
          .collection<Partial<User>>(Collections.User, ref => ref.where('uid', '==', this.user()?.uid ?? ''))
          .get()
          .pipe(
            map(ref => (ref.docs ?? [])[0]?.id ?? ''),
            switchMap(id =>
              from(this.#firestore.collection<User>(Collections.User).doc(id).update({ displayName })).pipe(
                catchError(({ code }: FirebaseError) => throwError(() => new Error(this.#error.getError(code))))
              )
            )
          );
  }

  watchUserList$() {
    return this.#firestore.collection<Partial<User>>(Collections.User).valueChanges();
  }

  watchPocketbookOwner$(pocketbookOwner: string) {
    return this.#firestore
      .collection<Partial<User>>(Collections.User, ref => ref.where('uid', '==', pocketbookOwner ?? ''))
      .valueChanges()
      .pipe(
        map(([owner]) => owner),
        catchError(({ code }: FirebaseError) => throwError(() => new Error(this.#error.getError(code))))
      );
  }

  watchPocketbookCollaboratorList$(pocketbookCollaboratorList: string[]) {
    return !pocketbookCollaboratorList?.length
      ? of([] as User[])
      : this.#firestore
          .collection<User>(Collections.User, ref => ref.where('uid', 'in', pocketbookCollaboratorList ?? []))
          .valueChanges()
          .pipe(catchError(({ code }: FirebaseError) => throwError(() => new Error(this.#error.getError(code)))));
  }
}
