import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Collections } from '@expenses-tracker/shared/common';
import { IPocketbook } from '@expenses-tracker/shared/interfaces';
import { map, switchMap, throwError } from 'rxjs';
import { ContextService } from '../context/context.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(
    private _firestore: AngularFirestore,
    private _context: ContextService
  ) {}

  getAllPocketbooks$() {
    return this._context.getUser$().pipe(
      switchMap(user =>
        this._firestore
          .collection<IPocketbook>(Collections.Pocketbook)
          .valueChanges()
          .pipe(map(docs => docs.filter(doc => doc?.owner === user?.uid)))
      )
    );
  }

  createPocketbook(pocketbook: Partial<IPocketbook>) {
    return this._context.getUser$().pipe(
      switchMap(user =>
        this._firestore.collection<IPocketbook>(Collections.Pocketbook).add({
          ...pocketbook,
          id: this._firestore.createId(),
          owner: user?.uid ?? '',
          collaborators: [],
          createdAt: new Date()
        })
      )
    );
  }

  deletePocketbook(pocketbook: Partial<IPocketbook>) {
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
}
