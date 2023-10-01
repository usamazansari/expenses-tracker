import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

import { SegmentedControlComponent, SegmentedControlWrapper, TooltipModule } from '@expenses-tracker/shared/common';
import { ITransaction, TransactionListViewTypes } from '@expenses-tracker/shared/interfaces';

import { TransactionListItemComponent } from '../transaction-list/transaction-list-item/transaction-list-item.component';
import { TransactionListViewComponent } from './transaction-list-view/transaction-list-view.component';
import { TransactionListService } from './transaction-list.service';

@Component({
  selector: 'expenses-tracker-transaction-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SegmentedControlComponent,
    TransactionListItemComponent,
    TransactionListViewComponent,
    TooltipModule
  ],
  templateUrl: './transaction-list.component.html'
})
export class TransactionListComponent implements OnInit {
  #searchText$ = new Subject<string>();
  #service = inject(TransactionListService);
  transactionList = computed(() => this.#service.transactionList());
  pocketbook = computed(() => this.#service.pocketbook());
  flags = computed(() => this.#service.flags().transactionList);
  viewMode = computed(() => (this.#service.transactionListViewMode() as TransactionListViewTypes) ?? 'monthly');
  viewOptions: SegmentedControlWrapper<TransactionListViewTypes>[] = [
    { label: 'Monthly view', icon: 'calendar_view_month', value: 'monthly' },
    { label: 'Weekly view', icon: 'calendar_view_week', value: 'weekly' },
    { label: 'Daily view', icon: 'calendar_view_day', value: 'daily' }
  ];

  ngOnInit() {
    this.#searchText$.pipe(debounceTime(250), distinctUntilChanged()).subscribe(searchText => {
      console.log({ searchText });
    });
    this.#service.gotoViewMode(this.viewMode());
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

  changeViewMode(transactionListViewMode: TransactionListViewTypes) {
    this.#service.gotoViewMode(transactionListViewMode);
  }
}
