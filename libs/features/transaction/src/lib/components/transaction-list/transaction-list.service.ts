import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { FirestoreService } from '@expenses-tracker/core';
import { ITransaction } from '@expenses-tracker/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TransactionListService {
  #transactionList$ = new BehaviorSubject<ITransaction[]>([]);
  #transactionList: ITransaction[] = [];
  constructor(private _firestore: FirestoreService) {}

  fetchTransactionList$() {
    this._firestore.watchTransactionList$().subscribe(transactionList => {
      this.setTransactionList(transactionList);
    });
  }

  setTransactionList(transactionList: ITransaction[]) {
    this.#transactionList = transactionList ?? [];
    this.#transactionList$.next(this.#transactionList);
  }

  resetTransactionList() {
    this.#transactionList$.next([]);
  }

  watchTransactionList$() {
    return this._firestore.watchTransactionList$();
  }
}
