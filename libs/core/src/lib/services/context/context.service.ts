import { Location } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { map } from 'rxjs';

import { Collections } from '@expenses-tracker/shared/common';
import { IPocketbook, ITransaction, TransactionDAO } from '@expenses-tracker/shared/interfaces';

import { ErrorService } from '../error/error.service';
import { PocketbookMapper } from '../firestore/firestore.utils';

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  user = signal<User | null>(null);
  pocketbook = signal<IPocketbook | null>(null);
  transaction = signal<ITransaction | null>(null);

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
    this.transaction.set(transaction);
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
    const txnId =
      this.#location
        .path()
        .match(/transaction\/(\w+)\//)
        ?.at(1) ?? '';

    this.#firestore
      .collection<ITransaction<Timestamp>>(Collections.Transaction, ref => ref.where('id', '==', txnId))
      .valueChanges()
      .pipe(
        map(([transaction]) =>
          !transaction
            ? null
            : ({
                ...transaction,
                transactionDate: (transaction?.transactionDate as Timestamp)?.toDate()
              } as ITransaction)
        )
      )
      .subscribe(transaction => {
        this.setTransaction(transaction);
      });
  }

  calculateBalanceOnUpdate({
    old: { amount: oldAmount, transactionType: oldDirection },
    new: { amount: newAmount, transactionType: newDirection }
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

  calculateBalanceOnAdd({ amount, transactionType }: TransactionDAO) {
    const balance = this.pocketbook()?.balance ?? 0;
    return transactionType === 'expense' ? balance - amount : balance + amount;
  }

  calculateBalanceOnDelete({ amount, transactionType }: TransactionDAO) {
    const balance = this.pocketbook()?.balance ?? 0;
    return transactionType === 'expense' ? balance + amount : balance - amount;
  }
}
