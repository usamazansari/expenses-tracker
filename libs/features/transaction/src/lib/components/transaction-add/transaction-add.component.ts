import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, computed, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import {
  DatePickerComponent,
  SegmentedControlComponent,
  SegmentedControlWrapper,
  SelectComponent,
  SelectWrapper
} from '@expenses-tracker/shared/common';
import {
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
    this.formGroup = this.#formBuilder.group<FormGroupTypeGenerator<TransactionForm>>(
      {
        transactionType: this.#formBuilder.control<TransactionType>('expense') as FormControl<TransactionType>,
        amount: this.#formBuilder.control<number>(0, {
          validators: [Validators.required],
          updateOn: 'change'
        }) as FormControl<number>,
        category: this.#formBuilder.control<TransactionCategory>('other') as FormControl<TransactionCategory>,
        paymentMode: this.#formBuilder.control<PaymentMode>('card') as FormControl<PaymentMode>,
        transactionDate: this.#formBuilder.control<Date>(new Date(Date.now())) as FormControl<Date>,
        description: this.#formBuilder.control<string>('') as FormControl<string>
      },
      {
        updateOn: 'submit'
      }
    );
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
    this.formGroup.patchValue({ transactionDate });
  }

  patchPaymentMode(paymentMode: PaymentMode) {
    this.formGroup.patchValue({ paymentMode });
  }

  patchCategory(category: TransactionCategory) {
    this.formGroup.patchValue({ category });
  }

  patchTransactionType(transactionType: TransactionType) {
    this.formGroup.patchValue({ transactionType });
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
