import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { ITransaction } from '@expenses-tracker/shared/interfaces';

import { TransactionListItemComponent } from '../transaction-list/transaction-list-item/transaction-list-item.component';
import { TransactionListService } from './transaction-list.service';

@Component({
  selector: 'expenses-tracker-transaction-list',
  standalone: true,
  imports: [CommonModule, TransactionListItemComponent],
  templateUrl: './transaction-list.component.html'
})
export class TransactionListComponent implements OnInit {
  transactionList$!: Observable<ITransaction[]>;
  constructor(private _service: TransactionListService) {}

  ngOnInit() {
    this._service.fetchTransactionList$();
    this.transactionList$ = this._service.watchTransactionList$();
  }
}
