import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ITransaction, TransactionDirection } from '@expenses-tracker/shared/interfaces';

import { TransactionAddService } from './transaction-add.service';

type TransactionAddForm = {
  category: FormControl<string | null>;
  amount: FormControl<number | null>;
  direction: FormControl<TransactionDirection | null>;
  message: FormControl<string | null>;
};

@Component({
  selector: 'expenses-tracker-transaction-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transaction-add.component.html',
  styles: []
})
export class TransactionAddComponent implements OnInit, OnDestroy {
  #addTransaction$!: Subscription;

  #formBuilder = inject(FormBuilder);
  #service = inject(TransactionAddService);

  formGroup!: FormGroup<TransactionAddForm>;

  ngOnInit() {
    this.formGroup = this.#formBuilder.group<TransactionAddForm>({
      amount: this.#formBuilder.control(null, Validators.required),
      category: this.#formBuilder.control(null, Validators.required),
      direction: this.#formBuilder.control('expense', Validators.required),
      message: this.#formBuilder.control(null)
    });
  }

  addTransaction() {
    if (!this.formGroup.invalid) {
      const { amount, category, direction, message } = this.formGroup.value;
      // this.#addTransaction$ = this.#service
      //   .addTransaction$({
      //     amount,
      //     category,
      //     direction,
      //     message
      //   } as ITransaction)
      //   .subscribe({
      //     next: () => {
      //       this.formGroup.reset();
      //     },
      //     error: error => {
      //       console.error({ error });
      //     }
      //   });
    }
  }

  cancelAddTransaction() {
    this.#service.cancelAddTransaction();
  }

  getError(formControlName = '') {
    if (this.formGroup.get(formControlName)?.hasError('required')) {
      return `${formControlName.charAt(0).toUpperCase() + formControlName.slice(1)} is required`;
    }
    return '';
  }

  ngOnDestroy() {
    this.#addTransaction$?.unsubscribe();
  }
}
