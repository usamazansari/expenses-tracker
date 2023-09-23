import { Dialog } from '@angular/cdk/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, computed, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Subscription } from 'rxjs';

import { CalendarComponent, TooltipModule } from '@expenses-tracker/shared/common';
import {
  ITransaction,
  ITransactionListSummary,
  TransactionListDatePipeArgs,
  TransactionListViewTypes
} from '@expenses-tracker/shared/interfaces';

import { TransactionListItemComponent } from '../transaction-list-item/transaction-list-item.component';
import { TransactionListService } from '../transaction-list.service';
import { TransactionViewSummaryDialogComponent } from './transaction-view-summary-dialog.component';
import { CdkMenuTrigger, CdkMenu } from '@angular/cdk/menu';

@Component({
  selector: 'expenses-tracker-transaction-list-view',
  standalone: true,
  imports: [
    CalendarComponent,
    CdkMenu,
    CdkMenuTrigger,
    CommonModule,
    OverlayModule,
    TooltipModule,
    TransactionListItemComponent
  ],
  templateUrl: './transaction-list-view.component.html'
})
export class TransactionListViewComponent implements OnDestroy {
  #service = inject(TransactionListService);
  #dialog = inject(Dialog);
  #epoch = new Date();
  viewMode = computed(() => this.#service.transactionListViewMode());
  view = computed(() => this.#service.transactionListView() as Date);
  flags = computed(() => this.#service.flags().transactionList);
  transactionList = signal<ITransaction[]>([]);
  dayWiseTransactionMap = computed(() => this.#service.dayWiseTransactionMap());
  showPicker = signal<boolean>(false);

  @Input() set viewModeInput(value: TransactionListViewTypes) {
    this.#service.gotoViewMode(value);
  }

  datePipeArgs = signal<TransactionListDatePipeArgs>('MMMM YYYY');
  #datePipeArgsMap = new Map<TransactionListViewTypes, TransactionListDatePipeArgs>([
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
      ) as ITransactionListSummary
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
    this.datePipeArgs.set(
      !this.viewMode()
        ? 'MMMM YYYY'
        : (this.#datePipeArgsMap.get(this.viewMode() as TransactionListViewTypes) as TransactionListDatePipeArgs)
    );
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
    if (!!this.view()) {
      this.#service.fetchTransactionListForDay$(this.view() as Date).subscribe({
        next: res => {
          this.transactionList.set(res);
        },
        error: error => {
          console.error({ error });
          this.transactionList.set([]);
        }
      });
    }
  }
  #fetchTransactionListForWeek$() {
    if (!!this.view()) {
      this.#service.fetchTransactionListForWeek$(this.view() as Date).subscribe({
        next: res => {
          this.transactionList.set(res);
        },
        error: error => {
          console.error({ error });
          this.transactionList.set([]);
        }
      });
    }
  }
  #fetchTransactionListForMonth$() {
    if (!!this.view()) {
      this.#service.fetchTransactionListForMonth$(this.view() as Date).subscribe({
        next: res => {
          this.transactionList.set(res);
        },
        error: error => {
          console.error({ error });
          this.transactionList.set([]);
        }
      });
    }
  }

  #computeWeek() {
    if (!!this.view()) {
      const view = this.view() as Date;
      this.weekSunday.set(new Date(view.getFullYear(), view.getMonth(), view.getDate() + view.getDay() * -1));
      this.weekSaturday.set(new Date(view.getFullYear(), view.getMonth(), view.getDate() + 6 - view.getDay()));
    }
  }

  changeView(delta: number) {
    if (!!this.view()) {
      const view = this.view() as Date;
      const next =
        this.viewMode() === 'daily'
          ? new Date(view.getFullYear(), view.getMonth(), view.getDate() + delta)
          : this.viewMode() === 'weekly'
          ? new Date(view.getFullYear(), view.getMonth(), view.getDate() + delta * 7)
          : new Date(view.getFullYear(), view.getMonth() + delta);
      this.#service.gotoView(next);
    }
  }

  resetView() {
    this.#epoch = new Date();
    this.#epoch.setHours(0, 0, 0);
    this.#service.gotoView(this.#epoch);
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

  togglePicker() {
    this.showPicker.update(v => !v);
  }

  closePicker() {
    this.showPicker.set(false);
  }

  selectDate(day: Date) {
    this.#service.gotoView(day);
    this.showPicker.set(false);
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
