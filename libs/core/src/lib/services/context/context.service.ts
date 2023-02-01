import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  #user$ = new BehaviorSubject<User | null>(null);
  #user: User | null = null;

  constructor(private _auth: AngularFireAuth) {
    this._auth.user.subscribe(user => {
      this.setUser(user as User);
    });
  }

  getUser$() {
    return this.#user$.asObservable();
  }

  getUser() {
    return this.#user;
  }

  setUser(user: User | null) {
    this.#user = user ?? null;
    this.#user$.next(this.#user);
  }
}
