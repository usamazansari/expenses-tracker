import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat';
import { BehaviorSubject, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #isLoggedIn$ = new BehaviorSubject<boolean>(false);
  #user$ = new BehaviorSubject<firebase.User | null>(null);

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
    this._auth.user.subscribe(user => {
      this.setUser(user);
    });
  }

  getUser$() {
    return this.#user$.asObservable();
  }

  setUser(user: firebase.User | null) {
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

  saveUser$({ email, uid }: firebase.User) {
    return from(
      this._firestore
        .collection<Partial<firebase.User>>('users')
        .add({ email, uid })
    );
  }

  getError(message: string) {
    return this.errorMap.get(message) ?? `Unknown error: ${message}`;
  }
}
