import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import {
  controlStateValidator,
  DatePickerComponent,
  SelectComponent,
  SelectWrapper,
  SwitchComponent
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
  imports: [CommonModule, ReactiveFormsModule, DatePickerComponent, SelectComponent, SwitchComponent],
  templateUrl: './transaction-add.component.html',
  styles: [
    `
      /* .transaction-form {
        grid-template-areas: 'amount amount
          direction payment-mode
          category timestamp
          message message';
      }
      .transaction-direction {
        grid-area: direction;
      }
      .transaction-amount {
        grid-area: amount;
      }
      .transaction-category {
        grid-area: category;
      }
      .transaction-payment-mode {
        grid-area: payment-mode;
      }
      .transaction-timestamp {
        grid-area: timestamp;
      }
      .transaction-message {
        grid-area: message;
      } */
    `
  ]
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

  directionOptions: SelectWrapper<TransactionDirection>[] = [
    { label: 'Income', value: 'income' },
    { label: 'Expense', value: 'expense' }
  ];

  paymentModeOptions: SelectWrapper<PaymentMode>[] = [
    { label: 'Card', value: 'card' },
    { label: 'Cash', value: 'cash' }
  ];

  categoryOptions: SelectWrapper<TransactionCategory>[] = [
    { label: 'Academics', value: 'academics' },
    { label: 'ATM Withdrawal', value: 'atm-withdrawal' },
    { label: 'Bills', value: 'bills' },
    { label: 'Carry Forward', value: 'carry-forward' },
    { label: 'Charity', value: 'charity' },
    { label: 'Groceries', value: 'groceries' },
    { label: 'Health', value: 'health' },
    { label: 'Hobby', value: 'hobby' },
    { label: 'Insurance', value: 'insurance' },
    { label: 'Investment', value: 'investment' },
    { label: 'Laundry', value: 'laundry' },
    { label: 'Leisure', value: 'leisure' },
    { label: 'Other', value: 'other' },
    { label: 'Rent', value: 'rent' },
    { label: 'Salary', value: 'salary' },
    { label: 'Shopping', value: 'shopping' },
    { label: 'Transportation', value: 'transportation' },
    { label: 'Trips', value: 'trips' }
  ];

  #addTransaction$!: Subscription;

  constructor(@Inject(DIALOG_DATA) public pocketbook: IPocketbook) {}

  ngOnInit() {
    this.formGroup = this.#formBuilder.group<FormGroupTypeGenerator<TransactionForm>>({
      direction: this.#formBuilder.control<TransactionDirection>('expense') as FormControl<TransactionDirection>,
      amount: this.#formBuilder.control<number>(0, Validators.required) as FormControl<number>,
      category: this.#formBuilder.control<TransactionCategory>('other') as FormControl<TransactionCategory>,
      paymentMode: this.#formBuilder.control<PaymentMode>('card') as FormControl<PaymentMode>,
      timestamp: this.#formBuilder.control<Date>(new Date(Date.now())) as FormControl<Date>,
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
    this.timestamp.update(value => ({ ...value, value: timestamp }));
    this.formGroup.patchValue({ timestamp });
  }

  patchPaymentMode(paymentMode: PaymentMode) {
    this.paymentMode.update(value => ({ ...value, value: paymentMode }));
    this.formGroup.patchValue({ paymentMode });
  }

  patchCategory(category: TransactionCategory) {
    this.category.update(value => ({ ...value, value: category }));
    this.formGroup.patchValue({ category });
  }

  patchDirection(direction: TransactionDirection) {
    this.direction.update(value => ({ ...value, value: direction }));
    this.formGroup.patchValue({ direction });
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
