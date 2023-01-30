import { Injectable } from '@angular/core';
import { User } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

import { AuthService } from '@expenses-tracker/auth';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  #user$ = new BehaviorSubject<User | null>(null);

  constructor(private _authService: AuthService) {
    this._authService.getUser$().subscribe(user => {
      this.setUser(user);
    });
  }

  setUser(user: User | null) {
    this.#user$.next(user);
  }

  getUser$() {
    return this.#user$.asObservable();
  }
}
