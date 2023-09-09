import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, computed, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

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
export class TransactionAddComponent implements OnInit, OnDestroy {
  #service = inject(TransactionAddService);

  pocketbook = computed(() => this.#service.pocketbook());
  flags = computed(() => this.#service.flags());

  #addTransaction$!: Subscription;
  #transactionAddDialogSubscription$!: Subscription;

  ngOnInit() {
    console.log({});
  }

  addTransaction(transaction: TransactionDAO) {
    this.#service.addTransaction$(transaction);
  }

  gotoTransactionList() {
    this.#service.gotoTransactionList();
  }

  ngOnDestroy() {
    this.#addTransaction$?.unsubscribe();
    this.#transactionAddDialogSubscription$?.unsubscribe();
  }
}
