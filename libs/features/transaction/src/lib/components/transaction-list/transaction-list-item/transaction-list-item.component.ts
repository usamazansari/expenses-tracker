import { CommonModule } from '@angular/common';
import { Component, Input, inject, signal } from '@angular/core';
import { EMPTY } from 'rxjs';

import { ITransaction } from '@expenses-tracker/shared/interfaces';
import { TooltipModule } from '@expenses-tracker/shared/common';

import { TransactionListItemService } from './transaction-list-item.service';
import { CategoryFormatterPipePipe } from '../../../pipes';

@Component({
  selector: 'expenses-tracker-transaction-list-item',
  standalone: true,
  imports: [CategoryFormatterPipePipe, CommonModule, TooltipModule],
  templateUrl: './transaction-list-item.component.html',
  styles: []
})
export class TransactionListItemComponent {
  #service = inject(TransactionListItemService);
  transaction = signal<ITransaction | null>(null);
  @Input() set transactionInput(value: ITransaction | null) {
    this.transaction.set(value);
  }

  gotoEditTransaction() {
    this.#service.gotoEditTransaction(this.transaction() as ITransaction);
  }

  deleteTransaction() {
    const result = confirm('Delete Transaction?');
    const deleteStream = result ? this.#service.deleteTransaction$(this.transaction() as ITransaction) : EMPTY;
    // deleteStream.subscribe();
  }
}
