import { Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserInfo } from 'firebase/auth';
import { BehaviorSubject, catchError, from, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #isLoggedIn$ = new BehaviorSubject<boolean>(false);
  #user$ = new BehaviorSubject<UserInfo | null>(null);

  errorMap = new Map<string, string>([
    ['email-required', 'Email is required'],
    ['email-email', 'Email is invalid'],
    ['password-required', 'Password is required'],
    ['auth/email-already-in-use', 'Email is already in use'],
    ['auth/weak-password', 'Password is too weak'],
    ['auth/user-not-found', 'User with email not found'],
    ['auth/wrong-password', 'Incorrect / non-existent password']
  ]);

  constructor(private _auth: AngularFireAuth) {}

  getIsLoggedIn$() {
    return this.#isLoggedIn$.asObservable();
  }

  setIsLoggedIn(state: boolean) {
    this.#isLoggedIn$.next(state);
  }

  getUser$() {
    return this.#user$.asObservable();
  }

  setUser(user: UserInfo | null) {
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

  logout() {
    return from(this._auth.signOut()).pipe(
      catchError(({ code }: FirebaseError) => throwError(() => new Error(code)))
    );
  }

  signup({
    email,
    password
  }: {
    email: string | null | undefined;
    password: string | null | undefined;
  }) {
    return from(
      this._auth.signInWithEmailAndPassword(email ?? '', password ?? '')
    ).pipe(
      catchError(({ code }: FirebaseError) => throwError(() => new Error(code)))
    );
  }

  getError(message: string) {
    return this.errorMap.get(message) ?? `Unknown error: ${message}`;
  }
}
