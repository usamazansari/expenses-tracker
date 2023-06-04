import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject, EMPTY, of, switchMap } from 'rxjs';

import { ITransaction } from '@expenses-tracker/shared/interfaces';

import { TransactionListItemService } from './transaction-list-item.service';
import { TransactionDeleteDialogComponent } from './transaction-delete-dialog.component';

@Component({
  selector: 'expenses-tracker-transaction-list-item',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDialogModule],
  templateUrl: './transaction-list-item.component.html',
  styles: []
})
export class TransactionListItemComponent {
  #service = inject(TransactionListItemService);
  #dialog = inject(MatDialog);
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
    const _ref = this.#dialog.open(TransactionDeleteDialogComponent);

    _ref
      .afterClosed()
      .pipe(
        switchMap(result =>
          result
            ? this.#service.deleteTransaction$(this.transaction as ITransaction)
            : of(EMPTY)
        )
      )
      .subscribe();
  }
}
