import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/compat/firestore';
import { RouterModule } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  from,
  Observable,
  Subject,
  switchMap,
  take,
  tap,
  throwError
} from 'rxjs';

interface IFlag {
  loading: boolean;
  success: boolean;
  fail: boolean;
  visible: boolean;
  dirty: boolean;
}

type ComponentFlags = {
  data: IFlag;
  auth: IFlag;
};

const flagStub: ComponentFlags = {
  data: {
    loading: false,
    success: false,
    fail: false,
    visible: true,
    dirty: false
  },
  auth: {
    loading: false,
    success: false,
    fail: false,
    visible: true,
    dirty: false
  }
};

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
  flags$ = new BehaviorSubject<ComponentFlags>(flagStub);
  statusText$ = new BehaviorSubject<string>('');
  user$ = new Subject<unknown>();
  title = 'client';
  collectionRef!: AngularFirestoreCollection<DataType>;
  data!: Observable<DataType[]>;
  flags = {
    data: {
      loading: false,
      success: false,
      fail: false,
      visible: true,
      dirty: false
    },
    auth: {
      loading: false,
      success: false,
      fail: false,
      visible: true,
      dirty: false
    }
  };
  statusText = '';
  user!: unknown;

  mock = ['foo', 'bar', 'lorem', 'ipsum'];

  constructor(
    private _firestore: AngularFirestore,
    private _auth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.collectionRef = this._firestore.collection<DataType>('dummy');
    this.data = this.collectionRef.valueChanges();

    this.flags$.subscribe(flags => {
      this.flags = { ...flags };
    });
    this.statusText$.subscribe(statusText => {
      this.statusText = statusText;
    });
    this.user$.subscribe(user => {
      this.user = user;
    });
  }

  addData() {
    this.flags$.next({
      ...this.flags,
      data: { ...this.flags.data, dirty: true }
    });
    this.statusText$.next('Data add dirty');
    from(
      this.collectionRef.add({
        id: this._firestore.createId(),
        property:
          this.mock.at(Math.floor(Math.random() * this.mock.length)) ?? ''
      })
    )
      .pipe(
        tap(() => {
          this.flags$.next({
            ...this.flags,
            data: {
              ...this.flags.data,
              success: false,
              fail: false,
              loading: true
            }
          });
          this.statusText$.next('Data add loading');
        })
      )
      .subscribe({
        next: () => {
          this.flags$.next({
            ...this.flags,
            data: {
              ...this.flags.data,
              loading: false,
              fail: false,
              success: true
            }
          });
          this.statusText$.next('Data add success');
        },
        error: () => {
          this.flags$.next({
            ...this.flags,
            data: {
              ...this.flags.data,
              loading: false,
              success: false,
              fail: true
            }
          });
          this.statusText$.next('Data add fail');
        }
      });
  }

  removeFirst() {
    this.flags$.next({
      ...this.flags,
      data: { ...this.flags.data, dirty: true }
    });
    this.statusText$.next('Data delete dirty');
    this.data
      .pipe(
        switchMap(([doc]) => {
          this.flags$.next({
            ...this.flags,
            data: {
              ...this.flags.data,
              success: false,
              fail: false,
              loading: true
            }
          });
          this.statusText$.next('Data delete loading');
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
          this.flags$.next({
            ...this.flags,
            data: {
              ...this.flags.data,
              loading: false,
              fail: false,
              success: true
            }
          });
          this.statusText$.next('Data delete success');
        },
        error: err => {
          console.log({ err });
          this.flags$.next({
            ...this.flags,
            data: {
              ...this.flags.data,
              loading: false,
              success: false,
              fail: true
            }
          });
          this.statusText$.next('Data delete fail');
        }
      });
  }

  async login() {
    this.flags$.next({
      ...this.flags,
      auth: { ...this.flags.auth, dirty: true }
    });
    this.statusText$.next('Auth login dirty');
    // this.user = this._auth.signInWithPopup(new GoogleAuthProvider());
    from(this._auth.signInWithEmailAndPassword('foo@bar.com', 'barbaz'))
      .pipe(
        tap(() => {
          this.flags$.next({
            ...this.flags,
            auth: {
              ...this.flags.auth,
              success: false,
              fail: false,
              loading: true
            }
          });
          this.statusText$.next('Auth login loading');
        })
      )
      .subscribe({
        next: res => {
          this.flags$.next({
            ...this.flags,
            auth: {
              ...this.flags.auth,
              loading: false,
              fail: false,
              success: true
            }
          });
          this.statusText$.next('Auth login successful');
          this.user$.next(res);
        },
        error: error => {
          this.flags$.next({
            ...this.flags,
            auth: {
              ...this.flags.auth,
              loading: false,
              success: false,
              fail: true
            }
          });
          this.statusText$.next('Auth login failed');
          console.log({ error });
        }
      });
  }

  logout() {
    this.flags$.next({
      ...this.flags,
      auth: { ...this.flags.auth, dirty: true }
    });
    this.statusText$.next('Auth login dirty');
    from(this._auth.signOut())
      .pipe(
        tap(() => {
          this.flags$.next({
            ...this.flags,
            auth: {
              ...this.flags.auth,
              success: false,
              fail: false,
              loading: true
            }
          });
          this.statusText$.next('Auth login loading');
        })
      )
      .subscribe({
        next: () => {
          this.flags$.next({
            ...this.flags,
            auth: {
              ...this.flags.auth,
              loading: false,
              fail: false,
              success: true
            }
          });
          this.statusText$.next('Auth logout successful');
          this.user$.next(null);
        },
        error: error => {
          this.flags$.next({
            ...this.flags,
            auth: {
              ...this.flags.auth,
              loading: false,
              success: false,
              fail: true
            }
          });
          this.statusText$.next('Auth logout successful');
          console.log({ error });
        }
      });
  }
}
