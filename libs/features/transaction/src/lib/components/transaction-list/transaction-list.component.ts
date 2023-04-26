import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';

import { ITransaction } from '@expenses-tracker/shared/interfaces';

import { TransactionListItemComponent } from '../transaction-list/transaction-list-item/transaction-list-item.component';
import { TransactionListService } from './transaction-list.service';

@Component({
  selector: 'expenses-tracker-transaction-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, TransactionListItemComponent],
  templateUrl: './transaction-list.component.html'
})
export class TransactionListComponent implements OnInit {
  #service = inject(TransactionListService);
  transactionList$!: Observable<ITransaction[]>;

  ngOnInit() {
    this.#service.fetchTransactionList$();
    this.transactionList$ = this.#service.watchTransactionList$();
  }

  addTransaction() {
    this.#service.gotoAddTransaction();
  }
}
