import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { TransactionDAO, TransactionFormSaveMode } from '@expenses-tracker/shared/interfaces';

import { TransactionFormComponent } from '../transaction-form/transaction-form.component';
import { TransactionEditService } from './transaction-edit.service';
import { TooltipModule } from '@expenses-tracker/shared/common';

@Component({
  selector: 'expenses-tracker-transaction-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TransactionFormComponent, TooltipModule],
  templateUrl: './transaction-edit.component.html'
})
export class TransactionEditComponent {
  #service = inject(TransactionEditService);

  transaction = computed(() => this.#service.transaction() as TransactionDAO);
  flags = computed(() => this.#service.flags());

  gotoTransactionList() {
    this.#service.gotoTransactionList();
  }

  editTransaction({ transaction }: { transaction: Partial<TransactionDAO>; saveMode: TransactionFormSaveMode }) {
    this.#service.editTransaction$({ transaction });
  }
}
