import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { NavigationEnd, Router } from '@angular/router';
import { User } from 'firebase/auth';
import { BehaviorSubject, filter, map, of, switchMap } from 'rxjs';

import { Collections } from '@expenses-tracker/shared/common';
import { IPocketbook, ITransaction } from '@expenses-tracker/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  #user$ = new BehaviorSubject<User | null>(null);
  #user: User | null = null;
  #pocketbook$ = new BehaviorSubject<IPocketbook | null>(null);
  #pocketbook: IPocketbook | null = null;
  #transaction$ = new BehaviorSubject<ITransaction | null>(null);
  #transaction: ITransaction | null = null;

  #auth = inject(AngularFireAuth);
  #router = inject(Router);
  #firestore = inject(AngularFirestore);

  constructor() {
    this.#fetchUser$();
    this.#fetchPocketbook$();
    this.#fetchTransaction$();
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

  setTransaction(transaction: ITransaction | null) {
    this.#transaction = transaction ?? null;
    this.#transaction$.next(this.#transaction);
  }

  resetTransaction() {
    this.setTransaction(null);
  }

  getTransaction() {
    return this.#transaction;
  }

  watchTransaction$() {
    return this.#transaction$.asObservable();
  }

  #fetchUser$() {
    this.#auth.user.subscribe(user => {
      this.setUser(user as User);
    });
  }

  #fetchPocketbook$() {
    this.#router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        map(e => (e as NavigationEnd).urlAfterRedirects),
        switchMap(url =>
          url.includes('pocketbook')
            ? this.#firestore
                .collection<IPocketbook<Timestamp>>(Collections.Pocketbook, ref =>
                  ref.where('id', '==', url.match(/pocketbook\/(\w+)\//)?.at(1) ?? '')
                )
                .valueChanges()
                .pipe(
                  map(([pb]) =>
                    !pb
                      ? null
                      : ({
                          ...pb,
                          createdAt: (pb?.createdAt as Timestamp)?.toDate()
                        } as IPocketbook)
                  )
                )
            : of(null)
        )
      )
      .subscribe(pb => {
        this.setPocketbook(pb);
      });
  }

  #fetchTransaction$() {
    this.#router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        map(e => (e as NavigationEnd).urlAfterRedirects),
        switchMap(url =>
          url.includes('transaction')
            ? this.#firestore
                .collection<ITransaction<Timestamp>>(Collections.Transaction, ref =>
                  ref.where('id', '==', url.match(/transaction\/(\w+)\//)?.at(1) ?? '')
                )
                .valueChanges()
                .pipe(
                  map(([transaction]) =>
                    !transaction
                      ? null
                      : ({
                          ...transaction,
                          timestamp: (transaction?.timestamp as Timestamp)?.toDate()
                        } as ITransaction)
                  )
                )
            : of(null)
        )
      )
      .subscribe(transaction => {
        this.setTransaction(transaction);
      });
  }

  calculateBalance({ amount, direction }: ITransaction) {
    return direction === 'expense'
      ? (this.#pocketbook?.balance ?? 0) - amount
      : (this.#pocketbook?.balance ?? 0) + amount;
  }
}
