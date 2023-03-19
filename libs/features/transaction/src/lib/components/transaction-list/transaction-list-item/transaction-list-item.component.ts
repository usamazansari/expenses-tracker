import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

import { ITransaction } from '@expenses-tracker/shared/interfaces';

@Component({
  selector: 'expenses-tracker-transaction-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-list-item.component.html',
  styles: []
})
export class TransactionListItemComponent {
  #transaction$ = new BehaviorSubject<ITransaction | null>(null);
  @Input() set transaction(value: ITransaction | null) {
    this.#transaction$.next(value);
  }
  get transaction() {
    return this.#transaction$.getValue();
  }
}
