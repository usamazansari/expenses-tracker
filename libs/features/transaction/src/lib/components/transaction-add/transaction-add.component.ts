import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Subscription } from 'rxjs';

import {
  ITransaction,
  PaymentMode,
  TransactionCategory,
  TransactionDirection
} from '@expenses-tracker/shared/interfaces';

import { TransactionFormFields } from '../../types';
import { TransactionAddService } from './transaction-add.service';

type TransactionAddForm<T extends TransactionFormFields = TransactionFormFields> = {
  amount: FormControl<T['amount']>;
  category: FormControl<T['category']>;
  direction: FormControl<T['direction']>;
  message: FormControl<T['message']>;
  timestamp: FormControl<T['timestamp']>;
  paymentMode: FormControl<T['paymentMode']>;
};

// TODO: @usamazansari - merge this with transaction-edit component
@Component({
  selector: 'expenses-tracker-transaction-add',
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
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
      amount: this.#formBuilder.control<number>(0, Validators.required),
      category: this.#formBuilder.control<TransactionCategory>('other', Validators.required),
      direction: this.#formBuilder.control<TransactionDirection>(
        'expense',
        Validators.required
      ),
      message: this.#formBuilder.control<string>(''),
      paymentMode: this.#formBuilder.control<PaymentMode>('card', Validators.required),
      timestamp: this.#formBuilder.control<Date>(new Date(Date.now()), Validators.required)
    });
  }

  addTransaction() {
    if (!this.formGroup.invalid) {
      const { amount, category, direction, message, paymentMode, timestamp } =
        this.formGroup.value;
      this.#addTransaction$ = this.#service
        .addTransaction$({
          amount,
          category,
          direction,
          message,
          timestamp,
          paymentMode
        } as ITransaction)
        .subscribe({
          next: () => {
            this.formGroup.reset();
          },
          error: error => {
            console.error({ error });
          }
        });
    }
  }

  cancelAddTransaction() {
    this.#service.cancelAddTransaction();
  }

  getError(formControlName = '') {
    if (this.formGroup.get(formControlName)?.hasError('required')) {
      return `${
        formControlName.charAt(0).toUpperCase() + formControlName.slice(1)
      } is required`;
    }
    return '';
  }

  ngOnDestroy() {
    this.#addTransaction$?.unsubscribe();
  }
}
