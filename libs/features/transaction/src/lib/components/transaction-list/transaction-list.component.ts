import { CommonModule } from '@angular/common';
import { Component, OnDestroy, computed, inject } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';

import { ITransaction } from '@expenses-tracker/shared/interfaces';

import { toObservable } from '@angular/core/rxjs-interop';
import { TransactionListItemComponent } from '../transaction-list/transaction-list-item/transaction-list-item.component';
import { TransactionListService } from './transaction-list.service';

@Component({
  selector: 'expenses-tracker-transaction-list',
  standalone: true,
  imports: [CommonModule, TransactionListItemComponent],
  templateUrl: './transaction-list.component.html'
})
export class TransactionListComponent implements OnDestroy {
  #service = inject(TransactionListService);
  transactionList = computed(() => this.#service.transactionList());
  pocketbook = computed(() => this.#service.pocketbook());
  flags = computed(() => this.#service.flags().transactionList);
  #transactionList$!: Subscription;

  constructor() {
    // NOTE: @usamazansari: be very careful while using toObservable as it may cause memory leak
    this.#transactionList$ = toObservable(this.pocketbook)
      .pipe(switchMap(() => this.#service.fetchTransactionList$()))
      .subscribe();
  }

  addTransaction() {
    this.#service.gotoAddTransaction();
  }

  transactionListTrack(index: number, transaction: ITransaction) {
    return transaction.id;
  }

  ngOnDestroy(): void {
    this.#transactionList$?.unsubscribe();
  }
}
