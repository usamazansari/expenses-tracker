import { Dialog } from '@angular/cdk/dialog';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, computed, inject, signal } from '@angular/core';
import { Subscription } from 'rxjs';

import { TooltipModule } from '@expenses-tracker/shared/common';
import { ITransaction } from '@expenses-tracker/shared/interfaces';

import { CategoryFormatterPipePipe } from '../../../pipes';
import { TransactionDeleteDialogComponent } from './transaction-delete-dialog.component';
import { TransactionListItemService } from './transaction-list-item.service';

@Component({
  selector: 'expenses-tracker-transaction-list-item',
  standalone: true,
  imports: [CategoryFormatterPipePipe, CommonModule, CdkMenuTrigger, CdkMenu, CdkMenuItem, TooltipModule],
  templateUrl: './transaction-list-item.component.html',
  styles: []
})
export class TransactionListItemComponent implements OnDestroy {
  #service = inject(TransactionListItemService);
  #dialog = inject(Dialog);
  transaction = signal<ITransaction | null>(null);
  @Input() set transactionInput(value: ITransaction | null) {
    this.transaction.set(value);
  }
  paymentMode = computed(() =>
    this.transaction()?.paymentMode === 'card'
      ? {
          icon: 'credit_card',
          tooltip:
            this.transaction()?.transactionType === 'expense'
              ? 'Paid by card'
              : this.transaction()?.transactionType === 'income'
              ? 'Received in card'
              : 'Card transaction'
        }
      : this.transaction()?.paymentMode === 'cash'
      ? {
          icon: 'payments',
          tooltip:
            this.transaction()?.transactionType === 'expense'
              ? 'Paid with cash'
              : this.transaction()?.transactionType === 'income'
              ? 'Received in cash'
              : 'Cash transaction'
        }
      : { icon: 'error', tooltip: 'Unknown Payment Mode' }
  );

  transactionTypeIcon = computed(() =>
    this.transaction()?.transactionType === 'income'
      ? '+'
      : this.transaction()?.transactionType === 'expense'
      ? '-'
      : '?'
  );
  #transactionFormDialogSubscription$!: Subscription;

  gotoEditTransaction() {
    this.#service.gotoEditTransaction(this.transaction() as ITransaction);
  }

  deleteTransaction() {
    const dialogRef = this.#dialog.open(TransactionDeleteDialogComponent, {
      disableClose: true,
      backdropClass: ['bg-color-primer-canvas-backdrop', 'backdrop-blur-[2px]']
    });
    this.#transactionFormDialogSubscription$ = dialogRef.closed.subscribe(value => {
      if (value) {
        this.#service.deleteTransaction$(this.transaction() as ITransaction);
      }
    });
  }

  ngOnDestroy() {
    this.#transactionFormDialogSubscription$?.unsubscribe();
  }
}
