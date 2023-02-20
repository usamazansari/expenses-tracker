import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'firebase/auth';
import { combineLatest, from, map, of, switchMap, throwError } from 'rxjs';

import { Collections } from '@expenses-tracker/shared/common';
import { IPocketbook } from '@expenses-tracker/shared/interfaces';

import { ContextService } from '../context/context.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private _firestore: AngularFirestore, private _context: ContextService) {}

  getPocketbookList$() {
    return combineLatest([
      this._firestore
        .collection<IPocketbook>(Collections.Pocketbook, ref =>
          ref.where('owner', '==', this._context.getUser()?.uid ?? '')
        )
        .valueChanges(),
      this._firestore
        .collection<IPocketbook>(Collections.Pocketbook, ref =>
          ref.where('collaboratorList', 'array-contains', this._context.getUser()?.uid ?? '')
        )
        .valueChanges()
    ]).pipe(map(([owner, collaborator]) => ({ owner, collaborator })));
  }

  createPocketbook$({ name, collaboratorList = [] }: Partial<IPocketbook>) {
    return from(
      this._firestore.collection<IPocketbook>(Collections.Pocketbook).add({
        id: this._firestore.createId(),
        owner: this._context.getUser()?.uid ?? '',
        name,
        collaboratorList,
        createdAt: new Date()
      })
    );
  }

  updatePocketbook$(pocketbook: Partial<IPocketbook>) {
    return this._firestore
      .collection<IPocketbook>(Collections.Pocketbook, ref =>
        ref.where('id', '==', this._context.getPocketbook()?.id ?? '')
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
      );
  }

  deletePocketbook$(pocketbook: Partial<IPocketbook>) {
    return this._firestore
      .collection<IPocketbook>(Collections.Pocketbook)
      .doc(pocketbook.id)
      .get()
      .pipe(
        map(ref => ref.data()),
        switchMap(data => {
          if (data?.owner === this._context.getUser()?.uid) {
            return this._firestore
              .collection<IPocketbook>(Collections.Pocketbook)
              .doc(pocketbook.id)
              .delete();
          }
          return throwError(() => new Error('Data not found!'));
        })
      );
  }

  saveUser$({ uid, displayName, email, phoneNumber, photoURL }: User) {
    return this._firestore
      .collection<Partial<User>>(Collections.User)
      .add({ uid, displayName, email, phoneNumber, photoURL });
  }

  updateUser$({ displayName, email, phoneNumber, photoURL }: Partial<User>) {
    return this._firestore
      .collection<Partial<User>>(Collections.User, ref =>
        ref.where('uid', '==', this._context.getUser()?.uid ?? '')
      )
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

  watchCollaboratorList$(pocketbook: IPocketbook | null) {
    return !pocketbook?.collaboratorList.length
      ? of([])
      : this._firestore
          .collection<Partial<User>>(Collections.User, ref =>
            ref.where('uid', 'in', pocketbook?.collaboratorList ?? [])
          )
          .valueChanges();
  }
}
