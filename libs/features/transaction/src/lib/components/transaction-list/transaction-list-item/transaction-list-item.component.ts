import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { BehaviorSubject, EMPTY } from 'rxjs';

import { ITransaction } from '@expenses-tracker/shared/interfaces';

import { TransactionListItemService } from './transaction-list-item.service';

@Component({
  selector: 'expenses-tracker-transaction-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-list-item.component.html',
  styles: []
})
export class TransactionListItemComponent {
  #service = inject(TransactionListItemService);
  #transaction$ = new BehaviorSubject<ITransaction | null>(null);
  @Input() set transaction(value: ITransaction | null) {
    this.#transaction$.next(value);
  }
  get transaction() {
    return this.#transaction$.getValue();
  }

  gotoEditTransaction() {
    this.#service.gotoEditTransaction(this.transaction as ITransaction);
  }

  deleteTransaction() {
    const result = confirm('Delete Transaction?');
    const deleteStream = result
      ? this.#service.deleteTransaction$(this.transaction as ITransaction)
      : EMPTY;
    deleteStream.subscribe();
  }
}
