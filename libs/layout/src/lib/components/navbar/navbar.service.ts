import { Injectable } from '@angular/core';
import { AuthService } from '@expenses-tracker/auth';
import { UserInfo } from '@firebase/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  #isLoggedIn$ = new BehaviorSubject<boolean>(false);
  #user$ = new BehaviorSubject<UserInfo | null>(null);

  constructor(private _authService: AuthService) {
    this._authService.getIsLoggedIn$().subscribe(state => {
      this.setIsLoggedIn(state);
    });
    this._authService.getUser$().subscribe(user => {
      this.setUser(user);
    });
  }

  setIsLoggedIn(state: boolean) {
    this.#isLoggedIn$.next(state);
  }

  getIsLoggedIn$() {
    return this.#isLoggedIn$.asObservable();
  }

  setUser(user: UserInfo | null) {
    this.#user$.next(user);
  }

  getUser$() {
    return this.#user$.asObservable();
  }
}
