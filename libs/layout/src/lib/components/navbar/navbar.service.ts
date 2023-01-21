import { Injectable } from '@angular/core';
import { AuthService } from '@expenses-tracker/auth';
import { UserInfo } from '@firebase/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  #user$ = new BehaviorSubject<UserInfo | null>(null);

  constructor(private _authService: AuthService) {
    this._authService.getUser$().subscribe(user => {
      this.setUser(user);
    });
  }

  setUser(user: UserInfo | null) {
    this.#user$.next(user);
  }

  getUser$() {
    return this.#user$.asObservable();
  }
}
