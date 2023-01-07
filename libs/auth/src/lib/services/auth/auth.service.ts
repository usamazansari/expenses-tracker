import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { UserInfo } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn$ = new BehaviorSubject<boolean>(false);
  #user$ = new BehaviorSubject<UserInfo | null>(null);
  user: UserInfo | null = null;

  constructor() {
    this.#user$.subscribe(user => {
      console.log('Updating user', { user });
    });
  }

  getUser$() {
    return this.#user$.asObservable();
  }

  setUser(user: UserInfo | null) {
    this.#user$.next(user);
  }
}
