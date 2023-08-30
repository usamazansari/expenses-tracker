import { toObservable } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { Subscription } from 'rxjs';

import { TooltipModule } from '@expenses-tracker/shared/common';
import { ITransaction } from '@expenses-tracker/shared/interfaces';

import { TransactionListItemComponent } from '../transaction-list-item/transaction-list-item.component';
import { TransactionListService } from '../transaction-list.service';

@Component({
  selector: 'expenses-tracker-transaction-monthly-view',
  standalone: true,
  imports: [CommonModule, TransactionListItemComponent, TooltipModule],
  templateUrl: './transaction-monthly-view.component.html'
})
export class TransactionMonthlyViewComponent implements OnInit, OnDestroy {
  #service = inject(TransactionListService);
  #epoch = new Date();
  view = signal<Date>(this.#epoch);
  transactionList = signal<ITransaction[]>([]);
  flags = computed(() => this.#service.flags().transactionList);
  #transactionList$!: Subscription;

  constructor() {
    this.#transactionList$ = toObservable(this.view).subscribe(() => {
      this.#fetchTransactionListForMonth$();
    });
  }

  ngOnInit() {
    this.#fetchTransactionListForMonth$();
  }
  #fetchTransactionListForMonth$() {
    this.#service.fetchTransactionListForMonth$(this.view()).subscribe({
      next: res => {
        this.transactionList.set(res);
      },
      error: error => {
        console.error({ error });
        this.transactionList.set([]);
      }
    });
  }

  changeMonth(delta: number) {
    const next = new Date(this.view().getFullYear(), this.view().getMonth() + delta, 1);
    this.view.set(next);
  }

  resetDate() {
    this.#epoch = new Date();
    this.#epoch.setHours(0, 0, 0);
    this.view.set(this.#epoch);
  }

  transactionListTrack(index: number, transaction: ITransaction) {
    return transaction.id;
  }

  ngOnDestroy() {
    this.#transactionList$?.unsubscribe();
  }
}
