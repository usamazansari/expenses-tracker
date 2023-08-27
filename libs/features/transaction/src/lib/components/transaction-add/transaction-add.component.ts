import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import {
  controlStateValidator,
  DatePickerComponent,
  SelectComponent,
  SelectWrapper,
  SegmentedControlComponent,
  SegmentedControlWrapper
} from '@expenses-tracker/shared/common';
import {
  FormControlExtras,
  FormGroupTypeGenerator,
  IPocketbook,
  ITransaction,
  PaymentMode,
  TransactionCategory,
  TransactionType
} from '@expenses-tracker/shared/interfaces';

import { TransactionForm } from '../../types';
import { TransactionAddService } from './transaction-add.service';

@Component({
  selector: 'expenses-tracker-transaction-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatePickerComponent, SelectComponent, SegmentedControlComponent],
  templateUrl: './transaction-add.component.html'
})
export class TransactionAddComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup<FormGroupTypeGenerator<TransactionForm>>;
  #formBuilder = inject(FormBuilder);
  #dialogRef = inject(DialogRef);
  #service = inject(TransactionAddService);
  flags = computed(() => this.#service.flags());
  transactionType = signal<FormControlExtras<TransactionForm, 'transactionType'>>({
    name: 'transactionType',
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
  transactionDate = signal<FormControlExtras<TransactionForm, 'transactionDate'>>({
    name: 'transactionDate',
    value: new Date(),
    error: { flag: false, message: '' }
  });
  description = signal<FormControlExtras<TransactionForm, 'description'>>({
    name: 'description',
    value: '',
    error: { flag: false, message: '' }
  });

  transactionTypeOptions: SegmentedControlWrapper<TransactionType>[] = [
    { label: 'Income', value: 'income', icon: 'add_circle_outline' },
    { label: 'Expense', value: 'expense', icon: 'remove_circle_outline' }
  ];

  paymentModeOptions: SegmentedControlWrapper<PaymentMode>[] = [
    { label: 'Card', value: 'card', icon: 'credit_card' },
    { label: 'Cash', value: 'cash', icon: 'payments' }
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
      transactionType: this.#formBuilder.control<TransactionType>('expense') as FormControl<TransactionType>,
      amount: this.#formBuilder.control<number>(0, Validators.required) as FormControl<number>,
      category: this.#formBuilder.control<TransactionCategory>('other') as FormControl<TransactionCategory>,
      paymentMode: this.#formBuilder.control<PaymentMode>('card') as FormControl<PaymentMode>,
      transactionDate: this.#formBuilder.control<Date>(new Date(Date.now())) as FormControl<Date>,
      description: this.#formBuilder.control<string>('') as FormControl<string>
    });
  }

  addTransaction() {
    if (!this.formGroup.invalid) {
      const { amount, category, description, paymentMode, transactionDate, transactionType } = this.formGroup
        .value as TransactionForm;
      this.#addTransaction$ = this.#service
        .addTransaction$({
          amount,
          category,
          description,
          paymentMode,
          transactionDate,
          transactionType
        } as ITransaction)
        .subscribe({
          next: () => {
            this.formGroup.reset();
            this.closeDialog();
          },
          error: error => {
            console.error({ error });
          }
        });
    }
  }

  patchTransactionDate(transactionDate: Date) {
    this.transactionDate.update(value => ({ ...value, value: transactionDate }));
    this.formGroup.patchValue({ transactionDate });
  }

  patchPaymentMode(paymentMode: PaymentMode) {
    this.paymentMode.update(value => ({ ...value, value: paymentMode }));
    this.formGroup.patchValue({ paymentMode });
  }

  patchCategory(category: TransactionCategory) {
    this.category.update(value => ({ ...value, value: category }));
    this.formGroup.patchValue({ category });
  }

  patchTransactionType(transactionType: TransactionType) {
    this.transactionType.update(value => ({ ...value, value: transactionType }));
    this.formGroup.patchValue({ transactionType });
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
    this.#service.cancelAddTransaction();
    this.#dialogRef.close();
  }

  closeDialog() {
    this.#dialogRef.close();
  }

  ngOnDestroy() {
    this.#addTransaction$?.unsubscribe();
  }
}
