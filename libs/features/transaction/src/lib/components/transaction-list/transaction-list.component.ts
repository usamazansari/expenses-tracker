import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { Subject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';

import { SegmentedControlComponent, SegmentedControlWrapper, TooltipModule } from '@expenses-tracker/shared/common';
import { ITransaction } from '@expenses-tracker/shared/interfaces';

import { TransactionListItemComponent } from '../transaction-list/transaction-list-item/transaction-list-item.component';
import { TransactionListViewComponent } from './transaction-list-view/transaction-list-view.component';
import { TransactionListService, TransactionListViewTypes } from './transaction-list.service';

@Component({
  selector: 'expenses-tracker-transaction-list',
  standalone: true,
  imports: [
    CommonModule,
    SegmentedControlComponent,
    TransactionListItemComponent,
    TransactionListViewComponent,
    TooltipModule
  ],
  templateUrl: './transaction-list.component.html'
})
export class TransactionListComponent implements OnInit, OnDestroy {
  #searchText$ = new Subject<string>();
  #service = inject(TransactionListService);
  transactionList = computed(() => this.#service.transactionList());
  pocketbook = computed(() => this.#service.pocketbook());
  flags = computed(() => this.#service.flags().transactionList);
  viewOptions: SegmentedControlWrapper<TransactionListViewTypes>[] = [
    { icon: 'calendar_view_month', tooltip: 'Monthly view', value: 'monthly' },
    { icon: 'calendar_view_week', tooltip: 'Weekly view', value: 'weekly' },
    { icon: 'calendar_view_day', tooltip: 'Daily view', value: 'daily' }
  ];
  viewMode = signal<TransactionListViewTypes>('monthly');
  #transactionList$!: Subscription;

  constructor() {
    // NOTE: @usamazansari: be very careful while using toObservable as it may cause memory leak
    // this.#transactionList$ = toObservable(this.pocketbook)
    //   .pipe(switchMap(() => this.#service.fetchTransactionList$()))
    //   .subscribe();
  }

  ngOnInit() {
    this.#searchText$.pipe(debounceTime(250), distinctUntilChanged()).subscribe(searchText => {
      console.log({ searchText });
    });
  }

  addTransaction() {
    this.#service.gotoAddTransaction();
  }

  transactionListTrack(index: number, transaction: ITransaction) {
    return transaction.id;
  }

  debounceSearch($: KeyboardEvent) {
    this.#searchText$.next(($.target as HTMLInputElement).value);
  }

  changeViewMode(value: TransactionListViewTypes) {
    this.viewMode.set(value);
  }

  ngOnDestroy(): void {
    this.#transactionList$?.unsubscribe();
  }
}
