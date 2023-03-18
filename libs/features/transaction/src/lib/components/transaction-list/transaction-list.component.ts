import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { ITransaction } from '@expenses-tracker/shared/interfaces';

import { TransactionListService } from './transaction-list.service';

@Component({
  selector: 'expenses-tracker-transaction-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-list.component.html'
})
export class TransactionListComponent implements OnInit {
  transactionList$!: Observable<ITransaction[]>;
  constructor(private _service: TransactionListService) {}

  ngOnInit() {
    this.transactionList$ = this._service.watchTransactionList$();
  }
}
