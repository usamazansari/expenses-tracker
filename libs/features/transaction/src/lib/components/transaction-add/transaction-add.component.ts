import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import {
  FormControlExtras,
  FormGroupTypeGenerator,
  IPocketbook,
  PaymentMode,
  TransactionCategory,
  TransactionDirection
} from '@expenses-tracker/shared/interfaces';

import { TransactionForm } from '../../types';
import { TransactionAddService } from './transaction-add.service';

@Component({
  selector: 'expenses-tracker-transaction-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transaction-add.component.html',
  styles: []
})
export class TransactionAddComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup<FormGroupTypeGenerator<TransactionForm>>;
  #formBuilder = inject(FormBuilder);
  #dialogRef = inject(DialogRef);
  #service = inject(TransactionAddService);
  direction = signal<FormControlExtras<TransactionForm, 'direction'>>({
    name: 'direction',
    value: 'expense',
    error: { flag: false, message: '' }
  });
  amount = signal<FormControlExtras<TransactionForm, 'amount'>>({
    name: 'amount',
    value: 0,
    error: { flag: false, message: '' }
  });
  category = signal<FormControlExtras<TransactionForm, 'category'>>({
    name: 'category',
    value: 'other',
    error: { flag: false, message: '' }
  });
  paymentMode = signal<FormControlExtras<TransactionForm, 'paymentMode'>>({
    name: 'paymentMode',
    value: 'card',
    error: { flag: false, message: '' }
  });
  timestamp = signal<FormControlExtras<TransactionForm, 'timestamp'>>({
    name: 'timestamp',
    value: new Date(),
    error: { flag: false, message: '' }
  });
  message = signal<FormControlExtras<TransactionForm, 'message'>>({
    name: 'message',
    value: '',
    error: { flag: false, message: '' }
  });
  #addTransaction$!: Subscription;

  constructor(@Inject(DIALOG_DATA) public pocketbook: IPocketbook) {}

  ngOnInit() {
    this.formGroup = this.#formBuilder.group<FormGroupTypeGenerator<TransactionForm>>({
      direction: this.#formBuilder.control<TransactionDirection>(
        'expense',
        Validators.required
      ) as FormControl<TransactionDirection>,
      amount: this.#formBuilder.control<number | null>(null, Validators.required) as FormControl<number>,
      category: this.#formBuilder.control<TransactionCategory>(
        'other',
        Validators.required
      ) as FormControl<TransactionCategory>,
      paymentMode: this.#formBuilder.control<PaymentMode>('card', Validators.required) as FormControl<PaymentMode>,
      timestamp: this.#formBuilder.control<Date>(new Date(Date.now()), Validators.required) as FormControl<Date>,
      message: this.#formBuilder.control<string>('') as FormControl<string>
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
    this.#dialogRef.close();
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
