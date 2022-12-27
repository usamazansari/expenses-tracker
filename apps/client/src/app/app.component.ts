import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/compat/firestore';
import { RouterModule } from '@angular/router';
import {
  catchError,
  from,
  Observable,
  switchMap,
  take,
  throwError
} from 'rxjs';

type DataType = {
  id: string;
  property: string;
};

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'expenses-tracker-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';
  collectionRef!: AngularFirestoreCollection<DataType>;
  data!: Observable<DataType[]>;

  mock = ['foo', 'bar', 'lorem', 'ipsum'];

  constructor(private _firestore: AngularFirestore) {}

  ngOnInit() {
    this.collectionRef = this._firestore.collection<DataType>('dummy');
    this.data = this.collectionRef.valueChanges();
  }

  addData() {
    this.collectionRef.add({
      id: this._firestore.createId(),
      property: this.mock.at(Math.floor(Math.random() * this.mock.length)) ?? ''
    });
  }

  removeFirst() {
    this.data
      .pipe(
        switchMap(([doc]) => {
          if (!doc) {
            return throwError(
              () => new Error('No documents in the collection')
            );
          }
          const { id } = doc;
          return this.collectionRef.ref.where('id', '==', id).get();
        }),
        take(1),
        switchMap(({ empty, docs }) => {
          if (!empty) {
            const [
              {
                ref: { id }
              }
            ] = docs;
            return from(this.collectionRef.doc(id).delete());
          }
          throw new Error('Document does not exist');
        }),
        catchError(err => throwError(() => new Error(err)))
      )
      .subscribe({
        next: () => {
          console.log('Delete Successful');
        },
        error: err => {
          console.log({ err });
        }
      });
  }
}
