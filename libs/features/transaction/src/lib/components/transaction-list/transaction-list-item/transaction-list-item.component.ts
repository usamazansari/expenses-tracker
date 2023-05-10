import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject } from 'rxjs';

import { ITransaction } from '@expenses-tracker/shared/interfaces';

import { TransactionListItemService } from './transaction-list-item.service';

@Component({
  selector: 'expenses-tracker-transaction-list-item',
  standalone: true,
  imports: [CommonModule, MatIconModule],
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

  editTransaction() {
    this.#service.editTransaction(this.transaction as ITransaction);
  }
}
