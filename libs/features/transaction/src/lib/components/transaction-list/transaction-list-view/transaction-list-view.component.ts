import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, computed, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Subscription } from 'rxjs';

import { TooltipModule } from '@expenses-tracker/shared/common';
import { ITransaction } from '@expenses-tracker/shared/interfaces';

import { TransactionListItemComponent } from '../transaction-list-item/transaction-list-item.component';
import { TransactionListService, TransactionListViewTypes } from '../transaction-list.service';

type DatePipeArgs = 'MMMM YYYY' | 'ww' | 'longDate';

@Component({
  selector: 'expenses-tracker-transaction-list-view',
  standalone: true,
  imports: [CommonModule, TransactionListItemComponent, TooltipModule],
  templateUrl: './transaction-list-view.component.html'
})
export class TransactionListViewComponent implements OnDestroy {
  #service = inject(TransactionListService);
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
  #transactionList$!: Subscription;
  #viewMode$!: Subscription;

  constructor() {
    this.#transactionList$ = toObservable(this.view).subscribe(() => {
      if (this.viewMode() === 'weekly') {
        this.#computeWeek();
      }
      this.viewMode() === 'daily'
        ? this.#fetchTransactionListForDay$()
        : this.viewMode() === 'weekly'
        ? this.#fetchTransactionListForWeek$()
        : this.#fetchTransactionListForMonth$();
    });
    this.#viewMode$ = toObservable(this.viewMode).subscribe(viewMode => {
      if (this.viewMode() === 'weekly') {
        this.#computeWeek();
      }
      this.datePipeArgs.set(this.#datePipeArgsMap.get(viewMode) ?? 'MMMM YYYY');
    });
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

  transactionListTrack(index: number, transaction: ITransaction) {
    return transaction.id;
  }

  ngOnDestroy() {
    this.#transactionList$?.unsubscribe();
    this.#viewMode$?.unsubscribe();
  }
}
