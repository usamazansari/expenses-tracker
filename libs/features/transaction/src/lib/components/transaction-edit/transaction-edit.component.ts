import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { TransactionDAO } from '@expenses-tracker/shared/interfaces';

import { TransactionFormComponent } from '../transaction-form/transaction-form.component';
import { TransactionEditService } from './transaction-edit.service';

@Component({
  selector: 'expenses-tracker-transaction-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TransactionFormComponent],
  templateUrl: './transaction-edit.component.html'
})
export class TransactionEditComponent {
  #service = inject(TransactionEditService);

  transaction = computed(() => this.#service.transaction() as TransactionDAO);

  gotoTransactionList() {
    this.#service.gotoTransactionList();
  }

  editTransaction(transaction: Partial<TransactionDAO>) {
    this.#service.editTransaction$(transaction);
  }
}
