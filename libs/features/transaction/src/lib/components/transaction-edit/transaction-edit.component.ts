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
import { TransactionEditService } from './transaction-edit.service';

type TransactionEditForm<T extends TransactionFormFields = TransactionFormFields> = {
  amount: FormControl<T['amount']>;
  category: FormControl<T['category']>;
  direction: FormControl<T['direction']>;
  message: FormControl<T['message']>;
  timestamp: FormControl<T['timestamp']>;
  paymentMode: FormControl<T['paymentMode']>;
};

// TODO: @usamazansari - merge this with transaction-add component
@Component({
  selector: 'expenses-tracker-transaction-edit',
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
  templateUrl: './transaction-edit.component.html',
  styles: []
})
export class TransactionEditComponent implements OnInit, OnDestroy {
  #editTransaction$!: Subscription;
  #patchValues$!: Subscription;

  #formBuilder = inject(FormBuilder);
  #service = inject(TransactionEditService);

  formGroup!: FormGroup<TransactionEditForm>;

  ngOnInit() {
    this.formGroup = this.#formBuilder.group<TransactionEditForm>({
      amount: this.#formBuilder.control<number | null>(null, Validators.required),
      category: this.#formBuilder.control<TransactionCategory | ''>('', Validators.required),
      direction: this.#formBuilder.control<TransactionDirection>(
        'expense',
        Validators.required
      ),
      message: this.#formBuilder.control<string>(''),
      paymentMode: this.#formBuilder.control<PaymentMode>('card', Validators.required),
      timestamp: this.#formBuilder.control<Date>(new Date(Date.now()), Validators.required)
    });

    this.#patchValues$ = this.#service.patchValues$().subscribe(patchValues => {
      this.formGroup.patchValue(patchValues);
    });
  }

  editTransaction() {
    if (!this.formGroup.invalid) {
      const { amount, category, direction, message, paymentMode, timestamp } =
        this.formGroup.value;
      this.#editTransaction$ = this.#service
        .editTransaction$({
          amount,
          category,
          direction,
          message,
          paymentMode,
          timestamp
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

  cancelEditTransaction() {
    this.#service.cancelEditTransaction();
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
    this.#editTransaction$?.unsubscribe();
    this.#patchValues$?.unsubscribe();
  }
}
