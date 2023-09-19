import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { TooltipModule } from '@expenses-tracker/shared/common';
import { TransactionDAO } from '@expenses-tracker/shared/interfaces';

import { TransactionFormComponent } from '../transaction-form/transaction-form.component';
import { TransactionAddService } from './transaction-add.service';

@Component({
  selector: 'expenses-tracker-transaction-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TransactionFormComponent, TooltipModule],
  templateUrl: './transaction-add.component.html'
})
export class TransactionAddComponent implements OnInit {
  #service = inject(TransactionAddService);
  transactionDate = signal<Date>(new Date());
  pocketbook = computed(() => this.#service.pocketbook());
  flags = computed(() => this.#service.flags());

  ngOnInit() {
    this.transactionDate.set(this.#service.getState() ?? new Date());
  }

  addTransaction(transaction: TransactionDAO) {
    this.#service.addTransaction$(transaction);
  }

  gotoTransactionList() {
    this.#service.gotoTransactionList();
  }
}
