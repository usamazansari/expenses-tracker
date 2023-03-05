import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { User } from 'firebase/auth';
import { map, Observable, of, switchMap, throwError } from 'rxjs';

import { Collections } from '@expenses-tracker/shared/common';
import { IPocketbook } from '@expenses-tracker/shared/interfaces';

import { ContextService } from '../context/context.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private _firestore: AngularFirestore, private _context: ContextService) {}

  /**
   * @deprecated Use individual fetch methods
   * @returns `{ owner: Pocketbooks owner, collaborator: Pocketbooks collaborated }`
   */
  getPocketbookList$() {
    return this._context.watchUser$().pipe(
      switchMap(user =>
        this._firestore
          .collection<IPocketbook>(Collections.Pocketbook, ref =>
            ref.where('owner', '==', user?.uid ?? '')
          )
          .valueChanges()
          .pipe(
            switchMap(owner =>
              this._firestore
                .collection<IPocketbook>(Collections.Pocketbook, ref =>
                  ref.where('collaboratorList', 'array-contains', user?.uid ?? '')
                )
                .valueChanges()
                .pipe(map(collaborator => ({ owner, collaborator })))
            )
          )
      )
    );
  }

  watchOwnedPocketbookList$(): Observable<IPocketbook[]> {
    return this._context.watchUser$().pipe(
      switchMap(user =>
        this._firestore
          .collection<IPocketbook<Timestamp>>(Collections.Pocketbook, ref =>
            ref.where('owner', '==', user?.uid ?? '')
          )
          .valueChanges()
          .pipe(
            map(pocketbookList =>
              pocketbookList.map(pb => ({
                ...pb,
                createdAt: (pb.createdAt as Timestamp).toDate()
              }))
            )
          )
      )
    );
  }

  watchCollaboratedPocketbookList$(): Observable<IPocketbook[]> {
    return this._context.watchUser$().pipe(
      switchMap(user =>
        this._firestore
          .collection<IPocketbook<Timestamp>>(Collections.Pocketbook, ref =>
            ref.where('collaboratorList', 'array-contains', user?.uid ?? '')
          )
          .valueChanges()
          .pipe(
            map(pocketbookList =>
              pocketbookList.map(pb => ({
                ...pb,
                createdAt: (pb.createdAt as Timestamp).toDate()
              }))
            )
          )
      )
    );
  }

  watchPocketbook$(id: string): Observable<IPocketbook> {
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
        )
      );
  }

  createPocketbook$({ name, collaboratorList = [], transactions = [] }: Partial<IPocketbook>) {
    return this._context.watchUser$().pipe(
      switchMap(user =>
        this._firestore.collection<IPocketbook>(Collections.Pocketbook).add({
          id: this._firestore.createId(),
          owner: user?.uid ?? '',
          name,
          collaboratorList,
          transactions,
          createdAt: new Date()
        })
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
              this._firestore
                .collection<IPocketbook>(Collections.Pocketbook)
                .doc(id)
                .update({ ...pocketbook })
            )
          )
      )
    );
  }

  deletePocketbook$(pocketbook: Partial<IPocketbook>) {
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
              console.log({ data, id });
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

  saveUser$({ uid, displayName, email, phoneNumber, photoURL }: User) {
    return this._firestore
      .collection<Partial<User>>(Collections.User)
      .add({ uid, displayName, email, phoneNumber, photoURL });
  }

  updateUser$({ displayName, email, phoneNumber, photoURL }: Partial<User>) {
    return this._context.watchUser$().pipe(
      switchMap(user =>
        this._firestore
          .collection<Partial<User>>(Collections.User, ref =>
            ref.where('uid', '==', user?.uid ?? '')
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
      .pipe(map(([owner]) => owner));
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
