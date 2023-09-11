import { Dialog } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, computed, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Subscription } from 'rxjs';

import { TooltipModule } from '@expenses-tracker/shared/common';
import { ITransaction } from '@expenses-tracker/shared/interfaces';

import { TransactionListItemComponent } from '../transaction-list-item/transaction-list-item.component';
import {
  DatePipeArgs,
  TransactionListService,
  TransactionListSummary,
  TransactionListViewTypes
} from '../transaction-list.service';
import { TransactionViewSummaryDialogComponent } from './transaction-view-summary-dialog.component';

@Component({
  selector: 'expenses-tracker-transaction-list-view',
  standalone: true,
  imports: [CommonModule, TransactionListItemComponent, TooltipModule],
  templateUrl: './transaction-list-view.component.html'
})
export class TransactionListViewComponent implements OnDestroy {
  #service = inject(TransactionListService);
  #dialog = inject(Dialog);
  #epoch = new Date();
  view = signal<Date>(this.#epoch);
  transactionList = signal<ITransaction[]>([]);
  flags = computed(() => this.#service.flags().transactionList);

  viewMode = signal<TransactionListViewTypes>('monthly');
  @Input() set viewModeInput(value: TransactionListViewTypes) {
    this.viewMode.set(value);
  }

  datePipeArgs = signal<DatePipeArgs>('MMMM YYYY');
  #datePipeArgsMap = new Map<TransactionListViewTypes, DatePipeArgs>([
    ['monthly', 'MMMM YYYY'],
    ['weekly', 'ww'],
    ['daily', 'longDate']
  ]);
  weekSunday = signal<Date>(
    new Date(this.#epoch.getFullYear(), this.#epoch.getMonth(), (this.#epoch.getDay() - 1) * -1)
  );
  weekSaturday = signal<Date>(new Date(this.#epoch.getFullYear(), this.#epoch.getMonth(), 6 - this.#epoch.getDay()));

  summary = computed(
    () =>
      this.transactionList().reduce(
        (acc, transaction) => {
          const { transactionType, paymentMode, amount } = transaction;
          acc.income += transactionType === 'income' ? amount : 0;
          acc.expense += transactionType === 'expense' ? amount : 0;
          acc.cashIncome += transactionType === 'income' && paymentMode === 'cash' ? amount : 0;
          acc.cashExpense += transactionType === 'expense' && paymentMode === 'cash' ? amount : 0;
          acc.cardIncome += transactionType === 'income' && paymentMode === 'card' ? amount : 0;
          acc.cardExpense += transactionType === 'expense' && paymentMode === 'card' ? amount : 0;
          return acc;
        },
        {
          income: 0,
          expense: 0,
          cashIncome: 0,
          cashExpense: 0,
          cardIncome: 0,
          cardExpense: 0
        }
      ) as TransactionListSummary
  );

  #transactionList$!: Subscription;
  #viewMode$!: Subscription;
  #summaryDialog$!: Subscription;

  constructor() {
    this.#transactionList$ = toObservable(this.view).subscribe(() => {
      this.#fetchTransactionList();
    });
    this.#viewMode$ = toObservable(this.viewMode).subscribe(() => {
      this.#updateViewMode();
    });
  }

  #updateViewMode() {
    if (this.viewMode() === 'weekly') {
      this.#computeWeek();
    }
    this.datePipeArgs.set(this.#datePipeArgsMap.get(this.viewMode()) ?? 'MMMM YYYY');
    this.#fetchTransactionList();
  }

  #fetchTransactionList() {
    if (this.viewMode() === 'weekly') {
      this.#computeWeek();
    }
    this.viewMode() === 'daily'
      ? this.#fetchTransactionListForDay$()
      : this.viewMode() === 'weekly'
      ? this.#fetchTransactionListForWeek$()
      : this.#fetchTransactionListForMonth$();
  }

  #fetchTransactionListForDay$() {
    this.#service.fetchTransactionListForDay$(this.view()).subscribe({
      next: res => {
        this.transactionList.set(res);
      },
      error: error => {
        console.error({ error });
        this.transactionList.set([]);
      }
    });
  }
  #fetchTransactionListForWeek$() {
    this.#service.fetchTransactionListForWeek$(this.view()).subscribe({
      next: res => {
        this.transactionList.set(res);
      },
      error: error => {
        console.error({ error });
        this.transactionList.set([]);
      }
    });
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

  #computeWeek() {
    this.weekSunday.set(
      new Date(this.view().getFullYear(), this.view().getMonth(), this.view().getDate() + this.view().getDay() * -1)
    );
    this.weekSaturday.set(
      new Date(this.view().getFullYear(), this.view().getMonth(), this.view().getDate() + 6 - this.view().getDay())
    );
  }

  changeView(delta: number) {
    const next =
      this.viewMode() === 'daily'
        ? new Date(this.view().getFullYear(), this.view().getMonth(), this.view().getDate() + delta)
        : this.viewMode() === 'weekly'
        ? new Date(this.view().getFullYear(), this.view().getMonth(), this.view().getDate() + delta * 7)
        : new Date(this.view().getFullYear(), this.view().getMonth() + delta);
    this.view.set(next);
  }

  resetView() {
    this.#epoch = new Date();
    this.#epoch.setHours(0, 0, 0);
    this.view.set(this.#epoch);
  }

  showSummary() {
    const dialogRef = this.#dialog.open(TransactionViewSummaryDialogComponent, {
      data: {
        view: this.view(),
        viewMode: this.viewMode(),
        summary: this.summary()
      },
      disableClose: true,
      backdropClass: ['bg-color-primer-canvas-backdrop', 'backdrop-blur-[2px]']
    });
    this.#summaryDialog$ = dialogRef.closed.subscribe();
  }

  transactionListTrack(index: number, transaction: ITransaction) {
    return transaction.id;
  }

  ngOnDestroy() {
    this.#transactionList$?.unsubscribe();
    this.#viewMode$?.unsubscribe();
    this.#summaryDialog$?.unsubscribe();
  }
}
