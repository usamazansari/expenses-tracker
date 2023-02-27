import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

import { IPocketbook } from '@expenses-tracker/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  #user$ = new BehaviorSubject<User | null>(null);
  #user: User | null = null;
  #pocketbook$ = new BehaviorSubject<IPocketbook | null>(null);
  #pocketbook: IPocketbook | null = null;

  constructor(private _auth: AngularFireAuth) {
    this._auth.user.subscribe(user => {
      this.setUser(user as User);
    });
  }

  setUser(user: User | null) {
    this.#user = user ?? null;
    this.#user$.next(this.#user);
  }

  getUser() {
    return this.#user;
  }

  watchUser$() {
    return this.#user$.asObservable();
  }

  setPocketbook(pocketbook: IPocketbook | null) {
    this.#pocketbook = pocketbook ?? null;
    this.#pocketbook$.next(this.#pocketbook);
  }

  resetPocketbook() {
    this.setPocketbook(null);
  }

  getPocketbook() {
    return this.#pocketbook;
  }

  watchPocketbook$() {
    return this.#pocketbook$.asObservable();
  }
}
