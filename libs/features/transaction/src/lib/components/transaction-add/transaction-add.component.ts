import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import {
  controlStateValidator,
  DatePickerComponent,
  SelectComponent,
  SelectWrapper
} from '@expenses-tracker/shared/common';
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
  imports: [CommonModule, ReactiveFormsModule, DatePickerComponent, SelectComponent],
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

  paymentModeOptions: SelectWrapper<PaymentMode>[] = [
    { label: 'Card', value: 'card' },
    { label: 'Cash', value: 'cash' }
  ];

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

    this.formGroup.valueChanges.subscribe(value => {
      console.log({ value });
    });
  }

  addTransaction() {
    if (!this.formGroup.invalid) {
      const { amount, category, direction, message, timestamp } = this.formGroup.value;
      console.log({ amount, category, direction, message, timestamp });
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

  patchTimestamp(timestamp: Date) {
    this.formGroup.patchValue({ timestamp });
  }

  patchPaymentMode(paymentMode: PaymentMode) {
    this.formGroup.patchValue({ paymentMode });
  }

  checkControl(formControl: FormControlExtras<TransactionForm, keyof TransactionForm>) {
    const { flag, message } = controlStateValidator(this.formGroup, formControl);
    switch (formControl.name) {
      case 'amount':
        this.amount.update(props => ({ ...props, error: { flag, message } }));
        break;
      default:
        break;
    }
  }

  cancelAddTransaction() {
    this.#dialogRef.close();
  }

  closeDialog() {
    this.#dialogRef.close();
  }

  ngOnDestroy() {
    this.#addTransaction$?.unsubscribe();
  }
}
