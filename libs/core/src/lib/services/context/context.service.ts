import { Location } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { NavigationEnd, Router } from '@angular/router';
import { User } from 'firebase/auth';
import { BehaviorSubject, filter, map, of, switchMap } from 'rxjs';

import { Collections } from '@expenses-tracker/shared/common';
import { IPocketbook, ITransaction } from '@expenses-tracker/shared/interfaces';

import { ErrorService } from '../error/error.service';
import { PocketbookMapper } from '../firestore/firestore.utils';

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  user = signal<User | null>(null);
  pocketbook = signal<IPocketbook | null>(null);
  #transaction$ = new BehaviorSubject<ITransaction | null>(null);
  #transaction: ITransaction | null = null;

  #auth = inject(AngularFireAuth);
  #router = inject(Router);
  #location = inject(Location);
  #firestore = inject(AngularFirestore);
  #error = inject(ErrorService);

  constructor() {
    this.#fetchUser$();
    this.#fetchPocketbook$();
    this.#fetchTransaction$();
  }

  setPocketbook(pocketbook: IPocketbook | null) {
    this.pocketbook.set(pocketbook);
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
      this.user.set(user as User);
    });
  }

  #fetchPocketbook$() {
    const pbId =
      this.#location
        .path()
        .match(/pocketbook\/(\w+)\//)
        ?.at(1) ?? '';

    this.#firestore
      .collection<IPocketbook<Timestamp>>(Collections.Pocketbook, ref => ref.where('id', '==', pbId))
      .valueChanges()
      .pipe(map(([pb]) => (!pb ? null : PocketbookMapper(pb))))
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

  updateTransactionCalculateBalance({
    old: { amount: oldAmount, direction: oldDirection },
    new: { amount: newAmount, direction: newDirection }
  }: {
    old: ITransaction;
    new: ITransaction;
  }) {
    const balance = this.pocketbook()?.balance ?? 0;
    return oldDirection === newDirection
      ? balance - oldAmount + newAmount
      : oldDirection === 'expense'
      ? balance + oldAmount + newAmount
      : balance - oldAmount - newAmount;
  }

  addTransactionCalculateBalance({ amount, direction }: ITransaction) {
    const balance = this.pocketbook()?.balance ?? 0;
    return direction === 'expense' ? balance - amount : balance + amount;
  }

  deleteTransactionCalculateBalance({ amount, direction }: ITransaction) {
    const balance = this.pocketbook()?.balance ?? 0;
    return direction === 'expense' ? balance + amount : balance - amount;
  }
}
