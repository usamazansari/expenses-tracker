import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat';
import { BehaviorSubject, catchError, from, switchMap, throwError } from 'rxjs';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { NotificationService } from '@expenses-tracker/layout';
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
    private _firestore: AngularFirestore,
    private _notificationService: NotificationService
  ) {
    this._auth.user.subscribe(user => {
      this.updateUserData$(user);
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
      this._firestore.collection<Partial<IUser>>('users').add({ email, uid })
    );
  }

  updateUserData$(user: firebase.User | null) {
    if (!user) {
      return;
    }
    const { uid } = user as firebase.User;
    return this.getUserFromFirestore$(uid)
      .pipe()
      .subscribe({
        next: doc => {
          if (!doc) {
            this._notificationService.error({
              title: 'Error',
              description: 'Error in reading document'
            });
            return;
          }
          const data = doc.data();
          if (!data) {
            this._notificationService.error({
              title: 'Error',
              description: 'Error in reading document data'
            });
            return;
          }
          const { displayName, email } = data;
          this._notificationService.success({
            description: `Logged in successfully as ${displayName ?? email}.`,
            title: 'Login Successful'
          });
          this.setUser(user as IUser);
        },
        error: error => {
          console.log({ error });
          this._notificationService.error(error);
        }
      });
  }

  getUserFromFirestore$(uid: string) {
    return this._firestore
      .collection<IUser>('users', ref => ref.where('uid', '==', uid))
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
          return this._firestore.collection<IUser>('users').doc(id).get();
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
