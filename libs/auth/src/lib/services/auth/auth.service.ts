import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { updateProfile, User } from 'firebase/auth';
import { BehaviorSubject, EMPTY, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #user$ = new BehaviorSubject<User | null>(null);
  #user: User | null = null;

  errorMap = new Map<string, string>([
    ['auth/email-already-in-use', 'The email entered is already in use'],
    ['auth/invalid-email', 'Invalid Email address'],
    [
      'auth/network-request-failed',
      'Unable to connect to the service, please try again later'
    ],
    ['auth/user-not-found', 'A user with the entered email does not exist'],
    ['auth/weak-password', 'The password is too weak'],
    ['auth/wrong-password', 'Incorrect password'],
    ['email-email', 'Email is invalid'],
    ['email-required', 'Email is required'],
    ['password-required', 'Password is required']
  ]);

  constructor(private _auth: AngularFireAuth) {
    this._auth.user.subscribe(user => {
      this.setUser(user as User);
    });
  }

  getUser$() {
    return this.#user$.asObservable();
  }

  setUser(user: User | null) {
    this.#user = user ?? null;
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

  editUserInfo$({ name }: { name: string }) {
    return !this.#user
      ? EMPTY
      : from(updateProfile(this.#user, { displayName: name }));
  }

  getError(message: string) {
    return this.errorMap.get(message) ?? `Unknown error: ${message}`;
  }
}
