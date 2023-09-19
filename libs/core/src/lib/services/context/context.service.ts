import { Location } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { User } from 'firebase/auth';
import { map, throwError } from 'rxjs';

import { Collections } from '@expenses-tracker/shared/common';
import {
  IPocketbook,
  ITransaction,
  TransactionDAO,
  TransactionListViewTypes
} from '@expenses-tracker/shared/interfaces';

import { PocketbookMapper } from '../firestore/firestore.utils';

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  user = signal<User | null>(null);
  pocketbook = signal<IPocketbook | null>(null);
  transaction = signal<ITransaction | null>(null);
  transactionListView = signal<Date | null>(new Date());
  transactionListViewMode = signal<TransactionListViewTypes | null>('monthly');

  #auth = inject(AngularFireAuth);
  #location = inject(Location);
  #firestore = inject(AngularFirestore);

  constructor() {
    this.#fetchUser$();
    this.#fetchPocketbook$();
    this.#fetchTransaction$();
    this.#fetchTransactionListView$();
    this.#fetchTransactionListViewMode$();
  }

  setPocketbook(pocketbook: IPocketbook | null) {
    this.pocketbook.set(pocketbook);
  }

  setTransaction(transaction: ITransaction | null) {
    this.transaction.set(transaction);
  }

  setTransactionListView(transactionListView: Date | null) {
    this.transactionListView.set(transactionListView);
  }

  setTransactionListViewMode(transactionListViewMode: TransactionListViewTypes | null) {
    this.transactionListViewMode.set(transactionListViewMode);
  }

  #fetchUser$() {
    this.#auth.user.subscribe(user => {
      this.user.set(user as User);
    });
  }

  fetchPocketbook$() {
    const pbId = this.#location
      .path()
      .match(/pocketbook\/(\w+)\//)
      ?.at(1);

    if (!!pbId) {
      return this.#firestore
        .collection<IPocketbook<Timestamp>>(Collections.Pocketbook, ref => ref.where('id', '==', pbId))
        .valueChanges()
        .pipe(map(([pb]) => (!pb ? null : PocketbookMapper(pb))));
    }
    return throwError(() => new Error('Pocketbook is not set in the URL.'));
  }

  #fetchPocketbook$() {
    this.fetchPocketbook$().subscribe(pb => {
      this.setPocketbook(pb);
    });
  }

  fetchTransaction$() {
    const txnId = this.#location
      .path()
      .match(/transaction\/(\w+)/)
      ?.at(1);

    if (txnId) {
      return this.#firestore
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
        );
    }
    return throwError(() => new Error('Transaction is not set in the URL.'));
  }

  #fetchTransaction$() {
    this.fetchTransaction$().subscribe(transaction => {
      this.setTransaction(transaction);
    });
  }

  #fetchTransactionListView$() {
    const dateString = this.#location
      .path()
      .match(/transaction\/list\/(\d{4}-\d{2}-\d{2})/)
      ?.at(1);
    if (dateString) {
      const [year, month, date] = dateString.split('-');
      this.setTransactionListView(new Date(+year, +month - 1, +date));
    }
  }

  #fetchTransactionListViewMode$() {
    const viewMode = this.#location
      .path()
      .match(/transaction\/list\/(\d{4}-\d{2}-\d{2})\?viewMode=(\w+)/)
      ?.at(2);
    this.setTransactionListViewMode((viewMode as TransactionListViewTypes) ?? null);
  }

  calculateBalanceOnUpdate({
    old: { amount: oldAmount, transactionType: oldDirection },
    new: { amount: newAmount, transactionType: newDirection }
  }: {
    old: TransactionDAO;
    new: TransactionDAO;
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
