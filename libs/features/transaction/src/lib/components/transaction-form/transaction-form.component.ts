import { Dialog } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, Output, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
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
  PaymentMode,
  TransactionCategory,
  TransactionDAO,
  TransactionFormSaveMode,
  TransactionType
} from '@expenses-tracker/shared/interfaces';

import { TransactionFormDialogComponent } from './transaction-form-dialog.component';
import { CdkMenuTrigger, CdkMenu, CdkMenuItem } from '@angular/cdk/menu';

@Component({
  selector: 'expenses-tracker-transaction-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DatePickerComponent,
    SelectComponent,
    SegmentedControlComponent,
    CdkMenuTrigger,
    CdkMenu,
    CdkMenuItem
  ],
  templateUrl: './transaction-form.component.html'
})
export class TransactionFormComponent implements OnDestroy {
  #formBuilder = inject(FormBuilder);
  #dialog = inject(Dialog);
  formGroup = this.#formBuilder.group<FormGroupTypeGenerator<TransactionDAO>>(
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

  saveMode = signal<TransactionFormSaveMode>('add');
  @Input() set saveModeInput(value: TransactionFormSaveMode) {
    this.saveMode.set(value);
  }

  transactionDate = signal<Date>(new Date(Date.now()));
  @Input() set transactionInput(transaction: Partial<TransactionDAO>) {
    this.formGroup.patchValue(transaction);
    this.transactionDate.set(transaction.transactionDate ?? new Date(Date.now()));
  }

  @Output() gotoTransactionList$ = new EventEmitter<void>();
  @Output() transactionOperation$ = new EventEmitter<{
    transaction: TransactionDAO;
    saveMode: TransactionFormSaveMode;
  }>();

  #transactionFormDialogSubscription$!: Subscription;

  formatAmount(amount: number) {
    this.formGroup.controls.amount.setValue(+amount);
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

  transactionOperation() {
    this.transactionOperation$.emit({
      transaction: { ...(this.formGroup.value as TransactionDAO) },
      saveMode: this.saveMode()
    });
    this.formGroup.reset({
      amount: 0,
      category: 'other',
      paymentMode: 'card',
      transactionDate: this.transactionDate(),
      transactionType: 'expense'
    });
  }

  cancelAddTransaction() {
    if (!this.formGroup.invalid) {
      const dialogRef = this.#dialog.open(TransactionFormDialogComponent, {
        disableClose: true,
        backdropClass: ['bg-color-primer-canvas-backdrop', 'backdrop-blur-[2px]']
      });
      this.#transactionFormDialogSubscription$ = dialogRef.closed.subscribe(value => {
        if (value) {
          this.gotoTransactionList$.emit();
        }
      });
    } else {
      this.gotoTransactionList$.emit();
    }
  }

  ngOnDestroy() {
    this.#transactionFormDialogSubscription$?.unsubscribe();
  }
}
