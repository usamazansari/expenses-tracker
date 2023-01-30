import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { AuthService } from '@expenses-tracker/auth';
import { IUser } from '@expenses-tracker/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  #user$ = new BehaviorSubject<IUser | null>(null);

  constructor(private _authService: AuthService) {
    this._authService.getUser$().subscribe(user => {
      this.setUser(user);
    });
  }

  setUser(user: IUser | null) {
    this.#user$.next(user);
  }

  getUser$() {
    return this.#user$.asObservable();
  }
}
