import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  from,
  switchMap,
  throwError
} from 'rxjs';

import { Collections } from '@expenses-tracker/shared/common';
import { IUser } from '@expenses-tracker/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #user$ = new BehaviorSubject<IUser | null>(null);

  errorMap = new Map<string, string>([
    ['email-required', 'Email is required'],
    ['email-email', 'Email is invalid'],
    ['password-required', 'Password is required'],
    ['auth/email-already-in-use', 'The email entered is already in use'],
    ['auth/weak-password', 'The password is too weak'],
    ['auth/user-not-found', 'A user with the entered email does not exist'],
    ['auth/wrong-password', 'Incorrect password'],
    [
      'auth/network-request-failed',
      'Unable to connect to the service, please try again later'
    ]
  ]);

  constructor(
    private _auth: AngularFireAuth,
    private _firestore: AngularFirestore
  ) {
    combineLatest([
      this._auth.user,
      this._firestore.collection<IUser>(Collections.Users).valueChanges()
    ]).subscribe(([user, users]) => {
      if (!user) this.setUser(null);
      else this.setUser(users.find(u => u.uid === user?.uid) ?? null);
    });
  }

  getUser$() {
    return this.#user$.asObservable();
  }

  setUser(user: IUser | null) {
    this.#user$.next(user);
  }

  login$({
    email,
    password
  }: {
    email: string | null | undefined;
    password: string | null | undefined;
  }) {
    return from(
      this._auth.signInWithEmailAndPassword(email ?? '', password ?? '')
    );
  }

  logout$() {
    return from(this._auth.signOut());
  }

  signup$({
    email,
    password
  }: {
    email: string | null | undefined;
    password: string | null | undefined;
  }) {
    return from(
      this._auth.createUserWithEmailAndPassword(email ?? '', password ?? '')
    );
  }

  saveUser$({ email, uid }: IUser) {
    return from(
      this._firestore
        .collection<Partial<IUser>>(Collections.Users)
        .add({ email, uid })
    );
  }

  getUserFromFirestore$(uid: string) {
    return this._firestore
      .collection<IUser>(Collections.Users, ref => ref.where('uid', '==', uid))
      .get()
      .pipe(
        switchMap(query => {
          if (!query) {
            return throwError(() => new Error('Query returned null!'));
          }
          const { docs = [] } = query;
          if (!docs.length) {
            return throwError(() => new Error('No matching documents found!'));
          }
          const [{ id = '' }] = docs;
          return this._firestore
            .collection<IUser>(Collections.Users)
            .doc(id)
            .get();
        }),
        catchError(({ message }: Error) => {
          return throwError(() => new Error(message));
        })
      );
  }

  getError(message: string) {
    return this.errorMap.get(message) ?? `Unknown error: ${message}`;
  }
}
