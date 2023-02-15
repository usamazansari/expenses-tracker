import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'firebase/auth';
import { map, switchMap, throwError } from 'rxjs';

import { Collections } from '@expenses-tracker/shared/common';
import { IPocketbook } from '@expenses-tracker/shared/interfaces';

import { ContextService } from '../context/context.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private _firestore: AngularFirestore, private _context: ContextService) {}

  getPocketbookList$() {
    return this._context.getUser$().pipe(
      switchMap(user =>
        this._firestore
          .collection<IPocketbook>(Collections.Pocketbook)
          .valueChanges()
          .pipe(map(docs => docs.filter(doc => doc?.owner === user?.uid)))
      )
    );
  }

  createPocketbook$({ name, collaboratorList = [] }: Partial<IPocketbook>) {
    return this._context.getUser$().pipe(
      switchMap(user =>
        this._firestore.collection<IPocketbook>(Collections.Pocketbook).add({
          id: this._firestore.createId(),
          owner: user?.uid ?? '',
          name,
          collaboratorList,
          createdAt: new Date()
        })
      )
    );
  }

  deletePocketbook$(pocketbook: Partial<IPocketbook>) {
    return this._context.getUser$().pipe(
      switchMap(user =>
        this._firestore
          .collection<IPocketbook>(Collections.Pocketbook)
          .doc(pocketbook.id)
          .get()
          .pipe(
            map(ref => ref.data()),
            switchMap(data => {
              if (data?.owner === user?.uid) {
                return this._firestore
                  .collection<IPocketbook>(Collections.Pocketbook)
                  .doc(pocketbook.id)
                  .delete();
              }
              return throwError(() => new Error('Data not found!'));
            })
          )
      )
    );
  }

  saveUser$({ uid, displayName, email, phoneNumber, photoURL }: User) {
    return this._firestore
      .collection<Partial<User>>(Collections.User)
      .add({ uid, displayName, email, phoneNumber, photoURL });
  }

  updateUser$({ displayName, email, phoneNumber, photoURL }: Partial<User>) {
    const user = this._context.getUser();
    return this._firestore
      .collection<Partial<User>>(Collections.User, ref => ref.where('uid', '==', user?.uid))
      .get()
      .pipe(
        map(({ docs: [doc] }) => ({ id: doc?.id, data: doc?.data() })),
        switchMap(({ id, data }) =>
          this._firestore
            .collection<Partial<User>>(Collections.User)
            .doc(id)
            .update({
              displayName: displayName ?? data?.displayName,
              email: email ?? data?.email,
              phoneNumber: phoneNumber ?? data?.phoneNumber,
              photoURL: photoURL ?? data?.photoURL
            })
        )
      );
  }

  watchUserList$() {
    return this._firestore.collection<Partial<User>>(Collections.User).valueChanges();
  }
}
