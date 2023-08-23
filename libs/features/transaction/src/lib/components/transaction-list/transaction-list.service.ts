import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { ContextService, FirestoreService } from '@expenses-tracker/core';
import { ITransaction } from '@expenses-tracker/shared/interfaces';
import { RoutePaths } from '@expenses-tracker/shared/common';

@Injectable({
  providedIn: 'root'
})
export class TransactionListService {
  #transactionList$ = new BehaviorSubject<ITransaction[]>([]);
  #transactionList: ITransaction[] = [];
  #firestore = inject(FirestoreService);
  #router = inject(Router);
  #context = inject(ContextService);

  fetchTransactionList$() {
    this.#firestore.watchTransactionList$().subscribe(transactionList => {
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
    return this.#firestore.watchTransactionList$();
  }

  gotoAddTransaction() {
    this.#router.navigate([
      RoutePaths.Pocketbook,
      // this.#context.getPocketbook()?.id,
      RoutePaths.Transaction,
      RoutePaths.EntityAdd
    ]);
  }
}
