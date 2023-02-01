import { Injectable } from '@angular/core';
import { User } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  #user$ = new BehaviorSubject<User | null>(null);
  #user: User | null = null;

  getUser$() {
    return this.#user$.asObservable();
  }

  getUser() {
    return this.#user$.getValue();
  }

  setUser(user: User | null) {
    this.#user = user ?? null;
    this.#user$.next(user);
  }
}
